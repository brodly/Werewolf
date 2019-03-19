const controller = require('../index');

module.exports = (io, username) => {
  controller.Game.create();
  controller.Chat.create();
  controller.Player.createModerator(username);
  io.emit('chat message', {
    username: null,
    message: `${username} has created a new game`,
  });
};
