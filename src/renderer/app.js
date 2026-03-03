'use strict';
/* global fnc */

// ══ PART TYPE DEFINITIONS ═══════════════════════════════════════════════════
const PART_TYPES = [
  { type: 'free_text', label: 'Texto livre',               desc: 'Palavras ou siglas livres — ex.: PRC, RH, TI',                    example: 'TI'           },
  { type: 'literal',   label: 'Texto fixo (literal)',       desc: 'Texto exato que sempre aparece igual — ex.: DANFE, NF, PRC',     example: 'DANFE'        },
  { type: 'fixed_num', label: 'Número sequencial',         desc: 'Número com quantidade fixa de dígitos — ex.: 0042',               example: '0042', cfg: {digits:4} },
  { type: 'date_full', label: 'Data (AAAA-MM-DD)',          desc: 'Data com hífens — ex.: 2026-03-15',                              example: '2026-03-15'   },
  { type: 'date_ymd',  label: 'Data compacta (AAAAMMDD)',   desc: 'Data SEM hífens — ex.: 20260315 — usado no DANFE/SEFAZ',        example: '20260315'     },
  { type: 'date_dmy',  label: 'Data BR (DD-MM-AAAA)',       desc: 'Data brasileira com hífens — ex.: 15-03-2026',                   example: '15-03-2026'   },
  { type: 'date_ym',   label: 'Ano e mês (AAAA-MM)',        desc: 'Mês de referência — ex.: 2026-03',                               example: '2026-03'      },
  { type: 'date_my',   label: 'Mês e Ano (MM-AAAA)',        desc: 'Competência no formato MM-AAAA — ex.: 03-2026',                  example: '03-2026'      },
  { type: 'date_year', label: 'Somente ano (AAAA)',         desc: 'Ano de referência — ex.: 2026',                                   example: '2026'         },
  { type: 'cnpj',      label: 'CNPJ Brasileiro',            desc: 'CNPJ 14 dígitos sem pontuação — ex.: 12345678000199',          example: '12345678000199' },
  { type: 'cpf',       label: 'CPF Brasileiro',             desc: 'CPF 11 dígitos sem pontuação — ex.: 12345678901',              example: '12345678901'  },
  { type: 'enum',      label: 'Lista de opções (ENUM)',     desc: 'Um dos valores fixos que você definir — ex.: NF|NFS|NFC',       example: 'NF', cfg: { options: 'NF|NFS|NFC' } },
  { type: 'text_n',    label: 'Texto tamanho exato',        desc: 'Texto com exatamente N caracteres — ex.: TI (2 chars)',         example: 'TI',  cfg: { chars: 2 } },
  { type: 'hash',      label: 'Hash Hexadecimal',           desc: 'Identificador hex com N caracteres — ex.: a1b2c3d4',            example: 'a1b2c3d4', cfg: { chars: 8 } },
  { type: 'version',   label: 'Versão do documento',       desc: 'Versão formal — ex.: v02, v1.3',                                 example: 'v02'          },
  { type: 'uuid',      label: 'Identificador único (UUID)', desc: 'Identificador único gerado automaticamente',                      example: 'a1b2c3d4-...' },
  { type: 'any',       label: 'Qualquer conteúdo',         desc: 'Qualquer sequência de caracteres válidos',                         example: 'qualquer'     },
];

const FOLDER_COLORS = [
  { name: 'Azul',     value: '#0288d1' },
  { name: 'Verde',    value: '#2e7d32' },
  { name: 'Laranja',  value: '#e65100' },
  { name: 'Vermelho', value: '#c62828' },
  { name: 'Roxo',     value: '#7b1fa2' },
  { name: 'Cinza',    value: '#546e7a' },
  { name: 'Padrão',   value: '' },
];

// ══ NORMATIVE CATEGORIES — organized by REGION / COUNTRY ═════════════════════
const NORM_CATEGORIES = [
  { id: 'global', label: 'Global / ISO', emoji: '🌐', color: 'var(--cat-quality)',
    normIds: ['iso9001','iso13485','iso15489','iso27001','iso14001','iso45001','iso19650','pci_dss','internal_generic'] },
  { id: 'br', label: 'Brasil', emoji: '🇧🇷', color: 'var(--cat-fiscal)',
    normIds: ['nfe','nfse','cte','sped','esocial','bacen4893','cvm','cfm1821','anvisa','lgpd','cnj065','clt_rh','conarq','decreto10278','abnt_nbr','mapa_agro'] },
  { id: 'us', label: 'USA', emoji: '🇺🇸', color: 'var(--cat-financial)',
    normIds: ['sox','hipaa','fda21cfr11','finra','dod5015','nist80053','ferpa'] },
  { id: 'latam', label: 'Latin America', emoji: '🌎', color: 'var(--cat-other)',
    normIds: ['cfdi_mx','lfpdppp_mx','afip_ar','dian_co','sii_cl','pipeda_ca'] },
  { id: 'eu', label: 'European Union', emoji: '🇪🇺', color: 'var(--cat-legal)',
    normIds: ['gdpr','eidas','nis2_eu','dora_eu','gobd_de','facturae_es','fatturapa_it','cnil_fr'] },
  { id: 'uk', label: 'United Kingdom', emoji: '🇬🇧', color: 'var(--cat-quality)',
    normIds: ['uk_gdpr'] },
  { id: 'apac', label: 'Asia-Pacific', emoji: '🌏', color: 'var(--cat-health)',
    normIds: ['appi_jp','privacy_au','apra_au','dpdp_in','pipa_kr','pipl_cn','pdpa_sg','pdpa_th'] },
  { id: 'mena', label: 'Middle East', emoji: '🕌', color: 'var(--cat-gov)',
    normIds: ['israel_archives','israel_privacy','pdpl_sa','difc_ae'] },
  { id: 'africa', label: 'Africa', emoji: '🌍', color: 'var(--cat-other)',
    normIds: ['popia_za','ndpr_ng','dpa_ke'] },
];

// ══ NORMATIVE FRIENDLY DISPLAY CONFIG ════════════════════════════════════════
const NORM_FRIENDLY = {
  // ── Global / ISO ──
  iso9001:         { emoji: '📋', short: 'ISO 9001',        desc: 'Quality Management — any organization' },
  iso13485:        { emoji: '🔬', short: 'ISO 13485',       desc: 'Medical Devices QMS — batch traceability' },
  iso15489:        { emoji: '🗂️', short: 'ISO 15489',      desc: 'Records Management — corporate filing' },
  iso27001:        { emoji: '🔒', short: 'ISO 27001',       desc: 'Information Security — classification' },
  iso14001:        { emoji: '🌿', short: 'ISO 14001',       desc: 'Environmental Management — licenses' },
  iso45001:        { emoji: '🦺', short: 'ISO 45001',       desc: 'Occupational Health & Safety — OH&S' },
  iso19650:        { emoji: '🏗️', short: 'ISO 19650',      desc: 'BIM — construction & engineering models' },
  pci_dss:         { emoji: '💳', short: 'PCI DSS v4.0',    desc: 'Payment Card security — global' },
  internal_generic:{ emoji: '✏️', short: 'Internal Policy', desc: 'Flexible templates for any company' },
  // ── Brazil ──
  nfe:             { emoji: '🧾', short: 'NF-e (SEFAZ)',    desc: 'Nota Fiscal eletrônica — XML & DANFE' },
  nfse:            { emoji: '🧾', short: 'NFS-e',           desc: 'Nota Fiscal de Serviços eletrônica' },
  cte:             { emoji: '🚛', short: 'CT-e',            desc: 'Conhecimento de Transporte eletrônico' },
  sped:            { emoji: '📊', short: 'SPED',            desc: 'Public Digital Bookkeeping — ECD/ECF/EFD' },
  esocial:         { emoji: '👥', short: 'eSocial',         desc: 'Labor & social events — MTE/RFB' },
  bacen4893:       { emoji: '🏦', short: 'BACEN 4.893',     desc: 'Cybersecurity policy — banks & fintechs' },
  cvm:             { emoji: '📈', short: 'CVM 480',         desc: 'Publicly traded companies — DFP/ITR' },
  cfm1821:         { emoji: '🏥', short: 'CFM 1.821',       desc: 'Electronic Medical Records — Brazil' },
  anvisa:          { emoji: '💊', short: 'ANVISA GMP',      desc: 'Good Manufacturing Practices — pharma' },
  lgpd:            { emoji: '🛡️', short: 'LGPD',           desc: 'Data Protection — Brazil (RIPD/DPIA)' },
  cnj065:          { emoji: '⚖️', short: 'CNJ 65/2008',    desc: 'Judicial case numbering — NUP format' },
  clt_rh:          { emoji: '👔', short: 'CLT / HR',        desc: 'Payslips, contracts & labor docs' },
  conarq:          { emoji: '🏛️', short: 'CONARQ',         desc: 'Public archives — e-ARQ Brasil' },
  decreto10278:    { emoji: '📄', short: 'Decree 10.278',   desc: 'Digitization of public/private docs' },
  abnt_nbr:        { emoji: '📐', short: 'ABNT NBR 13531', desc: 'Building design — architecture & eng.' },
  mapa_agro:       { emoji: '🌾', short: 'MAPA / SISLEGIS', desc: 'Agricultural traceability & certs' },
  // ── USA ──
  sox:             { emoji: '🔍', short: 'SOX',             desc: 'Sarbanes-Oxley — audit workpapers' },
  hipaa:           { emoji: '🔏', short: 'HIPAA',           desc: 'Health records privacy — USA' },
  fda21cfr11:      { emoji: '🔬', short: 'FDA 21 CFR 11',   desc: 'Electronic records — pharma/FDA' },
  finra:           { emoji: '📉', short: 'FINRA 4511',      desc: 'Broker-dealer records — Wall Street' },
  dod5015:         { emoji: '🪖', short: 'DoD 5015.02',     desc: 'US Defense records management' },
  nist80053:       { emoji: '🛡️', short: 'NIST 800-53',    desc: 'Federal information security controls' },
  ferpa:           { emoji: '🎓', short: 'FERPA',           desc: 'Student education records privacy' },
  // ── Latin America ──
  cfdi_mx:         { emoji: '🇲🇽', short: 'CFDI (SAT)',    desc: 'Mexico — electronic invoicing' },
  lfpdppp_mx:      { emoji: '🔐', short: 'LFPDPPP',        desc: 'Mexico — data protection law' },
  afip_ar:         { emoji: '🇦🇷', short: 'AFIP',          desc: 'Argentina — electronic invoicing' },
  dian_co:         { emoji: '🇨🇴', short: 'DIAN',          desc: 'Colombia — electronic invoicing' },
  sii_cl:          { emoji: '🇨🇱', short: 'SII DTE',       desc: 'Chile — electronic tax documents' },
  pipeda_ca:       { emoji: '🇨🇦', short: 'PIPEDA',        desc: 'Canada — privacy & data protection' },
  // ── Europe ──
  gdpr:            { emoji: '🇪🇺', short: 'GDPR',          desc: 'EU Data Protection — DPIA/ROPA' },
  eidas:           { emoji: '✍️', short: 'eIDAS',           desc: 'EU digital signatures & trust' },
  nis2_eu:         { emoji: '🔐', short: 'NIS2',            desc: 'EU cybersecurity for critical infra' },
  dora_eu:         { emoji: '🏦', short: 'DORA',            desc: 'EU digital resilience — finance' },
  uk_gdpr:         { emoji: '🇬🇧', short: 'UK GDPR',       desc: 'UK data protection + DPA 2018' },
  gobd_de:         { emoji: '🇩🇪', short: 'GoBD',          desc: 'Germany — tax document archiving' },
  facturae_es:     { emoji: '🇪🇸', short: 'Factura-e',     desc: 'Spain — electronic invoicing' },
  fatturapa_it:    { emoji: '🇮🇹', short: 'FatturaPA',     desc: 'Italy — electronic invoicing via SDI' },
  cnil_fr:         { emoji: '🇫🇷', short: 'CNIL',          desc: 'France — data protection guidelines' },
  // ── Asia-Pacific ──
  appi_jp:         { emoji: '🇯🇵', short: 'APPI',          desc: 'Japan — personal information act' },
  privacy_au:      { emoji: '🇦🇺', short: 'Privacy Act',   desc: 'Australia — privacy & NDB scheme' },
  apra_au:         { emoji: '🏦', short: 'APRA CPS 234',   desc: 'Australia — prudential info security' },
  dpdp_in:         { emoji: '🇮🇳', short: 'DPDP Act',      desc: 'India — digital personal data' },
  pipa_kr:         { emoji: '🇰🇷', short: 'PIPA',          desc: 'South Korea — personal info act' },
  pipl_cn:         { emoji: '🇨🇳', short: 'PIPL',          desc: 'China — personal info protection' },
  pdpa_sg:         { emoji: '🇸🇬', short: 'PDPA',          desc: 'Singapore — personal data protection' },
  pdpa_th:         { emoji: '🇹🇭', short: 'PDPA',          desc: 'Thailand — personal data protection' },
  // ── Middle East ──
  israel_archives: { emoji: '📜', short: 'IL Archives',    desc: 'Israel — state archives law' },
  israel_privacy:  { emoji: '🔐', short: 'IL Privacy',     desc: 'Israel — privacy protection law' },
  pdpl_sa:         { emoji: '🇸🇦', short: 'PDPL',          desc: 'Saudi Arabia — personal data law' },
  difc_ae:         { emoji: '🇦🇪', short: 'DIFC DPL',      desc: 'UAE/DIFC — data protection law' },
  // ── Africa ──
  popia_za:        { emoji: '🇿🇦', short: 'POPIA',         desc: 'South Africa — personal info act' },
  ndpr_ng:         { emoji: '🇳🇬', short: 'NDPR/NDPA',     desc: 'Nigeria — data protection' },
  dpa_ke:          { emoji: '🇰🇪', short: 'DPA 2019',      desc: 'Kenya — data protection act' },
};

