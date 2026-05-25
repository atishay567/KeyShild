const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('keyshield', {
  lock: (durationMs) => ipcRenderer.invoke('lock-keyboard', durationMs),
  unlock: () => ipcRenderer.invoke('unlock-keyboard'),
  onUnlocked: (callback) => ipcRenderer.on('keyboard-unlocked', (_event, value) => callback(value))
});
