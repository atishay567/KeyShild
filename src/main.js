const { app, BrowserWindow, globalShortcut, ipcMain, screen } = require('electron');
const path = require('node:path');

let mainWindow;
let isLocked = false;
let lockTimeout;

const ALL_KEYS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'Space', 'Enter', 'Escape', 'Backspace', 'Tab',
  'Up', 'Down', 'Left', 'Right',
  'VolumeUp', 'VolumeDown', 'VolumeMute',
  'MediaNextTrack', 'MediaPreviousTrack', 'MediaStop', 'MediaPlayPause',
  '`', '-', '=', '[', ']', '\\', ';', '\'', ',', '.', '/'
];

const MODIFIERS = ['', 'CommandOrControl+', 'Alt+', 'Shift+', 'CommandOrControl+Shift+', 'CommandOrControl+Alt+', 'Alt+Shift+', 'CommandOrControl+Alt+Shift+'];

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 600,
    height: 500,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}

function registerLockShortcuts() {
  // Registering combinations to swallow them
  MODIFIERS.forEach(mod => {
    ALL_KEYS.forEach(key => {
      try {
        globalShortcut.register(`${mod}${key}`, () => {
          // Do nothing, effectively swallowing the key press
          console.log(`Blocked: ${mod}${key}`);
        });
      } catch (e) {
        // Some shortcuts might be reserved by the OS and will fail to register
      }
    });
  });
}

function unregisterLockShortcuts() {
  globalShortcut.unregisterAll();
}

ipcMain.handle('lock-keyboard', (event, durationMs) => {
  if (isLocked) return;
  isLocked = true;

  // Make window fullscreen kiosk mode
  mainWindow.setKiosk(true);
  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.focus();

  // Block keyboard input locally for this window as a fallback
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (isLocked) {
      event.preventDefault();
    }
  });

  registerLockShortcuts();

  // Auto unlock after duration
  if (durationMs && durationMs > 0) {
    if (lockTimeout) clearTimeout(lockTimeout);
    lockTimeout = setTimeout(() => {
      unlockKeyboard();
    }, durationMs);
  }
  
  return true;
});

function unlockKeyboard() {
  if (!isLocked) return;
  isLocked = false;
  
  if (lockTimeout) {
    clearTimeout(lockTimeout);
    lockTimeout = null;
  }

  unregisterLockShortcuts();
  
  // Remove event listener
  mainWindow.webContents.removeAllListeners('before-input-event');

  // Restore window state
  mainWindow.setKiosk(false);
  mainWindow.setAlwaysOnTop(false);
  mainWindow.setVisibleOnAllWorkspaces(false);
  mainWindow.center();
  mainWindow.setSize(600, 500);

  // Notify renderer
  mainWindow.webContents.send('keyboard-unlocked');
}

ipcMain.handle('unlock-keyboard', () => {
  unlockKeyboard();
  return true;
});


app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
