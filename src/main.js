'use strict';

const { app, BrowserWindow, ipcMain, Tray, Menu, dialog, shell, nativeImage, Notification } = require('electron');
const path    = require('path');
const fs      = require('fs');
const crypto  = require('crypto');
const { exec }      = require('child_process');
const { promisify } = require('util');
const execAsync     = promisify(exec);

const adminGuard = require('./service/admin-guard');
const Guardian   = require('./service/guardian');
const validator  = require('./core/validator');
const normatives = require('./core/normatives');
const i18n       = require('./core/i18n');

// ── Persistent JSON Store (built-in — avoids ESM-only electron-store issue) ──
class ConfigStore {
  constructor(name) {
    this._path = path.join(app.getPath('userData'), `${name}.json`);
    this._data = {};
    try {
      if (fs.existsSync(this._path))
        this._data = JSON.parse(fs.readFileSync(this._path, 'utf8'));
    } catch { /* start fresh */ }
  }
  get path() { return this._path; }
  get(key, defaultValue) {
    if (!(key in this._data)) return defaultValue;
    try { return JSON.parse(JSON.stringify(this._data[key])); }
    catch { return this._data[key]; }
  }
  set(key, value) { this._data[key] = value; this._save(); }
  delete(key) { delete this._data[key]; this._save(); }
  _save() {
    try {
      const dir = path.dirname(this._path);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this._path, JSON.stringify(this._data, null, 2), 'utf8');
    } catch (e) { console.error('[Store]', e.message); }
  }
}
// store is initialized inside app.whenReady() — app.getPath('userData') is
// only available AFTER Electron's 'ready' event fires.
let store = null;

// ── App lifetime ──────────────────────────────────────────────────────────────
let mainWindow   = null;
let tray         = null;
let guardian     = null;
let isQuitting   = false;

// ── IPC guard — wraps every handler so a crash never freezes the renderer ─────
function ipc(channel, fn) {
  ipcMain.handle(channel, async (event, ...args) => {
    try { return await fn(event, ...args); }
    catch (err) {
      console.error(`[IPC ${channel}]`, err);
      return { ok: false, error: err.message || String(err) };
    }
  });
}

// ── Window ────────────────────────────────────────────────────────────────────
function createWindow() {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.ico');
  const iconOpts = fs.existsSync(iconPath) ? { icon: iconPath } : {};

  mainWindow = new BrowserWindow({
    width: 1100, height: 750, minWidth: 800, minHeight: 600,
    ...iconOpts,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration:  false,
      sandbox:          false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  mainWindow.on('close', e => {
    if (!isQuitting) { e.preventDefault(); mainWindow.hide(); }
  });
}

// ── Tray ──────────────────────────────────────────────────────────────────────
function createTray() {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.ico');
  const img = fs.existsSync(iconPath)
    ? nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
    : nativeImage.createEmpty();

  tray = new Tray(img);
  tray.setToolTip('FreeNameConvention Guardian');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: i18n.t('tray.show'),  click: () => { mainWindow.show(); mainWindow.focus(); } },
    { type: 'separator' },
    { label: i18n.t('tray.quit'), click: () => { isQuitting = true; app.quit(); } }
  ]));
  tray.on('double-click', () => { mainWindow.show(); mainWindow.focus(); });
}

