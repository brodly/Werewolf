const controller = require('../');

module.exports = (io, { role, username, selected }) => {
  controller.Player.updateSelected(role, username, selected);
  controller.GetRolelist(io, role);
};
