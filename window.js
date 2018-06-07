const join = require('path').join;
const BrowserWindow = require('electron').BrowserWindow;
const config = require('./config');

module.exports = function createMainWindow(handleResize, handleClosed) {
  const lastWindowState = config.get('lastWindowState');

  const window = new BrowserWindow({
    minWidth: 400,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: join(__dirname, 'assets/icon.png'),
    title: 'Keeper',
    titleBarStyle: 'hidden-inset',
    show: false,
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  });

  window.loadURL('https://keep.google.com');
  window.once('ready-to-show', () => {
    window.show();
  });
  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  return window;
};
