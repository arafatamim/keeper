const join = require('path').join;
const BrowserWindow = require('electron').BrowserWindow;
const config = require('./config');

module.exports = function createMainWindow(handleResize, handleClosed) {
  const lastWindowState = config.get('lastWindowState');

  const window = new BrowserWindow({
    minWidth: 250,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: join(__dirname, 'assets/icon.png'),
    title: 'Keep',
    titleBarStyle: 'hidden-inset',
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  });

  window.loadURL('https://keep.google.com');
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  return window;
};
