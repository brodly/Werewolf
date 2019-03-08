const controller = require('../');

module.exports = (io) => {
  controller.Game.resetTimer();
  io.emit('reset timer');
};