// ══ STATE ═══════════════════════════════════════════════════════════════════
let state = {
  folders: {}, normatives: [], settings: {}, guardianRunning: false,
};
let builderParts = [];
let builderCallbackFolderId = null;
// Wizard state
let _wizardFolderPath = null;
let _wizardNormId     = null;
// Edit modal state
let _editFolderId     = null;
let _editFolderColor  = '';
// Norm picker state
let _pickerCallback   = null;
let _pickerSelectedId = null;

// ══ PART TYPE HELPERS ════════════════════════════════════════════════════════
function partTypeInfo(type) { return PART_TYPES.find(p => p.type === type) || PART_TYPES[0]; }

function partToToken(part) {
  switch (part.type) {
    case 'free_text':  return '{TEXT}';
    case 'literal':    return part.value || 'TEXTO';
    case 'fixed_num':  return `{NUM:${part.digits || 4}}`;
    case 'date_full':  return '{DATE}';
    case 'date_ymd':   return '{DATE:YYYYMMDD}';
    case 'date_dmy':   return '{DATE:DD-MM-YYYY}';
    case 'date_ym':    return '{DATE:YYYY-MM}';
    case 'date_my':    return '{DATE:MM-YYYY}';
    case 'date_year':  return '{DATE:YYYY}';
    case 'cnpj':       return '{CNPJ}';
    case 'cpf':        return '{CPF}';
    case 'enum':       return `{ENUM:${part.options || 'A|B|C'}}`;
    case 'text_n':     return `{TEXT:${part.chars || 2}}`;
    case 'hash':       return `{HASH:${part.chars || 8}}`;
    case 'version':    return '{VERSION}';
    case 'uuid':       return '{UUID}';
    case 'any':        return '{ANY}';
    default:           return '{TEXT}';
  }
}

function partToExample(part) {
  switch (part.type) {
    case 'free_text':  return 'TI';
    case 'literal':    return part.value || 'TEXTO';
    case 'fixed_num':  { const d = part.digits || 4; return String(42).padStart(d, '0'); }
    case 'date_full':  return '2026-03-15';
    case 'date_ymd':   return '20260315';
    case 'date_dmy':   return '15-03-2026';
    case 'date_ym':    return '2026-03';
    case 'date_my':    return '03-2026';
    case 'date_year':  return '2026';
    case 'cnpj':       return '12345678000199';
    case 'cpf':        return '12345678901';
    case 'enum':       return (part.options || 'A|B|C').split('|')[0];
    case 'text_n':     { const c = part.chars || 2; return 'AB'.repeat(Math.ceil(c/2)).slice(0,c); }
    case 'hash':       return 'a1b2c3d4'.slice(0, part.chars || 8);
    case 'version':    return 'v02';
    case 'uuid':       return 'a1b2c3d4';
    case 'any':        return 'dados';
    default:           return '?';
  }
}

function builderToPattern(parts) {
  if (!parts.length) return '';
  return parts.map((p, i) => partToToken(p) + (i < parts.length - 1 ? (p.sep || '-') : '')).join('');
}

function builderToPreview(parts) {
  if (!parts.length) return '—';
  return parts.map((p, i) => partToExample(p) + (i < parts.length - 1 ? (p.sep || '-') : '')).join('');
}

function patternToParts(raw) {
  if (!raw) return [];
  const parts = []; let rest = raw;
  while (rest.length > 0) {
    const m = rest.match(/^(\{[^}]+\}|[^{}\-_.]+)([-_.]?)(.*)/s);
    if (!m) break;
    const tok = m[1]; const sep = m[2] || ''; rest = m[3];
    let type, digits, value, options, chars;
    if      (tok === '{TEXT}' || tok === '{TEXTO}')      { type = 'free_text'; }
    else if (tok === '{DATE}' || tok === '{DATA}')        { type = 'date_full'; }
    else if (tok === '{DATE:YYYYMMDD}' || tok === '{DATA:AAAAMMDD}') { type = 'date_ymd'; }
    else if (tok === '{DATE:DD-MM-YYYY}' || tok === '{DATA:DD-MM-AAAA}') { type = 'date_dmy'; }
    else if (tok === '{DATE:YYYY-MM}')                    { type = 'date_ym'; }
    else if (tok === '{DATE:MM-YYYY}')                    { type = 'date_my'; }
    else if (tok === '{DATE:YYYY}')                       { type = 'date_year'; }
    else if (tok === '{CNPJ}')                            { type = 'cnpj'; }
    else if (tok === '{CPF}')                             { type = 'cpf'; }
    else if (tok === '{VERSION}' || tok === '{VERSAO}')   { type = 'version'; }
    else if (tok === '{UUID}')                            { type = 'uuid'; }
    else if (tok === '{ANY}')                             { type = 'any'; }
    else if (/^\{NUM:\d+\}$/.test(tok)) { type = 'fixed_num'; digits = parseInt(tok.match(/\d+/)[0]); }
    else if (/^\{ENUM:[^}]+\}$/.test(tok)) { type = 'enum'; options = tok.match(/\{ENUM:([^}]+)\}/)[1]; }
    else if (/^\{TEXT:\d+\}$/.test(tok)) { type = 'text_n'; chars = parseInt(tok.match(/\d+/)[0]); }
    else if (/^\{HASH:\d+\}$/.test(tok)) { type = 'hash';   chars = parseInt(tok.match(/\d+/)[0]); }
    else { type = 'literal'; value = tok.replace(/^\{(.+)\}$/, '$1'); }
    const part = { type, sep };
    if (digits  !== undefined) part.digits  = digits;
    if (value   !== undefined) part.value   = value;
    if (options !== undefined) part.options = options;
    if (chars   !== undefined) part.chars   = chars;
    parts.push(part);
  }
  return parts;
}

// ══ HELPERS ══════════════════════════════════════════════════════════════════
function toast(msg, kind = 'ok', ms = 3000) {
  const c  = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className   = `toast ${kind}`;
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => { el.style.animation = 'toast-out 0.3s ease forwards'; setTimeout(() => el.remove(), 300); }, ms);
}

function escHtml(s) {
  if (typeof s !== 'string') return String(s ?? '');
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ══ GLOBAL BUSY LOCK — blocks ALL navigation / clicks during async ops ═══════
let _busyCount = 0;
function showBusy(msg) {
  _busyCount++;
  const el = document.getElementById('global-busy');
  if (el) {
    document.getElementById('global-busy-label').textContent = msg || 'Processando…';
    el.style.display = 'flex';
  }
}
function hideBusy() {
  _busyCount = Math.max(0, _busyCount - 1);
  if (_busyCount === 0) {
    const el = document.getElementById('global-busy');
    if (el) el.style.display = 'none';
  }
}

function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  // Fire cancel callback when password modal is dismissed by any path
  if (id === 'modal-password' && typeof _pwOnCancel === 'function') { _pwOnCancel(); _pwOnCancel = null; }
}

function friendlyPatternLabel(pat) {
  return pat
    .replace(/\{TEXT\}/gi,      '[texto]')
    .replace(/\{TEXTO\}/gi,     '[texto]')
    .replace(/\{NUM:(\d+)\}/gi, (_, d) => `[nº ${d} dígitos]`)
    .replace(/\{DATE:YYYY-MM\}/gi, '[ano-mês]')
    .replace(/\{DATE:YYYY\}/gi,    '[ano]')
    .replace(/\{DATE(:[^}]*)?\}/gi, '[data]')
    .replace(/\{DATA\}/gi,          '[data]')
    .replace(/\{VERSION\}/gi,   '[versão]')
    .replace(/\{VERSAO\}/gi,    '[versão]')
    .replace(/\{UUID\}/gi,      '[UUID]')
    .replace(/\{ANY\}/gi,       '[qualquer]')
    .replace(/\{ENUM:[^}]+\}/gi, '[tipo]')
    .replace(/\{CNPJ\}/gi,      '[CNPJ]')
    .replace(/\{CPF\}/gi,       '[CPF]');
}

function normFriendly(normId) {
  return NORM_FRIENDLY[normId] || { emoji: '📄', short: normId, desc: '' };
}

function normCatColor(normId) {
  for (const cat of NORM_CATEGORIES) {
    if (cat.normIds.includes(normId)) return cat.color;
  }
  return 'var(--cat-other)';
}

