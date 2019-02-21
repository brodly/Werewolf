const controller = require('../index');

module.exports = async (io, data) => {
  try {
    const message = await controller.Chat.newMessage(data.username, data.message);
    await io.emit('chat message', message);
  } catch (err) {
    console.error(err);
  }
};
