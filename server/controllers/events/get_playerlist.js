const controller = require('../');

module.exports = io => io.emit('set playerlist', controller.Player.getListOfPlayers());