// ══ NAVIGATION ═══════════════════════════════════════════════════════════════
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${btn.dataset.page}`).classList.add('active');
    if (btn.dataset.page === 'normatives') renderNormativesPage();
    if (btn.dataset.page === 'log')        loadLog();
    if (btn.dataset.page === 'validate')   populateValidateSelect();
  });
});

// Modal close helpers
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(overlay.id); });
});

// ══ INIT ══════════════════════════════════════════════════════════════════════
async function init() {
  try {
    const [cfgRes, normRes, settRes, verRes] = await Promise.all([
      fnc.invoke('config:getAll'),
      fnc.invoke('normatives:getAll'),
      fnc.invoke('settings:get'),
      fnc.invoke('app:getVersion'),
    ]);
    if (cfgRes?.ok)   state.folders    = cfgRes.folders    || {};
    if (normRes?.ok)  state.normatives = normRes.normatives || [];
    if (settRes?.ok)  state.settings   = settRes;
    if (verRes?.ok)   state.version    = verRes.version;
    renderFolders();
    renderSettings();
    updateGuardianUI(false);
  } catch (e) {
    toast('Erro ao inicializar: ' + e.message, 'err');
  }
}

// ══ GUARDIAN ══════════════════════════════════════════════════════════════════
function updateGuardianUI(running) {
  state.guardianRunning = running;
  const badge      = document.getElementById('guardian-badge');
  const badgeLabel = document.getElementById('guardian-badge-label');
  const toggleBtn  = document.getElementById('btn-guardian-toggle');
  if (running) {
    badge.className       = 'badge badge-running';
    badgeLabel.textContent = 'Guardião ativo';
    toggleBtn.textContent  = '■ Parar';
    toggleBtn.className    = 'btn-guardian running';
  } else {
    badge.className       = 'badge badge-stopped';
    badgeLabel.textContent = 'Guardião parado';
    toggleBtn.textContent  = '▶ Iniciar';
    toggleBtn.className    = 'btn-guardian';
  }
}

document.getElementById('btn-guardian-toggle').addEventListener('click', async () => {
  const toggleBtn = document.getElementById('btn-guardian-toggle');
  if (toggleBtn.disabled) return;
  toggleBtn.disabled = true;
  const unlock = () => { toggleBtn.disabled = false; hideBusy(); };
  try {
    if (state.guardianRunning) {
      if (!state.settings?.hasPassword) {
        showBusy('Parando o Guardião…');
        const r = await fnc.invoke('guardian:stop', '');
        if (r?.ok) { updateGuardianUI(false); toast('Guardião parado'); }
        unlock(); return;
      }
      openPasswordModal('verify', async () => {
        showBusy('Parando o Guardião…');
        const pw = document.getElementById('pw-current').value;
        const r = await fnc.invoke('guardian:stop', pw);
        if (r?.ok) { updateGuardianUI(false); toast('Guardião parado'); }
        else toast(r?.error || 'Não foi possível parar', 'err');
        unlock();
      }, { onCancel: unlock });
    } else {
      if (!state.settings?.hasPassword) {
        toast('⚠ Defina uma senha administrativa para ativar o Guardião', 'warn');
        openPasswordModal('set', async () => {
          state.settings.hasPassword = true;
          renderSettings();
          toast('✅ Senha definida! Clique em Iniciar novamente.');
          unlock();
        }, { onCancel: unlock });
        return;
      }
      openPasswordModal('verify', async () => {
        showBusy('Iniciando o Guardião…');
        const pw = document.getElementById('pw-current').value;
        const r = await fnc.invoke('guardian:start', pw);
        if (r?.ok) { updateGuardianUI(true); toast('Guardião iniciado!'); }
        else toast(r?.error || 'Não foi possível iniciar', 'err');
        unlock();
      }, { onCancel: unlock });
    }
  } catch (e) { toast('Erro: ' + e.message, 'err'); unlock(); }
});

// ══ FOLDERS PAGE ══════════════════════════════════════════════════════════════
document.getElementById('btn-add-folder').addEventListener('click', startAddWizard);
document.getElementById('btn-add-folder-empty').addEventListener('click', startAddWizard);

function renderFolders() {
  const list  = document.getElementById('folders-list');
  const empty = document.getElementById('folders-empty');
  const ids   = Object.keys(state.folders);
  if (!ids.length) {
    empty.style.display = 'flex';
    list.style.display  = 'none';
    return;
  }
  empty.style.display = 'none';
  list.style.display  = 'flex';
  list.innerHTML = ids.map(id => folderCardHTML(id, state.folders[id])).join('');
  bindFolderCardEvents();
}

function folderCardHTML(id, f) {
  const normId    = f.appliedNormativeId;
  const norm      = normId ? state.normatives.find(n => n.id === normId) : null;
  const fr        = normId ? normFriendly(normId) : null;
  const normLabel = fr ? fr.short : (f.patterns?.length ? 'Personalizado' : null);
  const catColor  = normId ? normCatColor(normId) : 'var(--text-muted)';
  const example   = norm?.patterns?.[0]?.example || '';
  const hasPatterns = !!(f.patterns?.length);
  const enabled   = f.enabled !== false;

  const normBadge = normLabel
    ? `<span class="fc-norm-badge" style="color:${catColor};border-color:${catColor};background:${catColor}22">${escHtml(normLabel)}</span>`
    : '';
  const exampleSpan = example ? `<span class="fc-example" title="${escHtml(example)}">${escHtml(example)}</span>` : '';
  const normRow = (normLabel || example)
    ? `<div class="fc-norm-row">${normBadge}${exampleSpan}</div>`
    : `<div class="fc-no-norm">⚠ Sem padrão configurado — clique em Editar para definir</div>`;

  let statusClass = '', statusText = '';
  if (!hasPatterns)        { statusClass = 'warn'; statusText = '⚠ Sem padrões'; }
  else if (enabled)        { statusClass = 'active'; statusText = '● Monitorando'; }
  else                     { statusClass = '';       statusText = '○ Pausado'; }

  const locked = !!f.locked;
  const lockIcon = locked ? '<span class="fc-lock-badge" title="Acesso restrito (icacls)">🔒</span>' : '';

  const priorityLabels = { info: 'ℹ Info', medium: '⚠ Atenção', high: '🔴 Alto', critical: '🚨 Crítico' };
  const priority   = f.priority || 'medium';
  const prLabel    = f.priority && f.priority !== 'medium' ? priorityLabels[f.priority] : null;
  const colorStyle = f.color ? `style="--fc-accent:${f.color};border-left-color:${f.color}"` : '';

  return `
  <div class="folder-card ${enabled ? '' : 'disabled'}" id="folder-${escHtml(id)}" ${colorStyle}>
    <div class="fc-top">
      <div class="fc-folder-icon">📁</div>
      <div class="fc-info">
        <div class="fc-label" title="${escHtml(f.path)}">${escHtml(f.label || f.path)}</div>
        <div class="fc-path">${escHtml(f.path)}</div>
        ${f.purpose ? `<div class="fc-purpose" title="${escHtml(f.purpose)}">${escHtml(f.purpose.length > 90 ? f.purpose.slice(0,90)+'…' : f.purpose)}</div>` : ''}
        ${f.owner   ? `<div class="fc-owner">👤 ${escHtml(f.owner)}${f.dept ? ' — ' + escHtml(f.dept) : ''}</div>` : ''}
        ${normRow}
      </div>
      <div class="fc-toggle-wrap">
        <label class="toggle-switch" title="${enabled ? 'Pausar monitoramento' : 'Ativar monitoramento'}">
          <input type="checkbox" class="fc-enable-toggle" data-id="${escHtml(id)}" ${enabled ? 'checked' : ''}/>
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
    <div class="fc-footer">
      <span class="fc-status ${statusClass}">${statusText}</span>
      ${lockIcon}
      ${prLabel ? `<span class="fc-priority ${priority}">${prLabel}</span>` : ''}
      <div class="fc-actions">
        <button class="btn btn-outline btn-sm fc-edit-btn" data-id="${escHtml(id)}">Editar</button>
        <button class="btn btn-danger-outline btn-sm fc-remove-btn" data-id="${escHtml(id)}">Remover</button>
      </div>
    </div>
  </div>`;
}

function bindFolderCardEvents() {
  document.querySelectorAll('.fc-enable-toggle').forEach(cb => {
    cb.addEventListener('change', async () => {
      const id = cb.dataset.id;
      await fnc.invoke('config:updateFolder', id, { enabled: cb.checked });
      state.folders[id].enabled = cb.checked;
      document.getElementById(`folder-${id}`)?.classList.toggle('disabled', !cb.checked);
    });
  });
  document.querySelectorAll('.fc-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(btn.dataset.id));
  });
  document.querySelectorAll('.fc-remove-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (!confirm(`Remover pasta "${state.folders[id]?.label || id}"?`)) return;
      await fnc.invoke('config:removeFolder', id);
      delete state.folders[id];
      renderFolders();
      toast('Pasta removida');
    });
  });
}

// ══ ADD FOLDER WIZARD ═════════════════════════════════════════════════════════
async function startAddWizard() {
  const folderPath = await fnc.invoke('dialog:openFolder');
  if (!folderPath) return;
  _wizardFolderPath = folderPath;
  _wizardNormId     = null;
  // Reset wizard UI
  document.getElementById('wizard-folder-display').textContent = folderPath;
  document.getElementById('wizard-step-2').style.display = 'block';
  document.getElementById('wizard-step-3').style.display = 'none';
  document.getElementById('btn-wizard-next').style.display   = 'inline-flex';
  document.getElementById('btn-wizard-finish').style.display = 'none';
  document.getElementById('btn-wizard-next').disabled = true;
  document.getElementById('wizard-norm-search').value = '';
  // Update step indicators
  document.querySelectorAll('.wstep').forEach(s => {
    const n = parseInt(s.dataset.n);
    s.classList.toggle('done',   n < 2);
    s.classList.toggle('active', n === 2);
  });
  renderNormPickerCards('wizard-norm-container', '', null, (normId) => {
    _wizardNormId = normId;
    document.getElementById('btn-wizard-next').disabled = !normId;
  });
  openModal('modal-wizard');
}

// Shared normative card renderer (used in wizard and picker modal)
function renderNormPickerCards(containerId, search, selectedId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const lower = (search || '').toLowerCase();
  let html = '';

  // Custom option FIRST — always visible
  const customMatch = !lower || 'personalizado'.includes(lower) || 'padrão próprio'.includes(lower) || 'custom'.includes(lower);
  if (customMatch) {
    const customSel = selectedId === '__custom__' ? 'selected' : '';
    html += `<div class="norm-cat-sect">
      <div class="norm-cat-sect-title">
        <span class="norm-cat-sect-title-dot" style="background:var(--text-muted)"></span>
        ✏️ Personalizado
      </div>
      <div class="norm-cards-row">
        <div class="norm-wiz-card norm-wiz-custom ${customSel}" data-nid="__custom__">
          <div class="norm-wiz-card-emoji">✏️</div>
          <div class="norm-wiz-card-name">Padrão próprio</div>
          <div class="norm-wiz-card-desc">Crie do zero com o Construtor de Padrão</div>
        </div>
      </div>
    </div>`;
  }

  for (const cat of NORM_CATEGORIES) {
    const norms = cat.normIds
      .map(nid => state.normatives.find(n => n.id === nid))
      .filter(n => {
        if (!n) return false;
        if (!lower) return true;
        const f = normFriendly(n.id);
        return n.id.includes(lower) || f.short.toLowerCase().includes(lower) || f.desc.toLowerCase().includes(lower) || n.name.toLowerCase().includes(lower);
      });
    if (!norms.length) continue;

    const cards = norms.map(n => {
      const f   = normFriendly(n.id);
      const ex  = n.patterns?.[0]?.example || '';
      const sel = selectedId === n.id ? 'selected' : '';
      return `<div class="norm-wiz-card ${sel}" data-nid="${escHtml(n.id)}">
        <div class="norm-wiz-card-emoji">${f.emoji}</div>
        <div class="norm-wiz-card-name">${escHtml(f.short)}</div>
        <div class="norm-wiz-card-desc">${escHtml(f.desc)}</div>
        ${ex ? `<div class="norm-wiz-card-example">${escHtml(ex)}</div>` : ''}
      </div>`;
    }).join('');

    html += `<div class="norm-cat-sect">
      <div class="norm-cat-sect-title">
        <span class="norm-cat-sect-title-dot" style="background:${cat.color}"></span>
        ${cat.emoji} ${escHtml(cat.label)}
      </div>
      <div class="norm-cards-row">${cards}</div>
    </div>`;
  }

  if (!html) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:12px 0">Nenhuma normativa encontrada para esta busca.</p>';
    return;
  }
  container.innerHTML = html;

  container.querySelectorAll('.norm-wiz-card').forEach(card => {
    card.addEventListener('click', () => {
      container.querySelectorAll('.norm-wiz-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      if (onSelect) onSelect(card.dataset.nid);
    });
  });
}

// Wizard search
document.getElementById('wizard-norm-search').addEventListener('input', e => {
  renderNormPickerCards('wizard-norm-container', e.target.value, _wizardNormId, (nid) => {
    _wizardNormId = nid;
    document.getElementById('btn-wizard-next').disabled = !nid;
  });
});

// Wizard navigation
document.getElementById('btn-wizard-next').addEventListener('click', () => wizardGoStep3());
document.getElementById('btn-wizard-back').addEventListener('click', () => {
  document.getElementById('wizard-step-2').style.display = 'block';
  document.getElementById('wizard-step-3').style.display = 'none';
  document.getElementById('btn-wizard-next').style.display   = 'inline-flex';
  document.getElementById('btn-wizard-finish').style.display = 'none';
  document.querySelectorAll('.wstep').forEach(s => {
    const n = parseInt(s.dataset.n);
    s.classList.toggle('done',   n < 2);
    s.classList.toggle('active', n === 2);
    s.classList.toggle('done',   n === 1);
    if (n === 2) { s.classList.add('active'); s.classList.remove('done'); }
  });
});

function wizardGoStep3() {
  if (!_wizardNormId) { toast('Escolha uma normativa para continuar', 'warn'); return; }
  // Update step indicators
  document.querySelectorAll('.wstep').forEach(s => {
    const n = parseInt(s.dataset.n);
    s.classList.toggle('done',   n < 3);
    s.classList.toggle('active', n === 3);
  });
  document.getElementById('wizard-step-2').style.display = 'none';
  document.getElementById('wizard-step-3').style.display = 'block';
  document.getElementById('btn-wizard-next').style.display   = 'none';
  document.getElementById('btn-wizard-finish').style.display = 'inline-flex';
  // Populate step 3
  const summaryEl = document.getElementById('wizard-selected-summary');
  const validEl   = document.getElementById('wizard-valid-ex');
  const patsEl    = document.getElementById('wizard-patterns-preview');
  if (_wizardNormId === '__custom__') {
    summaryEl.innerHTML = `<div class="wss-emoji">✏️</div><div class="wss-info"><div class="wss-norm-name">Padrão personalizado</div><div class="wss-norm-desc">Você definirá os padrões com o Construtor após salvar.</div></div>`;
    validEl.innerHTML   = '<div class="ex-chip ex-ok">Definido pelo Construtor de Padrão</div>';
    patsEl.innerHTML    = '';
  } else {
    const norm = state.normatives.find(n => n.id === _wizardNormId);
    const fr   = normFriendly(_wizardNormId);
    summaryEl.innerHTML = `<div class="wss-emoji">${fr.emoji}</div><div class="wss-info"><div class="wss-norm-name">${escHtml(norm?.name || fr.short)}</div><div class="wss-norm-desc">${escHtml(fr.desc)}</div></div>`;
    const examples = (norm?.patterns || []).slice(0, 4).map(p => p.example || p.template).filter(Boolean);
    validEl.innerHTML   = examples.map(e => `<div class="ex-chip ex-ok">${escHtml(e)}</div>`).join('') || '<div class="ex-chip ex-ok">—</div>';
    patsEl.innerHTML    = (norm?.patterns || []).map(p =>
      `<div class="wzd-pat-item">${escHtml(p.name ? p.name + ': ' : '')}${escHtml(p.template || '')}</div>`
    ).join('');
  }
}

document.getElementById('btn-wizard-finish').addEventListener('click', wizardFinish);

async function wizardFinish() {
  const btn = document.getElementById('btn-wizard-finish');
  btn.disabled = true;
  btn.textContent = 'Salvando...';
  try {
    const r = await fnc.invoke('config:addFolder', _wizardFolderPath);
    if (!r?.ok) { toast(r?.error || 'Erro ao adicionar pasta', 'err'); return; }
    const folderId = r.id;
    state.folders[folderId] = r.folder;
    // Apply normative patterns
    if (_wizardNormId && _wizardNormId !== '__custom__') {
      const nr = await fnc.invoke('normatives:applyToFolder', folderId, _wizardNormId);
      if (nr?.ok) {
        state.folders[folderId].patterns = nr.patterns;
        // Store which normative was applied for display
        await fnc.invoke('config:updateFolder', folderId, { appliedNormativeId: _wizardNormId });
        state.folders[folderId].appliedNormativeId = _wizardNormId;
      }
    }
    // Apply action
    const action = document.querySelector('input[name="w-action"]:checked')?.value || 'log';
    await fnc.invoke('config:updateFolder', folderId, { action });
    state.folders[folderId].action = action;
    closeModal('modal-wizard');
    renderFolders();
    const label = state.folders[folderId]?.label || _wizardFolderPath;
    toast(`✅ Pasta "${label}" adicionada!`);
    // If custom, open builder
    if (_wizardNormId === '__custom__') {
      setTimeout(() => openBuilder(folderId), 300);
    }
  } catch (e) {
    toast('Erro: ' + e.message, 'err');
  } finally {
    btn.disabled = false;
    btn.textContent = '✓ Iniciar monitoramento';
  }
}

// ══ EDIT FOLDER MODAL ════════════════════════════════════════════════════════
function openEditModal(folderId) {
  _editFolderId = folderId;
  const f = state.folders[folderId];
  if (!f) return;
  document.getElementById('edit-title').textContent = `Editar: ${f.label || f.path}`;
  document.getElementById('edit-path-display').textContent = f.path;
  // Normative display
  const normId = f.appliedNormativeId;
  const normEl = document.getElementById('edit-norm-display');
  if (normId) {
    const fr = normFriendly(normId);
    normEl.textContent = `${fr.emoji} ${fr.short}`;
  } else if (f.patterns?.length) {
    normEl.textContent = '✏️ Padrão personalizado';
  } else {
    normEl.textContent = 'Nenhuma normativa aplicada';
  }
  // Patterns list
  renderEditPatterns(folderId);
  renderEditExtensions(folderId);
  // Action
  const action = f.action || 'log';
  const actionInput = document.querySelector(`input[name="edit-action"][value="${action}"]`);
  if (actionInput) actionInput.checked = true;
  // Folder identity
  const lblInp = document.getElementById('edit-folder-label-input');
  if (lblInp) lblInp.value = (f.label && f.label !== f.path) ? f.label : '';
  const purposeEl = document.getElementById('edit-folder-purpose');
  if (purposeEl) purposeEl.value = f.purpose || '';
  const ownerEl = document.getElementById('edit-folder-owner');
  if (ownerEl) ownerEl.value = f.owner || '';
  const deptEl = document.getElementById('edit-folder-dept');
  if (deptEl) deptEl.value = f.dept || '';
  const prioEl = document.getElementById('edit-folder-priority');
  if (prioEl) prioEl.value = f.priority || 'medium';
  _editFolderColor = f.color || '';
  renderFolderColorSwatches();
  // Quarantine path
  const quarInp = document.getElementById('edit-quarantine-path');
  if (quarInp) quarInp.value = f.quarantineFolder || '';
  const quarSect = document.getElementById('edit-quarantine-section');
  if (quarSect) quarSect.style.display = (action === 'quarantine' || action === 'block') ? 'block' : 'none';
  // Script block (show only if has patterns)
  document.getElementById('edit-script-block').style.display = f.patterns?.length ? 'flex' : 'none';
  // Lock / unlock buttons
  updateLockButtons(!!f.locked);
  openModal('modal-edit');
}

function renderEditPatterns(folderId) {
  const f        = state.folders[folderId];
  const pats     = f?.patterns || [];
  const listEl   = document.getElementById('edit-patterns-list');
  const noPatEl  = document.getElementById('edit-no-pats-msg');
  const countEl  = document.getElementById('edit-pattern-badge');
  countEl.textContent = pats.length;
  if (!pats.length) {
    listEl.innerHTML    = '';
    noPatEl.style.display = 'block';
    document.getElementById('edit-script-block').style.display = 'none';
    return;
  }
  noPatEl.style.display = 'none';
  document.getElementById('edit-script-block').style.display = 'flex';
  listEl.innerHTML = pats.map(p => `
    <span class="edit-pat-chip" data-pat="${escHtml(p)}" data-folder="${escHtml(folderId)}">
      <span class="edit-pat-chip-name">${escHtml(friendlyPatternLabel(p))}</span>
      <button class="edit-pat-chip-remove" title="Remover este padrão">×</button>
    </span>`).join('');
  listEl.querySelectorAll('.edit-pat-chip-remove').forEach(btn => {
    btn.addEventListener('click', async () => {
      const chip = btn.closest('.edit-pat-chip');
      const id   = chip.dataset.folder;
      const pat  = chip.dataset.pat;
      const r = await fnc.invoke('config:removePattern', id, pat);
      if (r?.ok) { state.folders[id].patterns = r.patterns; renderEditPatterns(id); }
    });
  });
}

function renderEditExtensions(folderId) {
  const f    = state.folders[folderId];
  const exts = f?.extensions || ['*'];
  const wrap = document.getElementById('edit-extensions-wrap');
  if (!wrap) return;
  if (exts.includes('*')) {
    wrap.innerHTML = '<span class="ext-chip all-ext">✅ Todos os tipos de arquivo monitorados</span>';
  } else {
    wrap.innerHTML = exts.map(e =>
      `<span class="ext-chip" data-ext="${escHtml(e)}">${escHtml(e)}<button class="ext-chip-remove" data-ext="${escHtml(e)}" title="Remover">×</button></span>`
    ).join('');
    wrap.querySelectorAll('.ext-chip-remove').forEach(btn => {
      btn.addEventListener('click', async () => {
        const ext     = btn.dataset.ext;
        const current = (state.folders[_editFolderId]?.extensions || ['*']).filter(e => e !== ext);
        const final   = current.length ? current : ['*'];
        await fnc.invoke('config:setExtensions', _editFolderId, final);
        state.folders[_editFolderId].extensions = final;
        renderEditExtensions(_editFolderId);
      });
    });
  }
}

document.getElementById('btn-edit-add-ext')?.addEventListener('click', async () => {
  const input = document.getElementById('edit-ext-input');
  let val = input.value.trim().toLowerCase();
  if (!val) { toast('Digite uma extensão — ex.: .pdf', 'warn'); return; }
  if (!val.startsWith('.')) val = '.' + val;
  const current  = (state.folders[_editFolderId]?.extensions || ['*']).filter(e => e !== '*');
  if (!current.includes(val)) current.push(val);
  await fnc.invoke('config:setExtensions', _editFolderId, current);
  state.folders[_editFolderId].extensions = current;
  input.value = '';
  renderEditExtensions(_editFolderId);
  toast(`Extensão ${val} adicionada`);
});

document.getElementById('btn-edit-all-ext')?.addEventListener('click', async () => {
  await fnc.invoke('config:setExtensions', _editFolderId, ['*']);
  state.folders[_editFolderId].extensions = ['*'];
  renderEditExtensions(_editFolderId);
  toast('Monitorando todos os tipos de arquivo');
});

// ── Color swatches ────────────────────────────────────────────────────────
function renderFolderColorSwatches() {
  const wrap = document.getElementById('edit-folder-color-wrap');
  if (!wrap) return;
  wrap.innerHTML = FOLDER_COLORS.map(c =>
    `<span class="color-swatch ${c.value === _editFolderColor ? 'selected' : ''}"
      data-color="${escHtml(c.value)}"
      style="background:${c.value || 'transparent'};${!c.value ? 'border:2px dashed var(--text-muted)' : ''}"
      title="${escHtml(c.name)}"></span>`
  ).join('');
  wrap.querySelectorAll('.color-swatch').forEach(s => {
    s.addEventListener('click', () => {
      _editFolderColor = s.dataset.color;
      renderFolderColorSwatches();
    });
  });
}

// ── Show/hide quarantine path when action changes ─────────────────────────
document.querySelectorAll('input[name="edit-action"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const quarSect = document.getElementById('edit-quarantine-section');
    if (quarSect) {
      quarSect.style.display = (radio.value === 'quarantine' || radio.value === 'block') && radio.checked
        ? 'block' : 'none';
    }
  });
});

document.getElementById('btn-edit-quarantine-browse')?.addEventListener('click', async () => {
  const r = await fnc.invoke('dialog:openFolder');
  if (r) {
    const inp = document.getElementById('edit-quarantine-path');
    if (inp) inp.value = r;
  }
});

document.getElementById('btn-edit-change-norm').addEventListener('click', () => {
  openNormPickerModal(async (normId) => {
    if (!normId || normId === '__custom__') {
      closeModal('modal-norm-picker');
      if (normId === '__custom__') { closeModal('modal-edit'); openBuilder(_editFolderId); }
      return;
    }
    const r = await fnc.invoke('normatives:applyToFolder', _editFolderId, normId);
    if (r?.ok) {
      state.folders[_editFolderId].patterns = r.patterns;
      await fnc.invoke('config:updateFolder', _editFolderId, { appliedNormativeId: normId });
      state.folders[_editFolderId].appliedNormativeId = normId;
      closeModal('modal-norm-picker');
      openEditModal(_editFolderId);
      toast('Normativa atualizada');
    } else toast(r?.error || 'Erro ao aplicar normativa', 'err');
  });
});

document.getElementById('btn-edit-builder').addEventListener('click', () => {
  closeModal('modal-edit');
  openBuilder(_editFolderId);
});

document.getElementById('btn-edit-export-script').addEventListener('click', async () => {
  const r = await fnc.invoke('settings:exportScript', _editFolderId);
  if (r?.ok) toast(`Script exportado: ${r.path}`);
  else       toast(r?.error || 'Erro ao exportar', 'err');
});

// ── Folder lock / unlock ──────────────────────────────────────────────────
document.getElementById('btn-edit-lock-folder')?.addEventListener('click', async () => {
  if (!_editFolderId) return;
  const f = state.folders[_editFolderId];
  if (!confirm(`Deseja restringir o acesso à pasta "${f?.label || f?.path}"?\n\nSomente o usuário atual, Administrators e SYSTEM terão acesso.\nRequer privilégio de administrador.`)) return;
  const r = await fnc.invoke('folder:lockAccess', _editFolderId);
  if (r?.ok) {
    state.folders[_editFolderId].locked = true;
    updateLockButtons(true);
    toast('🔒 ' + r.message);
  } else {
    toast(r?.error || 'Erro ao bloquear pasta', 'err');
  }
});

document.getElementById('btn-edit-unlock-folder')?.addEventListener('click', async () => {
  if (!_editFolderId) return;
  const f = state.folders[_editFolderId];
  if (!confirm(`Deseja restaurar as permissões padrão da pasta "${f?.label || f?.path}"?`)) return;
  const r = await fnc.invoke('folder:unlockAccess', _editFolderId);
  if (r?.ok) {
    state.folders[_editFolderId].locked = false;
    updateLockButtons(false);
    toast('🔓 ' + r.message);
  } else {
    toast(r?.error || 'Erro ao desbloquear pasta', 'err');
  }
});

function updateLockButtons(locked) {
  const lockBtn   = document.getElementById('btn-edit-lock-folder');
  const unlockBtn = document.getElementById('btn-edit-unlock-folder');
  if (lockBtn)   lockBtn.style.display   = locked ? 'none' : '';
  if (unlockBtn) unlockBtn.style.display = locked ? '' : 'none';
}

document.getElementById('btn-edit-save').addEventListener('click', async () => {
  const action      = document.querySelector('input[name="edit-action"]:checked')?.value || 'log';
  const labelVal    = document.getElementById('edit-folder-label-input')?.value.trim();
  const purposeVal  = document.getElementById('edit-folder-purpose')?.value.trim();
  const ownerVal    = document.getElementById('edit-folder-owner')?.value.trim();
  const deptVal     = document.getElementById('edit-folder-dept')?.value.trim();
  const priorityVal = document.getElementById('edit-folder-priority')?.value || 'medium';
  const quarPath    = document.getElementById('edit-quarantine-path')?.value.trim();
  const updates = {
    action,
    label:            labelVal  || state.folders[_editFolderId]?.path || '',
    purpose:          purposeVal  || '',
    owner:            ownerVal    || '',
    dept:             deptVal     || '',
    priority:         priorityVal,
    color:            _editFolderColor,
    quarantineFolder: quarPath    || '',
  };
  await fnc.invoke('config:updateFolder', _editFolderId, updates);
  Object.assign(state.folders[_editFolderId], updates);
  closeModal('modal-edit');
  renderFolders();
  toast('✅ Configurações da pasta salvas!');
});

// ══ NORMATIVE PICKER MODAL ════════════════════════════════════════════════════
function openNormPickerModal(callback) {
  _pickerCallback   = callback;
  _pickerSelectedId = null;
  document.getElementById('picker-search').value = '';
  document.getElementById('btn-picker-apply').disabled = true;
  renderNormPickerCards('picker-norm-container', '', null, (nid) => {
    _pickerSelectedId = nid;
    document.getElementById('btn-picker-apply').disabled = !nid;
  });
  openModal('modal-norm-picker');
}

document.getElementById('picker-search').addEventListener('input', e => {
  renderNormPickerCards('picker-norm-container', e.target.value, _pickerSelectedId, (nid) => {
    _pickerSelectedId = nid;
    document.getElementById('btn-picker-apply').disabled = !nid;
  });
});

document.getElementById('btn-picker-apply').addEventListener('click', () => {
  if (_pickerCallback && _pickerSelectedId) _pickerCallback(_pickerSelectedId);
});

// ══ NORMATIVES PAGE (redesigned with categories) ══════════════════════════════
function renderNormativesPage(searchStr) {
  const search = (searchStr || document.getElementById('normative-search')?.value || '').toLowerCase();
  const container = document.getElementById('normatives-categories');
  if (!container) return;
  let html = '';

  for (const cat of NORM_CATEGORIES) {
    const norms = cat.normIds
      .map(nid => state.normatives.find(n => n.id === nid))
      .filter(n => {
        if (!n) return false;
        if (!search) return true;
        const f = normFriendly(n.id);
        return n.id.includes(search) || f.short.toLowerCase().includes(search) || f.desc.toLowerCase().includes(search) || n.name.toLowerCase().includes(search) || (n.requirement || '').toLowerCase().includes(search);
      });
    if (!norms.length) continue;

    const cards = norms.map(n => {
      const f  = normFriendly(n.id);
      const ex = n.patterns?.[0]?.example || '';
      const color = cat.color;
      return `<div class="norm-page-card" data-id="${escHtml(n.id)}">
        <div class="norm-page-card-top">
          <div class="norm-page-card-name">${f.emoji} ${escHtml(f.short)}</div>
          <span class="norm-page-badge" style="color:${color};border-color:${color};background:${color}22">${escHtml(n.area || cat.label)}</span>
        </div>
        <div class="norm-page-card-desc">${escHtml(f.desc)}</div>
        ${ex ? `<div class="norm-page-example">${escHtml(ex)}</div>` : ''}
        <div class="norm-page-card-footer">
          ${n.url ? `<span class="norm-page-apply-link" data-url="${escHtml(n.url)}">🔗 Norma oficial</span>` : '<span></span>'}
          <span class="norm-page-apply-link" data-norm-detail="${escHtml(n.id)}">Ver detalhes / Aplicar →</span>
        </div>
      </div>`;
    }).join('');

    html += `<div>
      <div class="norm-page-cat-header">
        <div class="norm-page-cat-dot" style="background:${cat.color}"></div>
        ${cat.emoji} ${escHtml(cat.label)}
      </div>
      <div class="norm-page-grid">${cards}</div>
    </div>`;
  }

  container.innerHTML = html || '<p style="color:var(--text-muted)">Nenhuma normativa encontrada.</p>';
  // Bind events
  container.querySelectorAll('[data-url]').forEach(el => {
    el.addEventListener('click', e => { e.stopPropagation(); fnc.invoke('shell:openUrl', el.dataset.url); });
  });
  container.querySelectorAll('[data-norm-detail]').forEach(el => {
    el.addEventListener('click', e => { e.stopPropagation(); openNormativeModal(el.dataset.normDetail); });
  });
  container.querySelectorAll('.norm-page-card').forEach(card => {
    card.addEventListener('click', () => openNormativeModal(card.dataset.id));
  });
}

document.getElementById('normative-search').addEventListener('input', () => renderNormativesPage());

function openNormativeModal(normId) {
  const n = state.normatives.find(x => x.id === normId);
  if (!n) return;
  document.getElementById('norm-modal-title').textContent = n.fullName || n.name || normId;
  const linkEl = document.getElementById('norm-official-link');
  if (n.url) { linkEl.style.display = 'inline-flex'; linkEl.onclick = () => { fnc.invoke('shell:openUrl', n.url); return false; }; }
  else        { linkEl.style.display = 'none'; }
  const fr   = normFriendly(normId);
  const meta = [
    n.area     && `<span class="norm-meta-tag">📂 ${escHtml(n.area)}</span>`,
    n.scope    && `<span class="norm-meta-tag">🌍 ${escHtml(n.scope)}</span>`,
    n.version  && `<span class="norm-meta-tag">📋 ${escHtml(n.version)}</span>`,
  ].filter(Boolean).join('');
  const patsHTML = (n.patterns || []).map(p => {
    const tmpl = typeof p === 'object' ? (p.template || p.example || '') : p;
    const name = typeof p === 'object' ? (p.name || '') : '';
    const ex   = typeof p === 'object' ? (p.example || '') : '';
    return `<div class="norm-pattern-item">
      ${name ? `<div class="norm-pattern-name">${escHtml(name)}</div>` : ''}
      <div class="norm-pattern-template">${escHtml(tmpl)}</div>
      ${ex && ex !== tmpl ? `<div class="norm-pattern-example">Exemplo: ${escHtml(ex)}</div>` : ''}
    </div>`;
  }).join('');
  document.getElementById('norm-modal-body').innerHTML = `
    <div class="norm-detail-meta">${meta}</div>
    <div class="norm-detail-desc">${escHtml(n.requirement || n.description || '')}</div>
    <h3 style="font-size:13px;color:var(--text-dim);margin-bottom:10px">Padrões incluídos</h3>
    <div class="norm-patterns-grid">${patsHTML || '<p style="color:var(--text-muted)">Nenhum padrão definido.</p>'}</div>`;
  const sel = document.getElementById('norm-folder-select');
  sel.innerHTML = '<option value="">Selecionar pasta...</option>' +
    Object.values(state.folders).map(f =>
      `<option value="${escHtml(f.id)}">${escHtml(f.label || f.path)}</option>`).join('');
  document.getElementById('btn-norm-apply').onclick = async () => {
    const folderId = sel.value;
    if (!folderId) { toast('Selecione uma pasta primeiro', 'warn'); return; }
    const r = await fnc.invoke('normatives:applyToFolder', folderId, normId);
    if (r?.ok) {
      state.folders[folderId].patterns = r.patterns;
      await fnc.invoke('config:updateFolder', folderId, { appliedNormativeId: normId });
      state.folders[folderId].appliedNormativeId = normId;
      renderFolders();
      closeModal('modal-normative');
      toast(`Padrões aplicados à pasta "${state.folders[folderId]?.label || folderId}"`);
    } else toast(r?.error || 'Erro ao aplicar', 'err');
  };
  openModal('modal-normative');
}

// ══ VALIDATE ══════════════════════════════════════════════════════════════════
function populateValidateSelect() {
  const sel = document.getElementById('validate-folder');
  sel.innerHTML = '<option value="">Todas as pastas</option>' +
    Object.values(state.folders).map(f =>
      `<option value="${escHtml(f.id)}">${escHtml(f.label || f.path)}</option>`).join('');
}

document.getElementById('btn-validate').addEventListener('click', async () => {
  const name   = document.getElementById('validate-input').value.trim();
  const folder = document.getElementById('validate-folder').value;
  if (!name) return;
  const r      = await fnc.invoke('validate:file', name, folder || null);
  const result = document.getElementById('validate-result');
  const suggBox = document.getElementById('validate-suggestion');
  result.style.display = 'block';
  if (r?.valid) {
    result.className = 'validate-result valid';
    result.innerHTML = '<span class="validate-result-icon">✅</span> <strong>Nome válido</strong> — este arquivo será aceito pelo Guardião.';
    if (suggBox) suggBox.style.display = 'none';
  } else {
    result.className = 'validate-result invalid';
    result.innerHTML = `<span class="validate-result-icon">❌</span> <strong>Nome inválido</strong>${r?.reason ? ' — ' + escHtml(r.reason) : ''}`;
    if (suggBox && r?.suggestion) {
      suggBox.style.display = 'flex';
      document.getElementById('suggestion-name').textContent = r.suggestion;
    } else if (suggBox) {
      suggBox.style.display = 'none';
    }
  }
});
document.getElementById('validate-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-validate').click();
});
document.getElementById('btn-copy-suggestion')?.addEventListener('click', () => {
  const name = document.getElementById('suggestion-name')?.textContent || '';
  if (!name) return;
  navigator.clipboard.writeText(name).then(() => toast('📋 Nome copiado!'));
  document.getElementById('validate-input').value = name;
  document.getElementById('btn-validate').click();
});

// ══ LOG ═══════════════════════════════════════════════════════════════════════
async function loadLog() {
  const r     = await fnc.invoke('log:get', 200);
  const log   = r?.log || [];
  const empty = document.getElementById('log-empty');
  const wrap  = document.getElementById('log-table-wrap');
  const tbody = document.getElementById('log-tbody');
  empty.style.display = log.length === 0 ? 'flex' : 'none';
  wrap.style.display  = log.length === 0 ? 'none' : 'block';
  tbody.innerHTML = log.map(v => `
    <tr>
      <td class="log-time">${escHtml(v.at ? new Date(v.at).toLocaleString('pt-BR') : '')}</td>
      <td class="log-file">${escHtml(v.file || v.filename || '')}</td>
      <td>${escHtml(v.folder || '')}</td>
      <td class="log-action-${v.action||'logged'}">${escHtml(v.action || 'registrado')}</td>
    </tr>`).join('');
}

document.getElementById('btn-log-clear').addEventListener('click', async () => {
  if (!confirm('Limpar todo o registro de violações?')) return;
  await fnc.invoke('log:clear');
  loadLog();
  toast('Registro limpo');
});

document.getElementById('btn-log-export').addEventListener('click', () => {
  const rows = document.querySelectorAll('#log-tbody tr');
  if (!rows.length) { toast('Sem dados para exportar', 'warn'); return; }
  const lines = ['Data/Hora,Arquivo,Pasta,Ação'];
  rows.forEach(r => {
    const cells = r.querySelectorAll('td');
    lines.push([...cells].map(c => `"${c.textContent.replace(/"/g,'""')}"`).join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a    = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `fnc-log-${Date.now()}.csv` });
  a.click(); URL.revokeObjectURL(a.href);
  toast('CSV exportado');
});

