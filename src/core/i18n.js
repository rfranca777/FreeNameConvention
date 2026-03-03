'use strict';

/**
 * FreeNameConvention — Internationalization Engine
 * Supports: pt (Português), en (English), he (עברית), es (Español)
 * Hebrew triggers RTL layout automatically.
 */

const fs   = require('fs');
const path = require('path');

const SUPPORTED = ['pt', 'en', 'he', 'es'];
const RTL_LANGS = ['he', 'ar'];

let currentLang = 'pt';
let strings = {};
let localesDir = path.join(__dirname, '..', 'locales');

/**
 * Load a language file into memory.
 * @param {string} lang — 'pt', 'en', 'he', or 'es'
 */
function loadLang(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'pt';
  const file = path.join(localesDir, `${lang}.json`);
  try {
    strings = JSON.parse(fs.readFileSync(file, 'utf8'));
    currentLang = lang;
  } catch (err) {
    console.error(`[i18n] Failed to load ${lang}:`, err.message);
    if (lang !== 'pt') loadLang('pt');
  }
}

/**
 * Get a translated string by dot-separated key.
 * Supports template variables: t('greeting', { name: 'World' }) → "Hello, World"
 * @param {string} key   — e.g. 'nav.dashboard'
 * @param {object} vars  — optional substitution variables { key: value }
 * @returns {string}
 */
function t(key, vars = {}) {
  const parts = key.split('.');
  let val = strings;
  for (const p of parts) {
    if (val && typeof val === 'object' && p in val) val = val[p];
    else return key; // fallback: return the key itself
  }
  if (typeof val !== 'string') return key;
  // Template substitution: {{varName}}
  return val.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] !== undefined ? String(vars[k]) : `{{${k}}}`);
}

/**
 * Get all strings (for sending to renderer).
 */
function getAllStrings() {
  return { lang: currentLang, strings, rtl: isRTL() };
}

/**
 * Check if current language is RTL.
 */
function isRTL() {
  return RTL_LANGS.includes(currentLang);
}

/**
 * Get current language code.
 */
function getLang() {
  return currentLang;
}

/**
 * Get list of supported languages with display names.
 */
function getLanguages() {
  return [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English',   flag: '🇺🇸' },
    { code: 'he', name: 'עברית',     flag: '🇮🇱' },
    { code: 'es', name: 'Español',   flag: '🇪🇸' }
  ];
}

/**
 * Override locales directory (useful for packaged app).
 */
function setLocalesDir(dir) {
  localesDir = dir;
}

// Auto-load Portuguese on require
loadLang('pt');

module.exports = { loadLang, t, getAllStrings, isRTL, getLang, getLanguages, setLocalesDir, SUPPORTED };
