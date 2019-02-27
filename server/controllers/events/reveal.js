const controller = require('../');

module.exports = () => {
  // console.log(username + ' wants to see ' + player);
  controller.Game.addToAction(player, 'reveal');
  // io.to('seer').emit('player role', controller.Player.getRole(player));
};