// ── Application Menu ────────────────────────────────────────────────────────
function createAppMenu() {
  const send = (action) => mainWindow && mainWindow.webContents.send('menu:action', action);
  const nav  = (page)   => mainWindow && mainWindow.webContents.send('menu:navigate', page);
  const tmpl = [
    {
      label: 'Arquivo',
      submenu: [
        { label: '➕ Adicionar Pasta...', accelerator: 'CmdOrCtrl+N',        click: () => send('addFolder') },
        { type: 'separator' },
        { label: '📤 Exportar Configuração...', accelerator: 'CmdOrCtrl+E', click: () => send('exportConfig') },
        { label: '📥 Importar Configuração...', accelerator: 'CmdOrCtrl+I', click: () => send('importConfig') },
        { type: 'separator' },
        { label: '📊 Exportar Relatório de Violações CSV...', click: () => send('exportCSV') },
        { type: 'separator' },
        { label: 'Minimizar para bandeja', accelerator: 'CmdOrCtrl+W',     click: () => mainWindow?.hide() },
        { label: 'Sair',                   accelerator: 'CmdOrCtrl+Q',     click: () => { isQuitting = true; app.quit(); } }
      ]
    },
    {
      label: 'Guardião',
      submenu: [
        { label: '▶ Iniciar Guardião',  accelerator: 'CmdOrCtrl+G', click: () => send('guardianStart') },
        { label: '■ Parar Guardião',                                click: () => send('guardianStop') },
        { type: 'separator' },
        { label: 'Ver Pastas Monitoradas',                          click: () => nav('folders') }
      ]
    },
    {
      label: 'Ferramentas',
      submenu: [
        { label: '✓ Validar Nome de Arquivo...', accelerator: 'CmdOrCtrl+Shift+V', click: () => nav('validate') },
        { label: '📋 Ver Registro de Violações', accelerator: 'CmdOrCtrl+Shift+L', click: () => nav('log') },
        { label: '🗑 Limpar Registro',                                               click: () => send('clearLog') },
        { type: 'separator' },
        { label: '🔧 Construtor de Padrão Personalizado',                            click: () => send('openBuilder') },
        { label: '📐 Biblioteca de Normativas',                                      click: () => nav('normatives') },
        { type: 'separator' },
        { label: '🔐 Proteger Arquivo de Configuração',                              click: () => send('protectConfig') }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { label: '📁 Pastas',        click: () => nav('folders') },
        { label: '📐 Normativas',    click: () => nav('normatives') },
        { label: '✓ Validar',       click: () => nav('validate') },
        { label: '📊 Registro',     click: () => nav('log') },
        { label: '⚙ Configurações', click: () => nav('settings') },
        { label: '❓ Ajuda',         click: () => nav('help') },
        { type: 'separator' },
        { role: 'reload',         label: 'Recarregar' },
        { role: 'toggleDevTools', label: 'Dev Tools' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        { label: '❓ Como usar o FreeNameConvention', accelerator: 'F1',       click: () => nav('help') },
        { label: '📖 Referência de Tokens',                                     click: () => mainWindow?.webContents.send('menu:helpSection', 'tokens') },
        { label: '📐 Guia de Normativas',                                       click: () => mainWindow?.webContents.send('menu:helpSection', 'normatives') },
        { label: '🔧 Guia do Construtor de Padrão',                             click: () => mainWindow?.webContents.send('menu:helpSection', 'builder') },
        { type: 'separator' },
        { label: 'ℹ Sobre FreeNameConvention',                                  click: () => mainWindow?.webContents.send('menu:about') }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(tmpl));
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getConfig() {
  return store.get('config', { folders: {}, adminPasswordHash: '', language: 'pt', autoStart: false });
}
function saveConfig(cfg) { store.set('config', cfg); }

// ── Email notification helper ─────────────────────────────────────────────────
async function sendViolationEmail(cfg, violation) {
  if (!cfg.alertEmail || !cfg.smtpHost || !cfg.smtpUser) return;
  try {
    let nodemailer; try { nodemailer = require('nodemailer'); } catch { return; }
    const trans = nodemailer.createTransport({
      host: cfg.smtpHost, port: parseInt(cfg.smtpPort) || 587,
      secure: parseInt(cfg.smtpPort) === 465,
      auth: { user: cfg.smtpUser, pass: cfg.smtpPass || '' },
      tls: { rejectUnauthorized: false }
    });
    await trans.sendMail({
      from: `"FreeNameConvention Guardian" <${cfg.smtpUser}>`,
      to:   cfg.alertEmail,
      subject: `[FNC] Violação: ${violation.file}`,
      text: `Guardião detectou arquivo fora do padrão.\n\nArquivo: ${violation.file}\nPasta: ${violation.folder}\nAção: ${violation.action}\nHorário: ${new Date(violation.at).toLocaleString('pt-BR')}\n\n${(violation.issues||[]).join('\n') || 'Nome não corresponde ao padrão configurado'}${violation.suggestion ? '\n\nSugestão de nome: ' + violation.suggestion : ''}`
    });
  } catch (e) { console.error('[Email]', e.message); }
}

// ── Compliant filename suggester ─────────────────────────────────────────────
function _tokPat(raw) {
  const tokens = []; let rest = raw;
  while (rest.length > 0) {
    const m = rest.match(/^(\{[^}]+\}|[^{}\-_.]+)([\-_.]?)(.*)/s);
    if (!m) { tokens.push({ token: rest, sep: '' }); break; }
    tokens.push({ token: m[1], sep: m[2] || '' }); rest = m[3];
  }
  return tokens;
}

function suggestCompliantName(filename, patternTemplate) {
  if (!patternTemplate || !filename) return null;
  const ext  = path.extname(filename);
  const base = path.basename(filename, ext);
  const tokens = _tokPat(patternTemplate);
  if (!tokens.length) return null;
  const segs  = base.split(/[-_.\s]+/).filter(Boolean);
  const today = new Date();
  let si = 0;
  const parts = tokens.map(({ token, sep }) => {
    let v;
    if (token === '{DATE}' || token === '{DATA}') {
      const joined = segs.slice(si).join('-');
      const m = joined.match(/(\d{4})[/\-](\d{2})[/\-](\d{2})/);
      v = m ? `${m[1]}-${m[2]}-${m[3]}` : today.toISOString().slice(0, 10);
      if (m) si = Math.min(segs.length, si + 3);
    } else if (token === '{DATE:YYYY-MM}') {
      const joined = segs.slice(si).join('-');
      const m = joined.match(/(\d{4})[/\-](\d{2})/);
      v = m ? `${m[1]}-${m[2]}` : today.toISOString().slice(0, 7);
      if (m) si = Math.min(segs.length, si + 2);
    } else if (token === '{DATE:YYYY}') {
      const y = segs.slice(si).find(s => /^\d{4}$/.test(s));
      v = y || today.getFullYear().toString(); if (y) si++;
    } else if (/^\{NUM:(\d+)\}$/.test(token)) {
      const d = parseInt(token.match(/\d+/)[0]);
      let found = false;
      for (let i = si; i < segs.length; i++) {
        if (/^\d+$/.test(segs[i])) { v = segs[i].padStart(d, '0').slice(-d); si = i + 1; found = true; break; }
      }
      if (!found) v = '0001'.padStart(d, '0').slice(-d);
    } else if (token === '{VERSION}' || token === '{VERSAO}') {
      let found = false;
      for (let i = si; i < segs.length; i++) {
        if (/^v?\d/i.test(segs[i])) { v = /^v/i.test(segs[i]) ? segs[i] : 'v' + segs[i]; si = i + 1; found = true; break; }
      }
      if (!found) v = 'v01';
    } else if (token === '{UUID}') {
      v = Math.random().toString(36).substr(2, 8).toUpperCase();
    } else if (token === '{TEXT}' || token === '{TEXTO}') {
      v = segs[si] ? segs[si++].toUpperCase() : 'AREA';
    } else if (token === '{ANY}') {
      v = segs.slice(si).join('-') || 'CONTEUDO'; si = segs.length;
    } else {
      v = token; // literal
    }
    return { v, sep };
  });
  return parts.map((p, i) => p.v + (i < parts.length - 1 ? p.sep : '')).join('') + ext;
}

// ── App init ──────────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  // MUST be first — app.getPath('userData') only works after ready
  store = new ConfigStore('fnc-config');

  i18n.loadLang(getConfig().language || 'pt');
  createWindow();
  createTray();
  createAppMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {} // Keep running in tray
});

app.on('before-quit', () => { isQuitting = true; });

app.on('activate', () => {
  if (mainWindow) mainWindow.show();
});

// ── IPC Handlers ──────────────────────────────────────────────────────────────

// Config
ipc('config:getAll', () => {
  const cfg = getConfig();
  return { ok: true, folders: cfg.folders || {} }; // always an object { id: folderCfg }
});

ipc('config:addFolder', (_, folderPath) => {
  const cfg = getConfig();
  const id  = crypto.randomUUID();
  const label = path.basename(folderPath) || folderPath;
  cfg.folders[id] = {
    id, path: folderPath, label,
    patterns: [], extensions: ['*'], action: 'log', enabled: true,
    quarantineFolder: '_NONCOMPLIANT', createdAt: new Date().toISOString()
  };
  saveConfig(cfg);
  return { ok: true, id, folder: cfg.folders[id] };
});

ipc('config:updateFolder', (_, id, changes) => {
  const cfg = getConfig();
  if (!cfg.folders[id]) return { ok: false, error: 'Pasta não encontrada' };
  cfg.folders[id] = { ...cfg.folders[id], ...changes };
  saveConfig(cfg);
  return { ok: true };
});

ipc('config:removeFolder', (_, id) => {
  const cfg = getConfig();
  delete cfg.folders[id];
  saveConfig(cfg);
  return { ok: true };
});

ipc('config:addPattern', (_, folderId, patternStr) => {
  const cfg = getConfig();
  if (!cfg.folders[folderId]) return { ok: false, error: 'Pasta não encontrada' };
  const f = cfg.folders[folderId];
  const safe = adminGuard.sanitize(patternStr, 256);
  if (!safe) return { ok: false, error: 'Padrão inválido' };
  if (!f.patterns.includes(safe)) f.patterns.push(safe);
  saveConfig(cfg);
  return { ok: true, patterns: f.patterns };
});

ipc('config:removePattern', (_, folderId, patternStr) => {
  const cfg = getConfig();
  if (!cfg.folders[folderId]) return { ok: false, error: 'Pasta não encontrada' };
  cfg.folders[folderId].patterns = cfg.folders[folderId].patterns.filter(p => p !== patternStr);
  saveConfig(cfg);
  return { ok: true, patterns: cfg.folders[folderId].patterns };
});

// Dialog
ipc('dialog:openFolder', async () => {
  const r = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'], title: 'Selecionar Pasta para Monitorar'
  });
  return r.canceled ? null : r.filePaths[0];
});

