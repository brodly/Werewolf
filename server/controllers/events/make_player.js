const controller = require('..');

module.exports = (io, socket, username) => {
  const player = controller.Player.getPlayer(username);

  socket.join(player.role, () => {
    io.to(`${socket.id}`).emit('assigned role', player);
  });
};
