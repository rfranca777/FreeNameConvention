'use strict';

/**
 * FreeNameConvention — Background Protection Guardian
 *
 * Watches configured folders via chokidar and enforces naming compliance.
 *
 * Three enforcement modes:
 *   - log:        Record violation, file stays in place
 *   - quarantine: Move non-compliant file to quarantine folder
 *   - block:      Same as quarantine (move file immediately)
 */

const path     = require('path');
const fs       = require('fs');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

class Guardian {
  /**
   * @param {Array}  folders   – enabled folder configs
   * @param {object} validator – core/validator module (has .validateFilename)
   * @param {object} store     – config store (for violation log)
   */
  constructor(folders, validator, store, onViolation) {
    this.folders     = Array.isArray(folders) ? folders : [];
    this.validator   = validator;
    this.store       = store;
    this.onViolation = typeof onViolation === 'function' ? onViolation : null;
    this.watchers    = new Map();
    this.stats       = { violations: 0, filesChecked: 0, startedAt: null };
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  start() {
    this.stats = { violations: 0, filesChecked: 0, startedAt: new Date().toISOString() };
    for (const folder of this.folders) this._startWatcher(folder);
  }

  stop() {
    for (const [, w] of this.watchers) { try { w.close(); } catch {} }
    this.watchers.clear();
  }

  getStats() {
    return { ...this.stats, activeWatchers: this.watchers.size };
  }

  // ─── Internal ─────────────────────────────────────────────────────────────

  /** Convert string patterns to the { pattern, extensions, enabled } objects validator expects */
  _toPatternObjects(patterns) {
    if (!Array.isArray(patterns) || !patterns.length) return [];
    return patterns.map(p => ({
      pattern:    typeof p === 'string' ? p : (p.template || p.pattern || ''),
      extensions: (typeof p === 'object' && Array.isArray(p.extensions)) ? p.extensions : ['*'],
      enabled:    true
    }));
  }

  _startWatcher(folder) {
    const quarDir = folder.quarantineFolder || '_NONCOMPLIANT';

    if (!folder.path || !fs.existsSync(folder.path)) {
      console.warn(`[Guardian] Skipping non-existent path: ${folder.path}`);
      return;
    }

    try {
      const watcher = chokidar.watch(folder.path, {
        ignored: (fp) => {
          const base = path.basename(fp);
          return base.startsWith('.') || base === quarDir ||
                 fp.includes(`${path.sep}${quarDir}${path.sep}`) ||
                 fp.endsWith(`${path.sep}${quarDir}`);
        },
        persistent:     true,
        ignoreInitial:  true,
        depth:          0,
        awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 }
      });

      watcher.on('add', (filePath) => {
        try { this._handleNewFile(filePath, folder, quarDir); }
        catch (err) { console.error('[Guardian] handle error:', err.message); }
      });

      watcher.on('error', (err) => {
        console.error(`[Guardian] Watcher error (${folder.id}):`, err.message);
      });

      this.watchers.set(folder.id, watcher);
    } catch (err) {
      console.error(`[Guardian] Failed to watch ${folder.path}:`, err.message);
    }
  }

  _handleNewFile(filePath, folder, quarDir) {
    const filename = path.basename(filePath);
    if (filename.startsWith('.') || filename === quarDir) return;

    const rel = path.relative(folder.path, filePath);
    if (rel.startsWith(quarDir)) return;

    // Extension filter — skip if extension not in folder's allowed list
    const fileExt    = path.extname(filename).toLowerCase();
    const allowedExt = Array.isArray(folder.extensions) && folder.extensions.length ? folder.extensions : ['*'];
    if (!allowedExt.includes('*') && !allowedExt.includes(fileExt)) return;

    this.stats.filesChecked++;

    const patObjs = this._toPatternObjects(folder.patterns);
    if (!patObjs.length) return;

    const result = this.validator.validateFilename(filename, patObjs);
    if (result.valid) return;

    this.stats.violations++;

    const violation = {
      at:       new Date().toISOString(),
      file:     filename,
      folder:   folder.label || folder.path,
      folderId: folder.id,
      action:   folder.action || 'log',
      issues:   result.issues || []
    };
    this._logViolation(violation);

    if (this.onViolation) {
      try { this.onViolation(violation); } catch (cbErr) { console.error('[Guardian] onViolation cb error:', cbErr.message); }
    }

    if (folder.action === 'block' || folder.action === 'quarantine') {
      this._moveToQuarantine(filePath, folder.path, quarDir, filename);
    }
  }

  _logViolation(v) {
    try {
      const log = this.store.get('violations', []);
      log.unshift(v);
      this.store.set('violations', log.slice(0, 10000));
    } catch (err) { console.error('[Guardian] Log error:', err.message); }
  }

  _moveToQuarantine(filePath, parentDir, quarDir, filename) {
    try {
      const qPath = path.join(parentDir, quarDir);
      const justCreated = !fs.existsSync(qPath);
      if (!fs.existsSync(qPath)) fs.mkdirSync(qPath, { recursive: true });

      // — Restrict access: Administrators (SID, locale-independent) + SYSTEM only (Windows) —
      // setImmediate defers icacls to next event-loop tick — never blocks the watcher callback
      if (justCreated && process.platform === 'win32') {
        setImmediate(() => {
          try {
            execSync(
              `icacls "${qPath}" /inheritance:r /grant:r "*S-1-5-32-544:(OI)(CI)F" /grant:r "SYSTEM:(OI)(CI)F"`,
              { timeout: 5000, windowsHide: true }
            );
          } catch (aceErr) {
            console.warn('[Guardian] icacls failed (non-critical):', aceErr.message);
          }
        });
      }

      let dest = path.join(qPath, filename);
      if (fs.existsSync(dest)) {
        const ext  = path.extname(filename);
        const base = path.basename(filename, ext);
        dest = path.join(qPath, `${base}_${Date.now()}${ext}`);
      }

      fs.renameSync(filePath, dest);
    } catch (err) {
      console.error('[Guardian] Quarantine move failed:', err.message);
    }
  }
}

module.exports = Guardian;
