const controller = require('../');

module.exports = (io, socket, username) => {
  const player = controller.Player.getPlayer(username);
  io.to(`${socket.id}`).emit('set role', player);
};