// ══ SETTINGS ══════════════════════════════════════════════════════════════════
function renderSettings() {
  const s = state.settings;
  const langSel = document.getElementById('lang-select');
  langSel.value    = s.language || 'pt';
  langSel.onchange = async () => {
    await fnc.invoke('settings:setLanguage', langSel.value);
    toast('Idioma atualizado. Reinicie para aplicar totalmente.');
  };
  document.getElementById('pw-status').textContent = s.hasPassword ? '🔒 Senha definida' : '🔓 Sem senha definida';
  document.getElementById('btn-set-password').style.display    = s.hasPassword ? 'none'        : 'inline-flex';
  document.getElementById('btn-change-password').style.display = s.hasPassword ? 'inline-flex' : 'none';
  document.getElementById('btn-remove-password').style.display = s.hasPassword ? 'inline-flex' : 'none';
  // Admin reset: visible only for Windows admin users
  const adminResetBtn = document.getElementById('btn-admin-reset-password');
  if (adminResetBtn) adminResetBtn.style.display = (s.isAdmin && s.hasPassword) ? 'inline-flex' : 'none';
  document.getElementById('current-user-label').textContent = s.currentUser || '—';
  // Admin username
  const adminUEl = document.getElementById('admin-username');
  if (adminUEl) adminUEl.value = s.adminUsername || '';
  // Notification settings
  const deskNotifEl = document.getElementById('desktop-notif-toggle');
  if (deskNotifEl) deskNotifEl.checked = s.desktopNotifications !== false;
  const emailToggleEl = document.getElementById('email-alert-toggle');
  if (emailToggleEl) emailToggleEl.checked = !!s.alertEmailEnabled;
  const emailFormEl = document.getElementById('email-config-form');
  if (emailFormEl) emailFormEl.style.display = s.alertEmailEnabled ? 'block' : 'none';
  const alertEmailEl = document.getElementById('alert-email');
  if (alertEmailEl) alertEmailEl.value = s.alertEmail || '';
  const smtpHostEl = document.getElementById('smtp-host');
  if (smtpHostEl) smtpHostEl.value = s.smtpHost || '';
  const smtpPortEl = document.getElementById('smtp-port');
  if (smtpPortEl) smtpPortEl.value = s.smtpPort || 587;
  const smtpUserEl = document.getElementById('smtp-user');
  if (smtpUserEl) smtpUserEl.value = s.smtpUser || '';
  document.getElementById('autostart-toggle').checked = !!s.autoStart;
  const savedUser = s.autoStartUsername || '';
  const modeOther = document.querySelector('input[name="runas-mode"][value="other"]');
  const modeCurr  = document.querySelector('input[name="runas-mode"][value="current"]');
  if (savedUser) {
    modeOther.checked = true;
    document.getElementById('runas-creds').style.display    = 'block';
    document.getElementById('runas-username').value         = savedUser;
  } else {
    modeCurr.checked  = true;
    document.getElementById('runas-creds').style.display    = 'none';
  }
}