// Settings
ipc('settings:get', async () => {
  const cfg       = getConfig();
  const admin     = await adminGuard.isAdmin();
  const autoStart = await adminGuard.isAutoStartEnabled();
  return {
    ok: true,
    language:             cfg.language    || 'pt',
    hasPassword:          !!cfg.adminPasswordHash,
    adminUsername:        cfg.adminUsername || '',
    isAdmin:              admin,
    autoStart:            autoStart,
    currentUser:          adminGuard.getCurrentUsername(),
    autoStartUsername:    cfg.autoStartUsername || '',
    desktopNotifications: cfg.desktopNotifications !== false,
    alertEmailEnabled:    !!cfg.alertEmailEnabled,
    alertEmail:           cfg.alertEmail  || '',
    smtpHost:             cfg.smtpHost    || '',
    smtpPort:             cfg.smtpPort    || 587,
    smtpUser:             cfg.smtpUser    || '',
  };
});

ipc('settings:setLanguage', (_, lang) => {
  const cfg = getConfig();
  cfg.language = adminGuard.sanitize(lang, 8);
  saveConfig(cfg); i18n.loadLang(cfg.language);
  return { ok: true };
});

ipc('settings:setAdminPassword', (_, current, newPw) => {
  const cfg = getConfig();
  // Verify current password if one exists
  if (cfg.adminPasswordHash) {
    const r = adminGuard.verifyPasswordRateLimited(current, cfg.adminPasswordHash);
    if (!r.ok) return r;
  }
  const clean = adminGuard.sanitize(newPw, 128);
  if (!clean || clean.length < 4) return { ok: false, error: 'A nova senha deve ter pelo menos 4 caracteres' };
  cfg.adminPasswordHash = adminGuard.hashPassword(clean);
  saveConfig(cfg);
  return { ok: true };
});

