'use strict';

/**
 * FreeNameConvention — Pattern Validation Engine v2.0
 *
 * Token syntax (case-insensitive inside braces):
 *   {TEXT}             – any word chars (letters, digits, hyphen, underscore)
 *   {TEXT:N}           – text with exactly N characters
 *   {NUM}              – numeric sequence (1+ digits)
 *   {NUM:N}            – number with exactly N digits
 *   {SEQ:N}            – sequential number with N digits (alias for NUM:N)
 *   {DATE:YYYYMMDD}    – date 8 digits
 *   {DATE:YYYY-MM-DD}  – date with hyphens
 *   {DATE:DD-MM-YYYY}  – date BR/EU format
 *   {DATE:DD/MM/YYYY}  – date with slashes
 *   {DATE:MM-YYYY}     – month-year
 *   {DATE:YYYY}        – year only
 *   {ENUM:A|B|C}       – one of the listed values (case-insensitive match)
 *   {CNPJ}             – Brazilian CNPJ (14 digits)
 *   {CPF}              – Brazilian CPF (11 digits)
 *   {VERSION}          – version tag: v1, v01, v1.0, v01.02
 *   {HASH:N}           – hex hash with N chars (for anonymized IDs)
 *   {UUID}             – UUID v4 format (8-4-4-4-12 hex)
 *   {ANY}              – any characters (.+)
 *
 * Fixed text outside braces is matched literally.
 * Extension filtering is done separately (e.g. ".pdf", ".xml", "*").
 */

const TOKEN_RE = /\{([^}]+)\}/g;

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Parse a pattern string into a compiled regex and part descriptors.
 * @param {string} pattern
 * @returns {{ regex: RegExp|null, parts: Array, error: string|null, regexStr: string }}
 */
function parsePattern(pattern) {
  const parts = [];
  let regexStr = '';
  let lastIndex = 0;
  let match;

  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(pattern)) !== null) {
    if (match.index > lastIndex) {
      const fixed = pattern.slice(lastIndex, match.index);
      regexStr += escapeRegex(fixed);
      parts.push({ type: 'fixed', label: fixed, regex: escapeRegex(fixed) });
    }

    const token = match[1].trim();
    const colonIdx = token.indexOf(':');
    const name = (colonIdx >= 0 ? token.slice(0, colonIdx) : token).toUpperCase();
    const arg  = colonIdx >= 0 ? token.slice(colonIdx + 1) : '';

    let r = '', label = '';

    switch (name) {
      case 'TEXT':
      case 'TEXTO':
        if (arg) { r = `[\\w\\-]{${arg}}`; label = `Text (${arg} chars)`; }
        else     { r = `[\\w\\-]+`;         label = 'Text'; }
        break;

      case 'NUM':
      case 'SEQ':
        if (arg) { r = `\\d{${arg}}`; label = `Number (${arg} digits)`; }
        else     { r = `\\d+`;        label = 'Number'; }
        break;

      case 'DATE':
      case 'DATA': {
        const fmt = arg.toUpperCase()
          .replace(/AAAA/g, 'YYYY').replace(/DD/g, 'DD').replace(/MM/g, 'MM');
        const map = {
          'YYYYMMDD':   { r: '\\d{8}',                    l: 'Date YYYYMMDD' },
          'YYYY-MM-DD': { r: '\\d{4}-\\d{2}-\\d{2}',     l: 'Date YYYY-MM-DD' },
          'DD-MM-YYYY': { r: '\\d{2}-\\d{2}-\\d{4}',     l: 'Date DD-MM-YYYY' },
          'DD/MM/YYYY': { r: '\\d{2}\\/\\d{2}\\/\\d{4}', l: 'Date DD/MM/YYYY' },
          'MM-YYYY':    { r: '\\d{2}-\\d{4}',             l: 'Month-Year' },
          'YYYY':       { r: '\\d{4}',                    l: 'Year' },
          'YYYY-MM':    { r: '\\d{4}-\\d{2}',             l: 'Year-Month' },
          'AAAAMMDD':   { r: '\\d{8}',                    l: 'Date YYYYMMDD' },
          'AAAA-MM-DD': { r: '\\d{4}-\\d{2}-\\d{2}',     l: 'Date YYYY-MM-DD' },
          'DD-MM-AAAA': { r: '\\d{2}-\\d{2}-\\d{4}',     l: 'Date DD-MM-YYYY' },
          'DD/MM/AAAA': { r: '\\d{2}\\/\\d{2}\\/\\d{4}', l: 'Date DD/MM/YYYY' },
          'MM-AAAA':    { r: '\\d{2}-\\d{4}',             l: 'Month-Year' },
          'AAAA':       { r: '\\d{4}',                    l: 'Year' },
          'AAAA-MM':    { r: '\\d{4}-\\d{2}',             l: 'Year-Month' }
        };
        const entry = map[fmt] || map[arg.toUpperCase()];
        if (entry) { r = entry.r; label = entry.l; }
        else { r = '[\\d\\-\\/]+'; label = `Date (${arg})`; }
        break;
      }

      case 'ENUM': {
        const opts = arg.split('|').map(o => escapeRegex(o.trim()));
        r = `(?:${opts.join('|')})`;
        label = `[${arg}]`;
        break;
      }

      case 'CNPJ':
        r = '\\d{14}'; label = 'CNPJ (14 digits)'; break;

      case 'CPF':
        r = '\\d{11}'; label = 'CPF (11 digits)'; break;

      case 'VERSION':
      case 'VERSAO':
        r = 'v\\d{1,3}(?:\\.\\d{1,3})?'; label = 'Version (v1, v01, v1.2)'; break;

      case 'HASH':
        if (arg) { r = `[a-fA-F0-9]{${arg}}`; label = `Hash (${arg} hex chars)`; }
        else     { r = `[a-fA-F0-9]+`;         label = 'Hex Hash'; }
        break;

      case 'UUID':
        r = '[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}';
        label = 'UUID'; break;

      case 'ANY':
        r = '.+'; label = 'Any text'; break;

      default:
        r = escapeRegex(`{${token}}`);
        label = `{${token}}`;
    }

    regexStr += r;
    parts.push({ type: name, label, regex: r, raw: match[0] });
    lastIndex = TOKEN_RE.lastIndex;
  }

  if (lastIndex < pattern.length) {
    const fixed = pattern.slice(lastIndex);
    regexStr += escapeRegex(fixed);
    parts.push({ type: 'fixed', label: fixed, regex: escapeRegex(fixed) });
  }

  try {
    const regex = new RegExp(`^${regexStr}$`, 'i');
    return { regex, parts, error: null, regexStr };
  } catch (err) {
    return { regex: null, parts, error: `Invalid pattern: ${err.message}`, regexStr };
  }
}

