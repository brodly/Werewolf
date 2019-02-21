const controller = require('../');

module.exports = (io, { role, username, selected }) => {
  // controller.Player.setSelection(username, selected);
  console.log(role, username, selected);
  io.to(role).emit('update selected', { username, selected });
};
