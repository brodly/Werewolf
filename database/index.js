module.exports = {
  sockets: {
    add(id, username) { this[id] = username; },
    remove(id) { delete this[id]; },
    get(id) { return this[id]; },
  },
  game: null,
  chat: null,
};
