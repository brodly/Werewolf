const controller = require('../index');

module.exports = async (io, username) => {
  try {
    controller.Player.deleteFromPlayerlist(username);
    controller.Player.deleteFromReadylist(username);
    await io.emit('update player list', controller.Player.playerlist);
    const message = await controller.Chat.newMessage(null, `${username} has left!`);
    await io.emit('chat message', message);
  } catch (err) {
    console.error(err);
  }
};
