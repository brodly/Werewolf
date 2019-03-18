/* eslint-disable no-multi-spaces */
const db = require('../../database');

module.exports = {
  add(id, username) { db.sockets.add(id, username); },
  remove(id)        { db.sockets.remove(id); },
  get(id)           { return db.sockets.get(id); },
};
