const controller = require('..');

module.exports = (socket, io) => {
  const moderator = controller.Player.getModerator;

  socket.join('moderator', () => {
    io.to('moderator').emit('assigned role', moderator);
  });
};
