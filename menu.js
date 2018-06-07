const app = require('electron').app;
const dialog = require('electron').dialog;
const Menu = require('electron').Menu;

module.exports = function createMainMenu() {
  const template = [
    {
      label: 'Keeper',
      submenu: [
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
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, win) => {
            if (win) win.reload();
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Notes',
          accelerator: 'CmdOrCtrl+1',
          click: (item, win) => {
            win.webContents.send('navigate', 'home');
          },
          type: 'radio',
          checked: true
        },
        {
          label: 'Reminders',
          accelerator: 'CmdOrCtrl+2',
          click: (item, win) => {
            win.webContents.send('navigate', 'reminders');
          },
          type: 'radio'
        },
        {
          label: 'Archive',
          accelerator: 'CmdOrCtrl+3',
          click: (item, win) => {
            win.webContents.send('navigate', 'archive');
          },
          type: 'radio'
        },
        {
          label: 'Trash',
          accelerator: 'CmdOrCtrl+4',
          click: (item, win) => {
            win.webContents.send('navigate', 'trash');
          },
          type: 'radio'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
