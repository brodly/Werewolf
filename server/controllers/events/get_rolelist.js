const controller = require('../');

module.exports = (io, role) => {
  let list = [];
  if (role === 'moderator') {
    list = controller.Player.playerlist
      .map(player => ({
        username: player,
        alive: true,
        selected: null,
      }));
  } else {
    list = controller.Player.getListOfPlayersByRole(role);
  }
  io.to(role).emit('set rolelist', list);

  // NOTE: THIS RETURN IS FOR JEST TESTING PURPOSES ONLY
  return list;
};
