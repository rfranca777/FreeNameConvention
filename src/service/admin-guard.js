'use strict';

/**
 * FreeNameConvention — Admin Guard v2.0
 *
 * Security following Microsoft STRIDE:
 *   S — Spoofing:              PBKDF2 + rate-limit
 *   T — Tampering:             Input sanitization, icacls
 *   R — Repudiation:           Structured results from every op
 *   I — Information Disclosure: Constant-time compare, sanitized errors
 *   D — Denial of Service:     execAsync + timeout (never blocks thread)
 *   E — Elevation of Privilege: Explicit admin check, Task Scheduler scoping
 */

const { exec }      = require('child_process');
const { promisify } = require('util');
const crypto        = require('crypto');
const fs            = require('fs');

const execAsync = promisify(exec);

// ── STRIDE-D: Rate Limiting ───────────────────────────────────────────────────
const _rate = { count: 0, firstAt: 0, lockedUntil: 0 };
const MAX_TRIES = 5;
const LOCK_MS   = 5 * 60 * 1000;
const WIN_MS    = 15 * 60 * 1000;

function _checkRate() {
  const now = Date.now();
  if (now < _rate.lockedUntil) {
    return { allowed: false, remainingSec: Math.ceil((_rate.lockedUntil - now) / 1000) };
  }
  if (now - _rate.firstAt > WIN_MS) {
    _rate.count = 0; _rate.firstAt = now; _rate.lockedUntil = 0;
  }
  return { allowed: true };
}
function _recordFail() {
  if (_rate.count === 0) _rate.firstAt = Date.now();
  _rate.count++;
  if (_rate.count >= MAX_TRIES) _rate.lockedUntil = Date.now() + LOCK_MS;
}
function _resetRate() { _rate.count = 0; _rate.firstAt = 0; _rate.lockedUntil = 0; }

// ── STRIDE-T: Input Sanitization ─────────────────────────────────────────────
function sanitize(s, maxLen = 256) {
  if (typeof s !== 'string') return '';
  return s.replace(/[\x00-\x1f\x7f]/g, '').trim().slice(0, maxLen);
}

// ── STRIDE-S: Admin check — async, never blocks Electron main thread ──────────
async function isAdmin() {
  if (process.platform !== 'win32') {
    return typeof process.getuid === 'function' && process.getuid() === 0;
  }
  try { await execAsync('net session', { timeout: 5000 }); return true; }
  catch { return false; }
}

function getCurrentUsername() {
  const user = sanitize(process.env.USERNAME || process.env.USER || 'Unknown', 64);
  const domain   = (process.env.USERDOMAIN   || '').toUpperCase();
  const computer = (process.env.COMPUTERNAME || '').toUpperCase();
  // Include domain prefix when joined to a domain (USERDOMAIN ≠ COMPUTERNAME)
  if (domain && domain !== computer) {
    return sanitize(`${domain}\\${user}`, 128);
  }
  return user;
}

/**
 * Returns DOMAIN\username (always qualified) — for icacls / schtasks commands.
 * Falls back to bare username on standalone machines.
 */
function getFullUsername() {
  const user   = sanitize(process.env.USERNAME || process.env.USER || 'Unknown', 64);
  const domain = sanitize(process.env.USERDOMAIN || '', 64);
  return domain ? `${domain}\\${user}` : user;
}

/**
 * Returns true when the machine belongs to an Active Directory domain.
 */
function isDomainJoined() {
  const domain   = (process.env.USERDOMAIN   || '').toUpperCase();
  const computer = (process.env.COMPUTERNAME || '').toUpperCase();
  return !!(domain && domain !== computer);
}

