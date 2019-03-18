const controller = require('../');
const db = require('../../../database');

module.exports = (io, socket) => {
  const username = controller.Sockets.get(socket.id);

  controller.Sockets.remove(socket.id);

  if (db.game && db.chat) {
    controller.Events.PlayerLeave(io, username);
  }
};