ipc('settings:verifyPassword', (_, password) => {
  const cfg = getConfig();
  return adminGuard.verifyPasswordRateLimited(password, cfg.adminPasswordHash);
});

ipc('settings:removePassword', (_, current) => {
  const cfg = getConfig();
  if (cfg.adminPasswordHash) {
    const r = adminGuard.verifyPasswordRateLimited(current, cfg.adminPasswordHash);
    if (!r.ok) return r;
  }
  cfg.adminPasswordHash = '';
  saveConfig(cfg);
  return { ok: true };
});

ipc('settings:setAutoStart', async (_, enable, opts) => {
  const exePath = process.execPath;
  const result  = await adminGuard.setAutoStart(exePath, enable, opts || {});
  if (result.ok) {
    const cfg = getConfig();
    cfg.autoStart = enable;
    cfg.autoStartUsername = (opts && opts.username) ? adminGuard.sanitize(opts.username, 64) : '';
    saveConfig(cfg);
  }
  return result;
});

ipc('settings:testWindowsUser', (_, username) => {
  return adminGuard.testWindowsUser(username);
});

ipc('settings:protectConfig', () => {
  const cfgPath = store.path;
  return adminGuard.protectConfigFile(cfgPath);
});

ipc('settings:exportScript', (_, folderId) => {
  const cfg = getConfig();
  const folder = cfg.folders[folderId];
  if (!folder) return { ok: false, error: 'Pasta não encontrada' };
  const safePath = dialog.showSaveDialogSync(mainWindow, {
    defaultPath: `protect-${folder.label || folderId}.ps1`,
    filters: [{ name: 'PowerShell', extensions: ['ps1'] }]
  });
  if (!safePath) return { ok: false, error: 'Cancelado' };
  return adminGuard.exportProtectionScript(folder, safePath);
});

