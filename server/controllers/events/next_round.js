const controller = require('../');

module.exports = (io) => {
  io.emit('toggle night', controller.Game.toggleNight());
  io.emit('set round', controller.Game.getRound());
};