/**
 * Validate a filename against an array of pattern configs.
 * @param {string} filename  – bare filename including extension
 * @param {Array}  patterns  – array of { pattern, extensions, enabled }
 * @returns {{ valid: boolean, issues: string[], matchedPattern: string|null }}
 */
function validateFilename(filename, patterns) {
  if (!patterns || patterns.length === 0) {
    return { valid: true, issues: [], matchedPattern: null };
  }

  const enabled = patterns.filter(p => p.enabled !== false);
  if (enabled.length === 0) return { valid: true, issues: [], matchedPattern: null };

  const ext = filename.includes('.')
    ? '.' + filename.split('.').pop().toLowerCase()
    : '';
  const nameOnly = filename.includes('.')
    ? filename.slice(0, filename.lastIndexOf('.'))
    : filename;

  const issues = [];

  for (const p of enabled) {
    const allowedExts = (p.extensions || ['*'])
      .map(e => e.toLowerCase().trim())
      .map(e => e.startsWith('.') ? e : `.${e}`);

    const extOk = allowedExts.includes('*') ||
                  allowedExts.includes('.*') ||
                  allowedExts.includes(ext);

    if (!extOk) continue;

    const { regex, error } = parsePattern(p.pattern || '');
    if (error) {
      issues.push(`Pattern error "${p.name || p.pattern}": ${error}`);
      continue;
    }

    if (regex.test(nameOnly)) {
      return { valid: true, issues: [], matchedPattern: p.name || p.pattern };
    } else {
      issues.push(`"${nameOnly}" → ${p.name || p.pattern} (expected: ${p.example || p.pattern})`);
    }
  }

  if (issues.length === 0) {
    return { valid: true, issues: [], matchedPattern: null };
  }

  return { valid: false, issues };
}

/**
 * Generate an example filename from a pattern string.
 */
function generateExample(pattern) {
  return pattern
    .replace(/\{TEXTO?(?::\d+)?\}/gi, 'Document')
    .replace(/\{TEXT(?::\d+)?\}/gi, 'Document')
    .replace(/\{NUM:(\d+)\}/gi, (_, n) => '0'.repeat(Number(n)))
    .replace(/\{NUM\}/gi, '001')
    .replace(/\{SEQ:(\d+)\}/gi, (_, n) => '0'.repeat(Number(n)))
    .replace(/\{DATE:YYYYMMDD\}/gi, '20260301')
    .replace(/\{DATA:AAAAMMDD\}/gi, '20260301')
    .replace(/\{DATE:YYYY-MM-DD\}/gi, '2026-03-01')
    .replace(/\{DATA:AAAA-MM-DD\}/gi, '2026-03-01')
    .replace(/\{DATE:DD-MM-YYYY\}/gi, '01-03-2026')
    .replace(/\{DATA:DD-MM-AAAA\}/gi, '01-03-2026')
    .replace(/\{DATE:DD\/MM\/YYYY\}/gi, '01/03/2026')
    .replace(/\{DATA:DD\/MM\/AAAA\}/gi, '01/03/2026')
    .replace(/\{DATE:MM-YYYY\}/gi, '03-2026')
    .replace(/\{DATA:MM-AAAA\}/gi, '03-2026')
    .replace(/\{DATE:YYYY\}/gi, '2026')
    .replace(/\{DATA:AAAA\}/gi, '2026')
    .replace(/\{DATE:YYYY-MM\}/gi, '2026-03')
    .replace(/\{DATA:AAAA-MM\}/gi, '2026-03')
    .replace(/\{ENUM:([^}]+)\}/gi, (_, opts) => opts.split('|')[0])
    .replace(/\{CNPJ\}/gi, '12345678000199')
    .replace(/\{CPF\}/gi, '12345678901')
    .replace(/\{VERSAO?\}/gi, 'v01')
    .replace(/\{VERSION\}/gi, 'v01')
    .replace(/\{HASH:(\d+)\}/gi, (_, n) => 'a'.repeat(Number(n)))
    .replace(/\{HASH\}/gi, 'a1b2c3d4')
    .replace(/\{UUID\}/gi, '550e8400-e29b-41d4-a716-446655440000')
    .replace(/\{ANY\}/gi, 'Content')
    .replace(/\{[^}]+\}/gi, 'VALUE');
}

/**
 * Validate that a pattern string is syntactically correct.
 */
function validatePattern(pattern) {
  const { error } = parsePattern(pattern);
  return { valid: !error, error };
}

module.exports = { validateFilename, parsePattern, generateExample, validatePattern };