document.querySelectorAll('input[name="runas-mode"]').forEach(r => {
  r.addEventListener('change', () => {
    const other = document.querySelector('input[name="runas-mode"][value="other"]').checked;
    document.getElementById('runas-creds').style.display = other ? 'block' : 'none';
  });
});

document.getElementById('btn-test-user').addEventListener('click', async () => {
  const username = document.getElementById('runas-username').value.trim();
  const fb       = document.getElementById('runas-user-feedback');
  if (!username) { fb.textContent = 'Digite um nome de usuário'; fb.className = 'cred-feedback err'; return; }
  fb.textContent = 'Verificando…'; fb.className = 'cred-feedback';
  const r = await fnc.invoke('settings:testWindowsUser', username);
  fb.textContent = r?.ok ? '✔ Usuário encontrado' : (r?.error || 'Usuário não encontrado');
  fb.className   = `cred-feedback ${r?.ok ? 'ok' : 'err'}`;
});

document.getElementById('autostart-toggle').addEventListener('change', async (e) => {
  const enable = e.target.checked;
  const fb     = document.getElementById('autostart-feedback');
  fb.textContent = enable ? 'Configurando…' : 'Removendo…';
  fb.className   = 'settings-feedback';
  const useOther = document.querySelector('input[name="runas-mode"][value="other"]').checked;
  const opts = {};
  if (enable && useOther) {
    opts.username = document.getElementById('runas-username').value.trim();
    opts.password = document.getElementById('runas-password').value;
    if (!opts.username) {
      fb.textContent = 'Preencha o nome de usuário antes de ativar o início automático';
      fb.className   = 'settings-feedback err';
      e.target.checked = false;
      return;
    }
  }
  const r = await fnc.invoke('settings:setAutoStart', enable, opts);
  if (r?.ok) {
    const msg = enable ? 'Início automático ativado' : 'Início automático desativado';
    fb.textContent = r.warning ? `${msg} (${r.warning})` : msg;
    fb.className   = `settings-feedback ${r.warning ? 'warn' : 'ok'}`;
    state.settings.autoStart = enable;
  } else {
    fb.textContent = r?.error || 'Erro ao configurar início automático';
    fb.className   = 'settings-feedback err';
    e.target.checked = !enable;
  }
});

