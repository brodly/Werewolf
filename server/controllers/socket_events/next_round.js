const controller = require('../');

module.exports = (io) => {
  io.emit('update round', controller.Game.nextRound());
};
