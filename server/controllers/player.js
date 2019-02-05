/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Player, Moderator } = require('../models/player');

module.exports = {
  createModerator: (username) => {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) reject('Moderator could not be created');
      db.game.moderator = moderator;
      resolve(`${username} is now the moderator`);
    });
  },
  updateModerator(username) {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) reject('Moderator could not be updated');
      else {
        db.game.players[username] = db.game.moderator;
        db.game.moderator = moderator;
        resolve(`${username} is now the moderator`);
      }
    });
  },
  createPlayer: (username) => {
    const player = new Player(username);
    return new Promise((resolve, reject) => {
      if (!player) reject('Player could not be created');
      db.game.players[username] = player;
      db.chat.readylist[username] = true;
      resolve(`${username} was created. DEBUG: RETURN 'READY' DEFAULT VALUE TO FALSE`);
    });
  },
  updateRole: (username, role) => { db.game.players[username].role = role; },
  deletePlayer: username => delete db.game.players[username],
  getPlayer: username => db.game.players[username],
  get playerlist() { return Object.keys(db.game.players); },
  ready: (username) => { db.chat.readylist[username] = true; },
};
