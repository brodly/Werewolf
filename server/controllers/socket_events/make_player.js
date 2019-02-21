const controller = require('..');

module.exports = (io, socket, username) => {
  const player = controller.Player.getPlayer(username);
  console.log(player);

  socket.join(player, () => {
    io.to(`${socket.id}`).emit('assigned role', player);
  });
};