// Guardian
ipc('guardian:start', (_, password) => {
  const cfg = getConfig();
  // ── Mandatory admin password ──
  if (!cfg.adminPasswordHash) return { ok: false, error: 'Defina uma senha administrativa antes de iniciar o Guardião', needPassword: true };
  const pwCheck = adminGuard.verifyPasswordRateLimited(password, cfg.adminPasswordHash);
  if (!pwCheck.ok) return pwCheck;
  if (guardian) return { ok: true, running: true };
  const folders = Object.values(cfg.folders).filter(f => f.enabled);
  if (!folders.length) return { ok: false, error: 'Nenhuma pasta habilitada' };
  guardian = new Guardian(folders, validator, store, (violation) => {
    const liveCfg = getConfig();
    // 1. Suggest compliant name and attach to violation
    const firstPat = liveCfg.folders[violation.folderId]?.patterns?.[0];
    violation.suggestion = suggestCompliantName(violation.file, firstPat) || null;
    // 2. Desktop notification (Windows native)
    if (liveCfg.desktopNotifications !== false) {
      try {
        const body = violation.suggestion
          ? `"${violation.file}" fora do padrão.\nSugestão: ${violation.suggestion}`
          : `"${violation.file}" não está em conformidade\nPasta: ${violation.folder}`;
        new Notification({ title: '⚠ Violação — FreeNameConvention', body }).show();
      } catch {}
    }
    // 3. Email notification
    if (liveCfg.alertEmailEnabled && liveCfg.alertEmail) {
      sendViolationEmail(liveCfg, violation).catch(() => {});
    }
    // 4. Push to renderer (real-time toast)
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('violation:new', violation);
    }
    // 5. Native rename dialog (only for 'log' action — file stays in place)
    const liveFolder = liveCfg.folders[violation.folderId];
    if (violation.suggestion && (!liveFolder?.action || liveFolder.action === 'log')) {
      const oldFilePath = path.join(liveFolder.path, violation.file);
      if (fs.existsSync(oldFilePath)) {
        const appliedNormId = liveFolder?.appliedNormativeId;
        const norm = appliedNormId ? normatives.getById(appliedNormId) : null;
        const exampleLines = (norm?.patterns || []).slice(0, 3)
          .map(p => `  • ${p.example || p.template}`).filter(Boolean).join('\n');
        const detail = [
          `Pasta monitorada: ${violation.folder}`,
          norm ? `Normativa aplicada: ${norm.name}` : '',
          exampleLines ? `\nExemplos de nomes válidos:\n${exampleLines}` : '',
          `\n💡 Nome sugerido em conformidade:\n  ${violation.suggestion}`
        ].filter(Boolean).join('\n');
        dialog.showMessageBox(mainWindow, {
          type: 'warning',
          title: 'FreeNameConvention — Arquivo fora do padrão',
          message: `"${violation.file}" não está em conformidade`,
          detail,
          buttons: ['✏ Renomear para o nome sugerido', '📦 Mover para quarentena', '🔕 Ignorar por agora'],
          defaultId: 0, cancelId: 2, noLink: true
        }).then(({ response }) => {
          if (response === 0) {
            const newFilePath = path.join(liveFolder.path, violation.suggestion);
            try { fs.renameSync(oldFilePath, newFilePath); } catch (e) { console.error('[Rename]', e.message); }
          } else if (response === 1) {
            const quarDir = liveFolder.quarantineFolder || '_NONCOMPLIANT';
            try {
              const qPath = path.join(liveFolder.path, quarDir);
              if (!fs.existsSync(qPath)) fs.mkdirSync(qPath, { recursive: true });
              let dest = path.join(qPath, violation.file);
              if (fs.existsSync(dest)) {
                const ext = path.extname(violation.file);
                dest = path.join(qPath, `${path.basename(violation.file, ext)}_${Date.now()}${ext}`);
              }
              fs.renameSync(oldFilePath, dest);
            } catch (e) { console.error('[ManualQuarantine]', e.message); }
          }
        }).catch(() => {});
      }
    }
  });
  guardian.start();
  return { ok: true };
});