document.getElementById('btn-protect-config').addEventListener('click', async () => {
  const r = await fnc.invoke('settings:protectConfig');
  toast(r?.ok ? 'Arquivo de configuração protegido' : (r?.error || 'Erro'), r?.ok ? 'ok' : 'err');
});

// Admin username
document.getElementById('btn-save-admin-user')?.addEventListener('click', async () => {
  const val = document.getElementById('admin-username').value.trim();
  const r   = await fnc.invoke('settings:saveAdminUser', val);
  if (r?.ok) { state.settings.adminUsername = val; toast('✅ Nome de administrador salvo'); }
  else toast(r?.error || 'Erro ao salvar', 'err');
});

// Desktop notification toggle
document.getElementById('desktop-notif-toggle')?.addEventListener('change', async (e) => {
  await fnc.invoke('settings:saveNotifConfig', { desktopNotifications: e.target.checked });
  state.settings.desktopNotifications = e.target.checked;
  toast(e.target.checked ? '🔔 Notificações do Windows ativadas' : 'Notificações desativadas');
});

// Email alert toggle
document.getElementById('email-alert-toggle')?.addEventListener('change', (e) => {
  const emailFormEl = document.getElementById('email-config-form');
  if (emailFormEl) emailFormEl.style.display = e.target.checked ? 'block' : 'none';
});

// Save email config
document.getElementById('btn-save-email-config')?.addEventListener('click', async () => {
  const emailCfg = {
    alertEmailEnabled: document.getElementById('email-alert-toggle').checked,
    alertEmail:        document.getElementById('alert-email').value.trim(),
    smtpHost:          document.getElementById('smtp-host').value.trim(),
    smtpPort:          document.getElementById('smtp-port').value || '587',
    smtpUser:          document.getElementById('smtp-user').value.trim(),
    smtpPass:          document.getElementById('smtp-pass').value,
  };
  const r  = await fnc.invoke('settings:saveEmailConfig', emailCfg);
  const fb = document.getElementById('email-save-feedback');
  if (r?.ok) {
    Object.assign(state.settings, { alertEmailEnabled: emailCfg.alertEmailEnabled, alertEmail: emailCfg.alertEmail });
    if (fb) { fb.textContent = '✔ Salvo'; fb.className = 'settings-feedback ok'; setTimeout(() => { fb.textContent = ''; }, 3000); }
    toast('Configurações de e-mail salvas');
  } else {
    if (fb) { fb.textContent = r?.error || 'Erro'; fb.className = 'settings-feedback err'; }
    toast(r?.error || 'Erro ao salvar', 'err');
  }
});

// Test email
document.getElementById('btn-test-email')?.addEventListener('click', async () => {
  const fb = document.getElementById('email-test-feedback');
  fb.textContent = 'Enviando...'; fb.className = 'settings-feedback';
  const emailCfg = {
    alertEmail: document.getElementById('alert-email').value.trim(),
    smtpHost:   document.getElementById('smtp-host').value.trim(),
    smtpPort:   document.getElementById('smtp-port').value || '587',
    smtpUser:   document.getElementById('smtp-user').value.trim(),
    smtpPass:   document.getElementById('smtp-pass').value,
  };
  const r = await fnc.invoke('settings:testEmail', emailCfg);
  fb.textContent = r?.ok ? '✔ E-mail enviado com sucesso!' : (r?.error || 'Falha ao enviar');
  fb.className   = `settings-feedback ${r?.ok ? 'ok' : 'err'}`;
});

document.getElementById('btn-feedback').addEventListener('click', () => openFeedbackForm());
function openFeedbackForm() {
  const title = prompt('Título do seu relato ou sugestão:');
  if (!title) return;
  const desc = prompt('Detalhes (opcional):') || '';
  fnc.invoke('feedback:open', { title, description: desc });
}

