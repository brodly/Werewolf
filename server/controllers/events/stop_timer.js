const controller = require('../');

module.exports = (io) => {
  controller.Game.stopTimer();
  io.emit('stop timer');
};
