const controller = require('../');

module.exports = ({ username, target, action }) => {
  const { actionUsed } = controller.Player.getPlayer(username);
  if (!actionUsed) controller.Game.addToAction(target, action);
  else console.log(`"${action}" already placed this round for ${username}`);
};