// ── Donation links (settings page) — open externally via shell ───────────────
document.querySelectorAll('.donate-link').forEach(link => {
  link.style.cssText = 'color:var(--accent);text-decoration:underline;cursor:pointer';
  link.addEventListener('click', async (ev) => {
    ev.preventDefault();
    if (link.dataset.busy) return;
    link.dataset.busy = '1';
    showBusy('Abrindo link…');
    try {
      const url = link.dataset.url;
      if (url) await fnc.invoke('shell:openUrl', url);
    } finally {
      delete link.dataset.busy;
      hideBusy();
    }
  });
});

// ══ PATTERN BUILDER ═══════════════════════════════════════════════════════════
function openBuilder(folderId) {
  builderCallbackFolderId = folderId;
  builderParts = [];
  renderBuilderParts();
  document.getElementById('advanced-toggle').checked = false;
  document.getElementById('advanced-raw').style.display = 'none';
  document.getElementById('raw-pattern-input').value = '';
  openModal('modal-builder');
}

function renderBuilderParts() {
  const container = document.getElementById('builder-parts');
  if (!builderParts.length) {
    container.innerHTML = '<span style="color:var(--text-muted);font-size:12px">Clique em "+ Adicionar elemento" para montar o padrão</span>';
  } else {
    container.innerHTML = builderParts.map((p, i) => partBlockHTML(p, i)).join('');
    bindPartEvents();
  }
  document.getElementById('builder-preview').textContent = builderToPreview(builderParts) || '—';
  document.getElementById('raw-pattern-input').value = builderToPattern(builderParts);
}

function partBlockHTML(p, i) {
  const info    = partTypeInfo(p.type);
  const sepOpts = ['-', '_', '.', ' ', ''].map(s =>
    `<option value="${s}" ${(p.sep||'-')===s?'selected':''}>${s===''?'(nenhum)':s}</option>`).join('');
  let inner = '';
  if (p.type === 'literal') {
    inner = `<input class="part-literal-input" data-idx="${i}" value="${escHtml(p.value||'')}" placeholder="texto fixo"/>`;
  } else if (p.type === 'fixed_num') {
    inner = `<span class="part-value">${String(42).padStart(p.digits||4,'0')}</span>
             <button class="part-config-btn" data-idx="${i}" data-cfg="digits">${p.digits||4}d</button>`;
  } else if (p.type === 'enum') {
    const opts = (p.options || 'A|B|C').split('|');
    inner = `<span class="part-value">${escHtml(opts[0])}</span>
             <button class="part-config-btn" data-idx="${i}" data-cfg="enum" title="Editar opções">⋯ ${opts.length} opções</button>`;
  } else if (p.type === 'text_n') {
    inner = `<span class="part-value">${'AB'.repeat(Math.ceil((p.chars||2)/2)).slice(0,p.chars||2)}</span>
             <button class="part-config-btn" data-idx="${i}" data-cfg="chars">${p.chars||2} chars</button>`;
  } else if (p.type === 'hash') {
    inner = `<span class="part-value">${'a1b2c3d4'.slice(0,p.chars||8)}</span>
             <button class="part-config-btn" data-idx="${i}" data-cfg="chars">${p.chars||8} hex</button>`;
  } else {
    inner = `<span class="part-value">${partToExample(p)}</span>`;
  }
  return `<div class="part-block" data-type="${p.type}" data-idx="${i}">
    <div class="part-inner">
      <div class="part-label">${info.label}</div>${inner}
    </div>
    <select class="part-sep-select" data-idx="${i}" title="Separador">${sepOpts}</select>
    <button class="part-remove" data-idx="${i}" title="Remover">×</button>
  </div>`;
}

function bindPartEvents() {
  document.querySelectorAll('.part-remove').forEach(btn => {
    btn.addEventListener('click', () => { builderParts.splice(parseInt(btn.dataset.idx), 1); renderBuilderParts(); });
  });
  document.querySelectorAll('.part-sep-select').forEach(sel => {
    sel.addEventListener('change', () => { builderParts[parseInt(sel.dataset.idx)].sep = sel.value; renderBuilderParts(); });
  });
  document.querySelectorAll('.part-literal-input').forEach(inp => {
    inp.addEventListener('input', () => { builderParts[parseInt(inp.dataset.idx)].value = inp.value; renderBuilderParts(); });
  });
  document.querySelectorAll('.part-config-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const cfg = btn.dataset.cfg;
      if (cfg === 'digits') {
        const cur = builderParts[idx].digits || 4;
        const v   = prompt(`Número de dígitos (1–20):`, cur);
        const d   = parseInt(v);
        if (!isNaN(d) && d >= 1 && d <= 20) { builderParts[idx].digits = d; renderBuilderParts(); }
      } else if (cfg === 'enum') {
        const cur = builderParts[idx].options || 'A|B|C';
        const v   = prompt(`Opções separadas por | \n(ex.: NF|NFS|NFC  ou  CONF|INT|PUB|REST):`, cur);
        if (v && v.trim()) { builderParts[idx].options = v.trim().toUpperCase(); renderBuilderParts(); }
      } else if (cfg === 'chars') {
        const cur = builderParts[idx].chars || 8;
        const v   = prompt(`Quantidade de caracteres (1–44):`, cur);
        const d   = parseInt(v);
        if (!isNaN(d) && d >= 1 && d <= 44) { builderParts[idx].chars = d; renderBuilderParts(); }
      }
    });
  });
}

document.getElementById('btn-add-part').addEventListener('click', (e) => {
  const existing = document.querySelector('.add-part-popup');
  if (existing) { existing.remove(); return; }
  const popup = document.createElement('div');
  popup.className = 'add-part-popup';
  popup.innerHTML = PART_TYPES.map(pt => `
    <div class="add-part-item" data-type="${pt.type}">
      <div class="add-part-name">${pt.label}</div>
      <div class="add-part-desc">${pt.desc}</div>
    </div>`).join('');
  document.body.appendChild(popup);
  const r = e.target.getBoundingClientRect();
  popup.style.left = `${r.left}px`;
  popup.style.top  = `${r.bottom + 6}px`;
  popup.querySelectorAll('.add-part-item').forEach(item => {
    item.addEventListener('click', () => {
      const pt   = PART_TYPES.find(p => p.type === item.dataset.type);
      const part = { type: pt.type, sep: '-' };
      if (pt.type === 'fixed_num') part.digits = 4;
      if (pt.type === 'literal')   part.value  = '';
      builderParts.push(part); popup.remove(); renderBuilderParts();
    });
  });
  const close = (ev) => { if (!popup.contains(ev.target) && ev.target !== e.target) { popup.remove(); document.removeEventListener('click', close); } };
  setTimeout(() => document.addEventListener('click', close), 50);
});

document.getElementById('advanced-toggle').addEventListener('change', (e) => {
  document.getElementById('advanced-raw').style.display = e.target.checked ? 'block' : 'none';
  if (e.target.checked) document.getElementById('raw-pattern-input').value = builderToPattern(builderParts);
});

document.getElementById('raw-pattern-input').addEventListener('input', (e) => {
  builderParts = patternToParts(e.target.value); renderBuilderParts();
});

document.getElementById('btn-builder-insert').addEventListener('click', async () => {
  const raw = builderToPattern(builderParts);
  if (!raw) { toast('Adicione pelo menos um elemento', 'warn'); return; }
  if (!builderCallbackFolderId) return;
  const r = await fnc.invoke('config:addPattern', builderCallbackFolderId, raw);
  if (r?.ok) {
    state.folders[builderCallbackFolderId].patterns = r.patterns;
    renderFolders();
    closeModal('modal-builder');
    toast('Padrão adicionado');
    // Re-open edit modal if we came from there
    if (_editFolderId === builderCallbackFolderId) openEditModal(_editFolderId);
  } else toast(r?.error || 'Erro ao adicionar padrão', 'err');
});

// ══ PASSWORD MODAL ════════════════════════════════════════════════════════════
let _pwResolve = null;
let _pwMode    = 'verify';

