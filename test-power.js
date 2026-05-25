const { app, globalShortcut } = require('electron');
app.whenReady().then(() => {
  try {
    globalShortcut.register('Power', () => console.log('Power key pressed'));
    console.log('Registered Power');
  } catch (e) {
    console.error('Failed to register Power', e.message);
  }
  app.quit();
});
