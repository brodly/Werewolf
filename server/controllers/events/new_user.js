const controller = require('../index');

module.exports = async (io, username) => {
  try {
    await controller.Player.createPlayer(username);
    const message = await controller.Chat.newMessage(null, `${username} has joined!`);
    await io.emit('update player list', controller.Player.playerlist);
    await io.emit('chat message', message);
  } catch (err) {
    console.error(err);
  }
};
