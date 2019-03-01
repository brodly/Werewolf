const controller = require('../');

module.exports = io => io.emit('set time', controller.Game.getCurrentTime());
