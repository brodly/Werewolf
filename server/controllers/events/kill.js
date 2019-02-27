const controller = require('../');

module.exports = ({ username, target }) => {
  const { actionUsed } = controller.Player.getPlayer(username);
  if (!actionUsed) controller.Game.addToAction(target, 'kill');
  else console.log('Action Already placed for', username);
};
