const path = require('path');
const { BrowserWindow, Tray, Menu, app,dialog } = require('electron');
const config = require('./config');

module.exports = function createMainWindow(handleResize, handleClosed) {
  const lastWindowState = config.get('lastWindowState');

  const window = new BrowserWindow({
    minWidth: 400,
    x: lastWindowState.x,
    y: lastWindowState.y,
    width: lastWindowState.width,
    height: lastWindowState.height,
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'Keeper',
    titleBarStyle: 'hidden-inset',
    show: false,
    webPreferences: {
      preload: `${__dirname}/browser.js`
    }
  });

  var willQuitApp = false;

  function createTrayIcon() {
    const iconPath = path.join(__dirname, '/assets/icon.png');
    let appIcon = null;

    appIcon = new Tray(iconPath);
    var contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show Keeper',
        click: function () {
          if (window.isMinimized()) {
            window.restore();
            window.setSkipTaskbar(false);
          }
        }
      },
      {
        type: 'separator',
      },
      {
        label: 'About Keeper...',
        click: () => {
            dialog.showMessageBox({
              buttons: ['OK'],
              title: "About Keeper",
              message: "Google Keep wrapper for the desktop.\n\ngithub.com/arafatamim/keeper"
            });
        }
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:',
        click: function () {
          app.quit();
        }
      }
    ]);
    appIcon.setToolTip('Keeper');
    appIcon.setContextMenu(contextMenu);

    appIcon.on('click', () => {
      if (window.isMinimized()) {
        window.restore();
        window.setSkipTaskbar(false);
      }
      else {
        window.minimize();
        window.setSkipTaskbar(true);
      }
    });
  }

  window.loadURL('https://keep.google.com');
  window.once('ready-to-show', () => {
    createTrayIcon();
    window.minimize();
    window.setSkipTaskbar(true);
  });
  
  app.on('before-quit', () => willQuitApp = true);  
  window.on('close', (e) => {
      if (willQuitApp) {
        /* the user tried to quit the app */
        app.quit();
      } else {
        /* the user only tried to close the window */
        e.preventDefault();
        window.minimize();
      }
  });

  window.on('resize', handleResize);
  window.on('closed', handleClosed);

  return window;
};
