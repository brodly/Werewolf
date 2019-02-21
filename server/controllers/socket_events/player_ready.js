const controller = require('../index');

module.exports = async (io, username) => {
  try {
    let message;
    const status = await controller.Player.toggleReady(username);
    if (status) {
      message = await controller.Chat.newMessage(null, `${username} is ready`);
    } else {
      message = await controller.Chat.newMessage(null, `${username} is not ready`);
    }
    await io.emit('chat message', message);
  } catch (err) {
    console.error(err);
  }
};
