const controller = require('../index');

module.exports = async (io, username) => {
  try {
    await controller.Player.updateModerator(username);
    const message = await controller.Chat.newMessage(null, `${username} is now the moderator`);
    await io.emit('chat message', message);
  } catch (err) {
    console.error(err);
  }
};
