'use strict';

/**
 * FreeNameConvention — Preload Bridge
 *
 * Exposes a minimal, safe IPC surface via contextBridge.
 * All renderer <-> main communication goes through fnc.invoke().
 *
 * Security: contextIsolation=true, nodeIntegration=false.
 * Channel whitelist prevents arbitrary IPC channel access.
 */

const { contextBridge, ipcRenderer } = require('electron');

// ── Allowed IPC channels (whitelist — STRIDE-E: Elevation of Privilege guard) ─
const ALLOWED_CHANNELS = new Set([
  'config:getAll',
  'config:addFolder',
  'config:updateFolder',
  'config:removeFolder',
  'config:addPattern',
  'config:removePattern',
  'dialog:openFolder',
  'settings:get',
  'settings:setLanguage',
  'settings:setAdminPassword',
  'settings:verifyPassword',
  'settings:removePassword',
  'settings:setAutoStart',
  'settings:testWindowsUser',
  'settings:protectConfig',
  'settings:exportScript',
  'guardian:start',
  'guardian:stop',
  'guardian:status',
  'validate:file',
  'normatives:getAll',
  'normatives:getById',
  'normatives:applyToFolder',
  'config:setExtensions',
  'settings:saveAdminUser',
  'settings:saveNotifConfig',
  'settings:saveEmailConfig',
  'settings:testEmail',
  'config:exportConfig',
  'config:importConfig',
  'file:renameNonCompliant',
  'log:get',
  'log:clear',
  'folder:lockAccess',
  'folder:unlockAccess',
  'feedback:open',
  'shell:openUrl',
]);

// ── Allowed push event channels (renderer listening to main) ─────────────────
const ALLOWED_EVENTS = new Set([
  'violation:new',
  'guardian:statusChange',
  'menu:action',
  'menu:navigate',
  'menu:helpSection',
  'menu:about',
]);

contextBridge.exposeInMainWorld('fnc', {
  /**
   * Generic IPC invoke.
   * Renderer calls: await window.fnc.invoke('channel', arg1, arg2, ...)
   */
  invoke: (channel, ...args) => {
    if (!ALLOWED_CHANNELS.has(channel)) {
      return Promise.reject(new Error(`IPC channel not allowed: ${channel}`));
    }
    return ipcRenderer.invoke(channel, ...args);
  },

  /**
   * Listen to push events from main process.
   */
  on: (channel, callback) => {
    if (!ALLOWED_EVENTS.has(channel)) return;
    const handler = (_, ...args) => callback(...args);
    ipcRenderer.on(channel, handler);
    // Return unsubscribe function
    return () => ipcRenderer.removeListener(channel, handler);
  },

  /**
   * Remove all push event listeners.
   */
  removeAllListeners: () => {
    ALLOWED_EVENTS.forEach(ch => ipcRenderer.removeAllListeners(ch));
  },
});
