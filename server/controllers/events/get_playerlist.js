const controller = require('../');

module.exports = io => io.emit(controller.Player.playerlist);