// ── STRIDE-S: Password — PBKDF2 (not raw SHA-256) ────────────────────────────
function hashPassword(password) {
  const clean = sanitize(password, 128);
  if (!clean) throw new Error('A senha não pode estar vazia');
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(clean, salt, 100_000, 64, 'sha512').toString('hex');
  return `pbkdf2:${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash) return true;
  const clean = sanitize(password, 128);
  // Legacy SHA-256 migration
  if (!storedHash.startsWith('pbkdf2:')) {
    return crypto.createHash('sha256').update(clean, 'utf8').digest('hex') === storedHash;
  }
  const parts = storedHash.split(':');
  if (parts.length !== 3) return false;
  const [, salt, expected] = parts;
  const actual = crypto.pbkdf2Sync(clean, salt, 100_000, 64, 'sha512').toString('hex');
  try {
    // STRIDE-I: constant-time compare
    return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
  } catch { return false; }
}

function verifyPasswordRateLimited(password, storedHash) {
  const r = _checkRate();
  if (!r.allowed) {
    const m = Math.ceil(r.remainingSec / 60);
    return { ok: false, locked: true, remainingSec: r.remainingSec,
      error: `Muitas tentativas. Aguarde ${m} min antes de tentar novamente.` };
  }
  const ok = verifyPassword(password, storedHash);
  if (!ok) {
    _recordFail();
    const r2 = _checkRate();
    if (!r2.allowed) return { ok: false, locked: true, remainingSec: r2.remainingSec,
      error: 'Acesso bloqueado por 5 minutos.' };
    const left = MAX_TRIES - _rate.count;
    return { ok: false, attemptsLeft: left,
      error: `Senha incorreta. ${left} tentativa(s) restante(s).` };
  }
  _resetRate();
  return { ok: true };
}

// ── STRIDE-E: Auto-start via Task Scheduler (with credential support) ─────────
async function setAutoStart(appPath, enable, opts = {}) {
  if (process.platform !== 'win32') return { ok: false, error: 'Apenas Windows' };
  const task = 'FreeNameConvention Guardian';
  const safe = sanitize(appPath, 512);

  try {
    if (enable) {
      await execAsync(`schtasks /delete /tn "${task}" /f`, { timeout: 8000 }).catch(() => {});
      let cmd;
      if (opts.username) {
        const u = sanitize(opts.username, 64);
        const p = sanitize(opts.password || '', 128);
        if (!u) return { ok: false, error: 'Nome de usuário inválido' };
        cmd = `schtasks /create /f /tn "${task}" /tr "\\"${safe}\\" --service" /sc ONLOGON /ru "${u}" /rp "${p}"`;
      } else {
        cmd = `schtasks /create /f /tn "${task}" /tr "\\"${safe}\\" --service" /sc ONLOGON /rl HIGHEST`;
      }
      await execAsync(cmd, { timeout: 15_000 });
      return { ok: true, method: 'scheduler' };
    } else {
      await execAsync(`schtasks /delete /tn "${task}" /f`, { timeout: 8000 }).catch(() => {});
      await execAsync(
        'reg delete "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "FreeNameConvention" /f',
        { timeout: 5000 }).catch(() => {});
      return { ok: true };
    }
  } catch (err) {
    // Fallback: HKCU registry
    try {
      const key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
      if (enable) {
        await execAsync(`reg add "${key}" /v "FreeNameConvention" /d "\\"${safe}\\" --service" /f`, { timeout: 5000 });
        return { ok: true, method: 'registry', warning: 'Agenda de tarefas indisponível. Registro utilizado como alternativa.' };
      } else {
        await execAsync(`reg delete "${key}" /v "FreeNameConvention" /f`, { timeout: 5000 }).catch(() => {});
        return { ok: true };
      }
    } catch (e2) {
      return { ok: false, error: `Falha ao configurar: ${err.message}` };
    }
  }
}

async function isAutoStartEnabled() {
  if (process.platform !== 'win32') return false;
  try {
    const { stdout } = await execAsync('schtasks /query /tn "FreeNameConvention Guardian" /fo LIST', { timeout: 5000 });
    return stdout.includes('FreeNameConvention Guardian');
  } catch {
    try {
      const { stdout } = await execAsync(
        'reg query "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "FreeNameConvention"',
        { timeout: 3000 });
      return stdout.includes('FreeNameConvention');
    } catch { return false; }
  }
}

async function testWindowsUser(username) {
  if (process.platform !== 'win32') return { ok: true };
  const u = sanitize(username, 128);
  if (!u) return { ok: false, error: 'Nome de usuário não pode estar vazio' };

  const hasDomain = u.includes('\\');
  const userName  = hasDomain ? u.split('\\').pop() : u;

  // 1. Try local account lookup
  try {
    await execAsync(`net user "${userName}"`, { timeout: 8000 });
    return { ok: true, scope: 'local' };
  } catch { /* not local — continue */ }

  // 2. Try domain account lookup
  try {
    await execAsync(`net user "${userName}" /domain`, { timeout: 10000 });
    return { ok: true, scope: 'domain' };
  } catch { /* not found in domain either */ }

  return { ok: false, error: `Usuário "${u}" não encontrado no sistema local nem no domínio` };
}

// ── STRIDE-T: Config file ACL protection ─────────────────────────────────────
async function protectConfigFile(filePath) {
  if (process.platform !== 'win32') return { ok: false, error: 'Apenas Windows' };
  const safe = sanitize(filePath, 512);
  if (!safe || !fs.existsSync(safe)) return { ok: false, error: 'Arquivo não encontrado' };
  try {
    const user = getFullUsername();
    // Use SID for Administrators (locale-independent) + current user + SYSTEM
    await execAsync(`icacls "${safe}" /inheritance:r /grant:r "${user}:F" /grant:r "SYSTEM:F" /grant:r "*S-1-5-32-544:F"`, { timeout: 10_000 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `Não foi possível proteger: ${err.message}` };
  }
}

// ── Export standalone PowerShell script ──────────────────────────────────────
function exportProtectionScript(folderCfg, outputPath) {
  const safe    = sanitize(outputPath, 512);
  const patterns = (folderCfg.patterns || []);
  const q        = sanitize(folderCfg.quarantineFolder || '_NONCOMPLIANT', 128);
  const fp       = (folderCfg.path || '').replace(/\\/g, '\\\\');
  const lines    = patterns.map(p => `    "${p.replace(/"/g, '\\"')}"`).join(',\n');

  const script = `#Requires -Version 5.1
# FreeNameConvention — Script de Proteção Standalone
# Gerado em: ${new Date().toISOString()}
# Pasta: ${folderCfg.label || folderCfg.path}
param([ValidateSet('scan','monitor')][string]$Mode = 'scan')

$FolderPath = "${fp}"
$Quarantine = "${q}"
$Action     = "${folderCfg.action || 'log'}"
$Patterns   = @(
${lines}
)

function Convert-Pattern([string]$P) {
    $r = [regex]::Escape($P)
    $r = $r -replace '\\\\\{(TEXT|TEXTO)\\\}','[A-Za-z0-9_]+'
    $r = $r -replace '\\\\\{NUM:(\\\d+)\\\}', { '\\d{'+$Matches[1]+'}' }
    $r = $r -replace '\\\\\{(DATE|DATA):YYYY-MM\\\}','\\d{4}-\\d{2}'
    $r = $r -replace '\\\\\{(DATE|DATA):YYYY\\\}','\\d{4}'
    $r = $r -replace '\\\\\{(DATE|DATA)\\\}','\\d{4}-\\d{2}-\\d{2}'
    $r = $r -replace '\\\\\{(VERSION|VERSAO)\\\}','v?\\d+(\\.\\d+)*'
    $r = $r -replace '\\\\\{UUID\\\}','[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    $r = $r -replace '\\\\\{ANY\\\}','.+'
    return "^\$r\$"
}
function Test-OK([string]$N) {
    $n = [IO.Path]::GetFileNameWithoutExtension($N)
    foreach ($p in $Patterns) { if ($n -imatch (Convert-Pattern $p)) { return $true } }
    return $false
}
function Move-Q([string]$F) {
    $d = Join-Path (Split-Path $F) $Quarantine
    if (-not (Test-Path $d)) { New-Item $d -ItemType Directory -Force|Out-Null }
    $dst = Join-Path $d (Split-Path $F -Leaf)
    if (Test-Path $dst) { $b=[IO.Path]::GetFileNameWithoutExtension($dst); $e=[IO.Path]::GetExtension($dst)
        $dst = Join-Path $d ("{0}_{1}{2}" -f $b,(Get-Date -Format 'yyyyMMdd_HHmmss'),$e) }
    Move-Item $F $dst -Force
    Write-Host "[QUARENTENA] $(Split-Path $F -Leaf)" -ForegroundColor Yellow
}

if ($Mode -eq 'scan') {
    $files = Get-ChildItem $FolderPath -File -Recurse -EA SilentlyContinue | Where-Object { \$_.DirectoryName -notlike "*\$Quarantine*" }
    $v = 0
    foreach ($f in $files) {
        if (Test-OK $f.Name) { Write-Host "[OK] $($f.Name)" -ForegroundColor Green }
        else { $v++; Write-Host "[VIOLACAO] $($f.FullName)" -ForegroundColor Red; if ($Action -ne 'log') { Move-Q $f.FullName } }
    }
    Write-Host "Concluído: $v violação(ões)." -ForegroundColor $(if($v){'Yellow'}else{'Green'})
}
if ($Mode -eq 'monitor') {
    Write-Host "Monitorando $FolderPath (Ctrl+C para parar)..." -ForegroundColor Cyan
    $w = New-Object IO.FileSystemWatcher; $w.Path=$FolderPath; $w.IncludeSubdirectories=$true; $w.EnableRaisingEvents=$true
    $j = Register-ObjectEvent $w Created -Action {
        Start-Sleep -ms 500; $f=$Event.SourceEventArgs.FullPath
        if ($f -like "*$Quarantine*" -or -not (Test-Path $f -PathType Leaf)) { return }
        $n = Split-Path $f -Leaf
        if (Test-OK $n) { Write-Host "[OK] $n" -ForegroundColor Green }
        else { Write-Host "[VIOLACAO] $n" -ForegroundColor Red; if ($Action -ne 'log') { Move-Q $f } }
    }
    try { while ($true) { Start-Sleep 1 } } finally { $w.EnableRaisingEvents=$false; Unregister-Event $j.Name; $w.Dispose() }
}
`;
  try { fs.writeFileSync(safe, script, 'utf8'); return { ok: true, path: safe }; }
  catch (e) { return { ok: false, error: e.message }; }
}

module.exports = {
  isAdmin, getCurrentUsername, getFullUsername, isDomainJoined,
  hashPassword, verifyPassword, verifyPasswordRateLimited,
  setAutoStart, isAutoStartEnabled, testWindowsUser,
  protectConfigFile, exportProtectionScript, sanitize
};
