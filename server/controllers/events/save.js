const controller = require('../');

module.exports = ({ username, player }) => {
  // console.log(username + ' wants to save ' + player);
  controller.Game.addToAction(player, 'save');
};
