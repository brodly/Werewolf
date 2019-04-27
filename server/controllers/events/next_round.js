const controller = require('../');

module.exports = (io) => {
  controller.Game.stopTimer();
  controller.Game.resetTimer();
  io.emit('toggle night', controller.Game.toggleNight());
  io.emit('set round', controller.Game.getRound());
  io.emit('stop timer');
  io.emit('reset timer');
};