let _pwOnCancel = null;
async function openPasswordModal(mode, onSuccess, opts = {}) {
  if (mode === 'verify' && !state.settings?.hasPassword) { await onSuccess?.(); return; }
  if (opts.skipIfNoPassword && !state.settings?.hasPassword) { await onSuccess?.(); return; }
  _pwMode = mode; _pwResolve = onSuccess; _pwOnCancel = opts.onCancel || null;
  const titles = { verify:'Verificação de Senha', set:'Definir Nova Senha', change:'Alterar Senha', remove:'Remover Senha', admin_reset:'Redefinir Senha (Admin)' };
  document.getElementById('pw-modal-title').textContent = titles[mode] || 'Senha';
  const showGroup = (id, show) => document.getElementById(id).style.display = show ? 'block' : 'none';
  showGroup('pw-current-group', mode === 'verify' || mode === 'change' || mode === 'remove');
  showGroup('pw-new-group',     mode === 'set'    || mode === 'change' || mode === 'admin_reset');
  showGroup('pw-confirm-group', mode === 'set'    || mode === 'change' || mode === 'admin_reset');
  ['pw-current','pw-new','pw-confirm'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pw-error').style.display    = 'none';
  document.getElementById('pw-lock-info').style.display = 'none';
  document.getElementById('pw-strength-bar').style.display   = (mode==='set'||mode==='change'||mode==='admin_reset') ? 'block' : 'none';
  document.getElementById('pw-strength-label').style.display = (mode==='set'||mode==='change'||mode==='admin_reset') ? 'block' : 'none';
  openModal('modal-password');
}

document.getElementById('pw-new').addEventListener('input', (e) => {
  const v   = e.target.value; const len = v.length;
  const fill = document.getElementById('pw-strength-fill');
  const label = document.getElementById('pw-strength-label');
  let pct = 0; let cls = ''; let lbl = '';
  if (len >= 12 && /[A-Z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v)) { pct=100; cls='#4caf50'; lbl='Forte'; }
  else if (len >= 8) { pct=60; cls='#ff9800'; lbl='Média'; }
  else if (len >= 4) { pct=30; cls='#f44336'; lbl='Fraca'; }
  fill.style.width = pct+'%'; fill.style.background = cls; label.textContent = lbl; label.style.color = cls;
});

document.getElementById('btn-pw-ok').addEventListener('click', async () => confirmPassword());
document.querySelectorAll('#modal-password input').forEach(inp => {
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') confirmPassword(); });
});

async function confirmPassword() {
  const errEl   = document.getElementById('pw-error');
  const lockEl  = document.getElementById('pw-lock-info');
  const lockMsg = document.getElementById('pw-lock-msg');
  const showErr  = (msg) => { errEl.textContent = msg; errEl.style.display = 'block'; lockEl.style.display = 'none'; };
  const showLock = (msg) => { lockEl.style.display = 'flex'; lockMsg.textContent = msg; errEl.style.display = 'none'; };
  errEl.style.display = 'none'; lockEl.style.display = 'none';
  document.getElementById('btn-pw-ok').disabled = true;
  try {
    const cur     = document.getElementById('pw-current').value;
    const newPw   = document.getElementById('pw-new').value;
    const confirm = document.getElementById('pw-confirm').value;
    if (_pwMode === 'verify') {
      const r = await fnc.invoke('settings:verifyPassword', cur);
      if (r?.locked) { showLock(r.error); return; }
      if (!r?.ok)    { showErr(r?.error || 'Senha incorreta'); return; }
      _pwOnCancel = null; // password accepted — don't fire cancel on close
      closeModal('modal-password'); await _pwResolve?.();
    } else if (_pwMode === 'set' || _pwMode === 'change') {
      if (newPw.length < 4) { showErr('A nova senha deve ter pelo menos 4 caracteres'); return; }
      if (newPw !== confirm) { showErr('As senhas não coincidem'); return; }
      const r = await fnc.invoke('settings:setAdminPassword', _pwMode === 'change' ? cur : '', newPw);
      if (r?.locked) { showLock(r.error); return; }
      if (!r?.ok)    { showErr(r?.error || 'Erro ao definir senha'); return; }
      _pwOnCancel = null;
      state.settings.hasPassword = true; renderSettings(); closeModal('modal-password'); toast('Senha atualizada');
    } else if (_pwMode === 'remove') {
      const r = await fnc.invoke('settings:removePassword', cur);
      if (r?.locked) { showLock(r.error); return; }
      if (!r?.ok)    { showErr(r?.error || 'Senha incorreta'); return; }
      _pwOnCancel = null;
      state.settings.hasPassword = false; renderSettings(); closeModal('modal-password'); toast('Senha removida');
    } else if (_pwMode === 'admin_reset') {
      // Admin bypass: validate fields only — no current-password check; delegate to _pwResolve callback
      if (newPw.length < 4) { showErr('A nova senha deve ter pelo menos 4 caracteres'); return; }
      if (newPw !== confirm) { showErr('As senhas não coincidem'); return; }
      _pwOnCancel = null;
      closeModal('modal-password');
      await _pwResolve?.();
    }
  } catch (e) { showErr('Erro inesperado: ' + e.message); }
  finally { document.getElementById('btn-pw-ok').disabled = false; }
}

document.getElementById('btn-pw-cancel').addEventListener('click', () => { closeModal('modal-password'); _pwOnCancel?.(); _pwOnCancel = null; });
document.getElementById('btn-set-password').addEventListener('click', () => openPasswordModal('set'));
document.getElementById('btn-change-password').addEventListener('click', () => openPasswordModal('change'));
document.getElementById('btn-remove-password').addEventListener('click', () => openPasswordModal('remove'));

// Admin reset — only shown to Windows administrators
document.getElementById('btn-admin-reset-password').addEventListener('click', () => {
  openPasswordModal('admin_reset', async () => {
    showBusy('Resetando senha…');
    try {
      const newPw = document.getElementById('pw-new').value;
      const r = await fnc.invoke('settings:adminResetPassword', newPw);
      if (r?.ok) {
        state.settings.hasPassword = true;
        renderSettings();
        toast('🔑 Senha resetada pelo administrador');
      } else {
        toast(r?.error || 'Erro ao resetar senha', 'err');
      }
    } finally { hideBusy(); }
  });
});

// ══ START ══════════════════════════════════════════════════════════════════════
init();

// Real-time violation toast (pushed from Guardian via main process)
fnc.on('violation:new', (v) => {
  const file = escHtml(v.file || '?');
  const msg  = v.suggestion
    ? `⚠ <strong>${file}</strong> fora do padrão. 💡 Sugestão: <em>${escHtml(v.suggestion)}</em>`
    : `⚠ <strong>${file}</strong> fora do padrão na pasta <em>${escHtml(v.folder||'')}</em>`;
  const c  = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast warn'; el.innerHTML = msg;
  c.appendChild(el);
  setTimeout(() => { el.style.animation='toast-out 0.3s ease forwards'; setTimeout(()=>el.remove(),300); }, 7000);
});

// ══ HELP PAGE — tab switching ══════════════════════════════════════════════════
function activateHelpTab(tabId) {
  document.querySelectorAll('.help-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.help-panel').forEach(p => { p.style.display = 'none'; });
  const btn = document.querySelector(`.help-tab[data-htab="${tabId}"]`);
  const panel = document.getElementById(`htab-${tabId}`);
  if (btn)   btn.classList.add('active');
  if (panel) panel.style.display = 'block';
}
document.querySelectorAll('.help-tab').forEach(tab => {
  tab.addEventListener('click', () => activateHelpTab(tab.dataset.htab));
});
// Show first tab by default on page load and when help nav is clicked
activateHelpTab('quickstart');
document.querySelector('.nav-btn[data-page="help"]')?.addEventListener('click', () => {
  activateHelpTab('quickstart');
});

// ══ MENU EVENTS from main process ═════════════════════════════════════════════
fnc.on('menu:navigate', (page) => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const btn  = document.querySelector(`.nav-btn[data-page="${page}"]`);
  const sect = document.getElementById(`page-${page}`);
  if (btn)  btn.classList.add('active');
  if (sect) sect.classList.add('active');
  if (page === 'help') activateHelpTab('quickstart');
});

fnc.on('menu:helpSection', (section) => {
  // Navigate to help page then activate the tab
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const btn  = document.querySelector('.nav-btn[data-page="help"]');
  const sect = document.getElementById('page-help');
  if (btn)  btn.classList.add('active');
  if (sect) sect.classList.add('active');
  activateHelpTab(section);
});

fnc.on('menu:about', () => {
  showAboutModal();
});

fnc.on('menu:action', async (action) => {
  switch (action) {
    case 'addFolder':
      document.getElementById('btn-add-folder')?.click();
      break;

    case 'exportConfig': {
      const r = await fnc.invoke('config:exportConfig');
      if (r.ok) toast(`✅ Configuração exportada para: ${r.path}`);
      else      toast(`❌ Erro ao exportar: ${r.error}`, 'err');
      break;
    }

    case 'importConfig': {
      const r = await fnc.invoke('config:importConfig');
      if (r.ok) {
        toast(`✅ ${r.count} pasta(s) importada(s) com sucesso.`);
        await init();  // reload all data
      } else if (r.error !== 'Cancelado') {
        toast(`❌ Erro ao importar: ${r.error}`, 'err');
      }
      break;
    }

    case 'exportCSV':
      exportLogCSV();
      break;

    case 'guardianStart':
      if (!state.guardianRunning) document.getElementById('btn-guardian-toggle')?.click();
      break;

    case 'guardianStop':
      if (state.guardianRunning) document.getElementById('btn-guardian-toggle')?.click();
      break;

    case 'clearLog':
      document.getElementById('btn-log-clear')?.click();
      break;

    case 'openBuilder': {
      // Pick first folder or open builder standalone
      const firstId = Object.keys(state.folders)[0];
      if (firstId) openBuilder(firstId);
      else toast('Adicione pelo menos uma pasta antes de usar o construtor', 'warn');
      break;
    }

    case 'protectConfig':
      document.querySelector('.nav-btn[data-page="settings"]')?.click();
      setTimeout(() => document.getElementById('btn-protect-config')?.click(), 200);
      break;
  }
});

// ══ ABOUT MODAL ════════════════════════════════════════════════════════════════
function showAboutModal() {
  const existing = document.getElementById('modal-about');
  if (existing) { existing.style.display = 'flex'; return; }
  const el = document.createElement('div');
  el.id = 'modal-about';
  el.className = 'modal-overlay';
  el.style.display = 'flex';
  el.innerHTML = `
    <div class="modal-box" style="max-width:480px;text-align:center">
      <div class="modal-header" style="justify-content:center;border:none;padding-bottom:0">
        <svg viewBox="0 0 64 64" width="48" height="48">
          <defs><linearGradient id="about-sg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1a73e8"/><stop offset="100%" stop-color="#0d47a1"/>
          </linearGradient></defs>
          <path d="M32 4 L58 14 L58 34 C58 48 46 58 32 62 C18 58 6 48 6 34 L6 14 Z"
                fill="url(#about-sg)" stroke="#0a3d91" stroke-width="1.5"/>
          <polyline points="20,32 28,41 46,24" fill="none" stroke="#fff"
                    stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 style="margin:.5rem 0 .25rem">FreeNameConvention</h2>
      <p style="color:var(--text-secondary);margin:0 0 .75rem">v${state.version || '3.1.0'} &nbsp;·&nbsp; Electron 32 &nbsp;·&nbsp; 62+ Normatives</p>
      <p style="font-size:.85rem;line-height:1.6;color:var(--text-secondary)">
        Open-source file naming compliance guardian.<br>
        Enforce international naming standards on your folders.<br><br>
        62+ regulations from every continent: ISO, GDPR, HIPAA,<br>
        NF-e, SOX, LGPD, APPI, POPIA, and many more.<br>
        Compatible with domain accounts (AD).<br><br>
        <em>Guardian running in the background</em>
      </p>
      <div style="margin:.75rem 0;padding:.6rem;background:var(--bg-tertiary);border-radius:8px;text-align:left">
        <div style="font-weight:600;margin-bottom:.3rem">👨‍💻 Created by</div>
        <p style="font-size:.8rem;color:var(--text-secondary);margin:0;line-height:1.7">
          <strong>Rafael França</strong><br>
          ✉️ <a href="#" class="about-donate-link" data-url="mailto:rafael.franca@live.com">rafael.franca@live.com</a><br>
          📞 +55 11 91580-0911
        </p>
      </div>
      <div style="margin:.5rem 0;padding:.6rem;background:var(--bg-tertiary);border-radius:8px;text-align:left">
        <div style="font-weight:600;margin-bottom:.3rem">🛡️ odefender Community</div>
        <p style="font-size:.8rem;color:var(--text-secondary);margin:0 0 .3rem">
          Join our open-source security community:
        </p>
        <div style="font-size:.8rem;line-height:1.7">
          <a href="#" class="about-donate-link" data-url="https://github.com/rfranca777/FreeNameConvention">GitHub</a> ·
          <a href="#" class="about-donate-link" data-url="https://github.com/rfranca777/FreeNameConvention/discussions">Discussions</a> ·
          <a href="#" class="about-donate-link" data-url="https://github.com/rfranca777/odefender-community">odefender</a>
        </div>
      </div>
      <div style="margin:.5rem 0;padding:.6rem;background:var(--bg-tertiary);border-radius:8px;text-align:left">
        <div style="font-weight:600;margin-bottom:.3rem">💚 Donations — Help those in need</div>
        <p style="font-size:.8rem;color:var(--text-secondary);margin:0 0 .3rem">
          FreeNameConvention is 100% free & open source.<br>
          Please consider donating to one of these amazing causes:
        </p>
        <div style="font-size:.85rem;line-height:2">
          <a href="#" class="about-donate-link" data-url="https://www.cufa.org.br">🇧🇷 CUFA — Central Única das Favelas</a><br>
          <a href="#" class="about-donate-link" data-url="https://www.rabimeir.co.il">🇮🇱 Rabi Meir Baal Haness — Caridade em Israel</a>
        </div>
      </div>
      <button class="btn btn-primary" onclick="document.getElementById('modal-about').style.display='none'" style="margin-top:.5rem">Fechar</button>
    </div>`;
  document.body.appendChild(el);
  el.addEventListener('click', e => { if (e.target === el) el.style.display = 'none'; });
  // Donation links — open externally via shell (block navigation until request completes)
  el.querySelectorAll('.about-donate-link').forEach(link => {
    link.style.cssText = 'color:var(--accent);text-decoration:underline;cursor:pointer';
    link.addEventListener('click', async (ev) => {
      ev.preventDefault();
      if (link.dataset.busy) return;
      link.dataset.busy = '1';
      showBusy('Abrindo link…');
      try {
        const url = link.dataset.url;
        if (url) await window.fnc.invoke('shell:openUrl', url);
      } finally {
        delete link.dataset.busy;
        hideBusy();
      }
    });
  });
}

// ══ EXPORT CSV helper (if not already defined) ═════════════════════════════════
function exportLogCSV() {
  const rows = document.querySelectorAll('#log-tbody tr');
  if (!rows.length) { toast('Nenhuma violação registrada.', 'warn'); return; }
  let csv = 'Data/Hora,Arquivo,Pasta,Ação\n';
  rows.forEach(r => {
    const cells = r.querySelectorAll('td');
    if (cells.length < 2) return;
    const cols = [...cells].map(c => `"${c.innerText.replace(/"/g,'""')}"`);
    csv += cols.join(',') + '\n';
  });
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `fnc-violacoes-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('📊 CSV exportado');
}

// (toast function is defined at the top as toast(msg, kind, ms))