ipc('guardian:stop', (_, password) => {
  const cfg = getConfig();
  if (cfg.adminPasswordHash) {
    const pwCheck = adminGuard.verifyPasswordRateLimited(password, cfg.adminPasswordHash);
    if (!pwCheck.ok) return pwCheck;
  }
  if (guardian) { guardian.stop(); guardian = null; }
  return { ok: true };
});

// Admin Windows users can reset the password without knowing the current one
ipc('settings:adminResetPassword', async (_, newPw) => {
  const isAdm = await adminGuard.isAdmin();
  if (!isAdm) return { ok: false, error: 'Apenas administradores do Windows podem resetar a senha' };
  const clean = adminGuard.sanitize(newPw, 128);
  if (!clean || clean.length < 4) return { ok: false, error: 'A nova senha deve ter pelo menos 4 caracteres' };
  const cfg = getConfig();
  cfg.adminPasswordHash = adminGuard.hashPassword(clean);
  saveConfig(cfg);
  return { ok: true };
});

ipc('guardian:status', () => ({
  ok: true, running: !!guardian,
  stats: guardian ? guardian.getStats() : null
}));

// Validate
ipc('validate:file', (_, filename, folderId) => {
  const cfg    = getConfig();
  const folder = folderId ? cfg.folders[folderId] : null;
  const pats   = folder ? folder.patterns : Object.values(cfg.folders).flatMap(f => f.patterns);
  if (!pats.length) return { ok: true, valid: false, reason: 'Nenhum padrão configurado', suggestion: null };
  // Convert string patterns to the objects validateFilename expects
  const patObjs = pats.map(p => ({ pattern: p, extensions: ['*'], enabled: true }));
  const result  = validator.validateFilename(filename, patObjs);
  const suggestion = result.valid ? null : suggestCompliantName(filename, pats[0]);
  return { ok: true, ...result, suggestion, reason: result.valid ? null : (result.issues?.[0] || 'Nome não corresponde a nenhum padrão') };
});

// Normatives
ipc('normatives:getAll', () => {
  return { ok: true, normatives: normatives.getAll() };
});

ipc('normatives:getById', (_, id) => {
  const n = normatives.getById(id);
  return n ? { ok: true, normative: n } : { ok: false, error: 'Normativa não encontrada' };
});

ipc('normatives:applyToFolder', (_, folderId, normativeId) => {
  const cfg = getConfig();
  if (!cfg.folders[folderId]) return { ok: false, error: 'Pasta não encontrada' };
  const n = normatives.getById(normativeId);
  if (!n) return { ok: false, error: 'Normativa não encontrada' };
  const existing = new Set(cfg.folders[folderId].patterns);
  n.patterns.forEach(p => existing.add(p.template || p));
  cfg.folders[folderId].patterns = [...existing];
  saveConfig(cfg);
  return { ok: true, patterns: cfg.folders[folderId].patterns };
});

