const controller = require('../');

module.exports = (io, { username, target, action }) => {
  const player = controller.Player.getPlayer(username);

  if (target === null) {
    controller.Events.ModeratorAction(io, action);
  } else {
    const { actionUsed } = player;
    if (!actionUsed) controller.Game.addToAction(target, action);
    else console.log(`"${action}" already placed this round for ${username}`);
  }
};
