const controller = require('..');

module.exports = (io, socket) => {
  const moderator = controller.Player.getModerator;

  socket.join('moderator', () => {
    io.to('moderator').emit('assigned role', moderator);
  });
};