// Extensions per folder
ipc('config:setExtensions', (_, folderId, extensions) => {
  const cfg = getConfig();
  if (!cfg.folders[folderId]) return { ok: false, error: 'Pasta não encontrada' };
  cfg.folders[folderId].extensions = Array.isArray(extensions) ? extensions : ['*'];
  saveConfig(cfg);
  return { ok: true };
});

// Admin identity
ipc('settings:saveAdminUser', (_, username) => {
  const cfg = getConfig();
  cfg.adminUsername = adminGuard.sanitize(username || '', 64);
  saveConfig(cfg);
  return { ok: true };
});

// Desktop notification toggle
ipc('settings:saveNotifConfig', (_, notifCfg) => {
  const cfg = getConfig();
  cfg.desktopNotifications = !!notifCfg.desktopNotifications;
  saveConfig(cfg);
  return { ok: true };
});

// Email config
ipc('settings:saveEmailConfig', (_, emailCfg) => {
  const cfg = getConfig();
  cfg.alertEmailEnabled = !!emailCfg.alertEmailEnabled;
  cfg.alertEmail        = adminGuard.sanitize(emailCfg.alertEmail  || '', 200);
  cfg.smtpHost          = adminGuard.sanitize(emailCfg.smtpHost    || '', 200);
  cfg.smtpPort          = parseInt(emailCfg.smtpPort) || 587;
  cfg.smtpUser          = adminGuard.sanitize(emailCfg.smtpUser    || '', 200);
  cfg.smtpPass          = adminGuard.sanitize(emailCfg.smtpPass    || '', 200);
  saveConfig(cfg);
  return { ok: true };
});

ipc('settings:testEmail', async (_, emailCfg) => {
  let nodemailer;
  try { nodemailer = require('nodemailer'); }
  catch { return { ok: false, error: 'Módulo nodemailer não instalado. Execute: npm install nodemailer' }; }
  try {
    const trans = nodemailer.createTransport({
      host: emailCfg.smtpHost, port: parseInt(emailCfg.smtpPort) || 587,
      secure: parseInt(emailCfg.smtpPort) === 465,
      auth: { user: emailCfg.smtpUser, pass: emailCfg.smtpPass || '' },
      tls: { rejectUnauthorized: false }
    });
    await trans.sendMail({
      from: `"FreeNameConvention" <${emailCfg.smtpUser}>`,
      to:   emailCfg.alertEmail,
      subject: '[FNC] Teste — configuração de e-mail OK',
      text: 'Este e-mail confirma que o FreeNameConvention consegue enviar alertas para este endereço. Nenhuma ação é necessária.'
    });
    return { ok: true };
  } catch (e) { return { ok: false, error: e.message }; }
});

