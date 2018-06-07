const Config = require('electron-config');

module.exports = new Config({
  defaults: {
    lastWindowState: {
      height: 700,
      width: 400
    }
  }
});
