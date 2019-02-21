const controller = require('../index');

module.exports = (username) => {
  controller.Game.create();
  controller.Chat.create();
  controller.Player.createModerator(username);
};