// Config export / import
ipc('config:exportConfig', async () => {
  const cfg = getConfig();
  const savePath = dialog.showSaveDialogSync(mainWindow, {
    defaultPath: `fnc-config-${new Date().toISOString().slice(0, 10)}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }],
    title: 'Exportar Configuração FreeNameConvention'
  });
  if (!savePath) return { ok: false, error: 'Cancelado' };
  try {
    const exportData = { version: app.getVersion(), exportedAt: new Date().toISOString(), folders: cfg.folders, language: cfg.language };
    fs.writeFileSync(savePath, JSON.stringify(exportData, null, 2), 'utf8');
    return { ok: true, path: savePath };
  } catch (e) { return { ok: false, error: e.message }; }
});

ipc('config:importConfig', async () => {
  const r = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
    title: 'Importar Configuração FreeNameConvention'
  });
  if (r.canceled) return { ok: false, error: 'Cancelado' };
  try {
    const data = JSON.parse(fs.readFileSync(r.filePaths[0], 'utf8'));
    if (!data.folders) return { ok: false, error: 'Arquivo inválido — campo "folders" não encontrado' };
    const cfg = getConfig();
    cfg.folders = { ...cfg.folders, ...data.folders };
    if (data.language) cfg.language = data.language;
    saveConfig(cfg);
    return { ok: true, count: Object.keys(data.folders).length };
  } catch (e) { return { ok: false, error: e.message }; }
});

// Rename non-compliant file to suggested name
ipc('file:renameNonCompliant', (_, folderPath, oldName, newName) => {
  if (!folderPath || !oldName || !newName) return { ok: false, error: 'Parâmetros inválidos' };
  const oldFp = path.join(folderPath, oldName);
  const newFp = path.join(folderPath, newName);
  if (!fs.existsSync(oldFp)) return { ok: false, error: 'Arquivo não encontrado' };
  if (fs.existsSync(newFp)) return { ok: false, error: 'Já existe um arquivo com este nome' };
  try { fs.renameSync(oldFp, newFp); return { ok: true }; }
  catch (e) { return { ok: false, error: e.message }; }
});

// Log
ipc('log:get', (_, limit) => {
  const log = store.get('violations', []);
  return { ok: true, log: log.slice(0, limit || 200) };
});

ipc('log:clear', () => {
  store.set('violations', []);
  return { ok: true };
});

// Feedback
ipc('feedback:open', (_, data) => {
  const title = encodeURIComponent(adminGuard.sanitize(data?.title || 'Feedback', 128));
  const body  = encodeURIComponent(adminGuard.sanitize(data?.description || '', 512));
  const url   = `https://github.com/rfranca777/FreeNameConvention/issues/new?title=${title}&body=${body}`;
  shell.openExternal(url);
  return { ok: true };
});

// Folder lock / unlock (restrict access via icacls)
ipc('folder:lockAccess', async (_, folderId) => {
  if (process.platform !== 'win32') return { ok: false, error: 'Recurso disponível apenas no Windows' };
  const cfg = getConfig();
  const f = cfg.folders?.[folderId];
  if (!f) return { ok: false, error: 'Pasta não encontrada na configuração' };
  const folderPath = adminGuard.sanitize(f.path, 512);
  if (!folderPath || !fs.existsSync(folderPath)) return { ok: false, error: 'Caminho da pasta não existe no disco' };
  try {
    const user = adminGuard.getFullUsername();
    // Use SID *S-1-5-32-544 for Administrators (locale-independent — works on any Windows language)
    await execAsync(`icacls "${folderPath}" /inheritance:r /grant:r "${user}:(OI)(CI)F" /grant:r "SYSTEM:(OI)(CI)F" /grant:r "*S-1-5-32-544:(OI)(CI)F"`, { timeout: 15000 });
    cfg.folders[folderId].locked = true;
    saveConfig(cfg);
    return { ok: true, message: `Acesso restrito à pasta "${f.label || f.path}" aplicado com sucesso.` };
  } catch (err) {
    return { ok: false, error: `Falha ao aplicar restrição: ${err.message}. Execute como administrador.` };
  }
});

ipc('folder:unlockAccess', async (_, folderId) => {
  if (process.platform !== 'win32') return { ok: false, error: 'Recurso disponível apenas no Windows' };
  const cfg = getConfig();
  const f = cfg.folders?.[folderId];
  if (!f) return { ok: false, error: 'Pasta não encontrada na configuração' };
  const folderPath = adminGuard.sanitize(f.path, 512);
  if (!folderPath || !fs.existsSync(folderPath)) return { ok: false, error: 'Caminho da pasta não existe no disco' };
  try {
    // Restore inheritance and reset to default permissions
    await execAsync(`icacls "${folderPath}" /reset /t`, { timeout: 15000 });
    cfg.folders[folderId].locked = false;
    saveConfig(cfg);
    return { ok: true, message: `Permissões da pasta "${f.label || f.path}" restauradas ao padrão.` };
  } catch (err) {
    return { ok: false, error: `Falha ao restaurar permissões: ${err.message}. Execute como administrador.` };
  }
});

// Shell — STRIDE-T: strict URL scheme whitelist to prevent command injection
ipc('shell:openUrl', (_, url) => {
  if (typeof url === 'string' && /^(https?:|mailto:)/i.test(url)) {
    shell.openExternal(url);
    return { ok: true };
  }
  return { ok: false, error: 'URL inválida' };
});

// App version — renderer reads this for the about modal
ipc('app:getVersion', () => ({ ok: true, version: app.getVersion() }));
