const controller = require('../');
const db = require('../../../database');

module.exports = (io, socket, username) => {
  if (!db.game) {
    controller.Events.NewGame(username);
    io.to(socket.id).emit('load lobby', 'moderator');
  } else {
    controller.Events.NewUser(io, socket, username);
    io.to(socket.id).emit('load lobby', 'player');
  }
};
