const controller = require('../');

module.exports = (io, role) => {
  const list = controller.Player.getListOfPlayersByRole(role);
  io.to(role).emit('rolelist', list);
};
