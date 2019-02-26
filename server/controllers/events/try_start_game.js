const controller = require('../');

module.exports = async (io) => {
  try {
    const status = controller.Game.startGame();
    const message = await controller.Chat.newMessage(null, status[1]);
    await io.emit('chat message', message);
    if (status[0]) {
      await io.emit('start game', 'game');
    }
  } catch (err) {
    console.error(err);
  }
};
