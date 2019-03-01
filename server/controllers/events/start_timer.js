const controller = require('../');

module.exports = (io) => {
  controller.Game.startTimer();
  io.emit('start timer');
};
