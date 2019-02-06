const db = require('../../database');
const { Player, Moderator } = require('../models/player');

module.exports = {
  createModerator: (username) => {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) {
        console.log('Moderator could not be created');
        reject(false);
      } else {
        db.game.moderator = moderator;
        console.log(`${username} is now the moderator`);
        resolve(true);
      }
    });
  },
  updateModerator(username) {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) {
        console.log('Moderator could not be updated');
        reject(false);
      } else {
        db.game.players[username] = db.game.moderator;
        db.game.moderator = moderator;
        console.log(`${username} is now the moderator`);
        resolve(true);
      }
    });
  },
  createPlayer: (username) => {
    const player = new Player(username);
    return new Promise((resolve, reject) => {
      if (!player) {
        console.log('Player could not be created');
        reject(false);
      } else {
        db.game.players[username] = player;
        db.chat.readylist[username] = false;
        console.log(`${username} was created.`);
        resolve(true);
      }
    });
  },
  updateRole: (username, role) => { db.game.players[username].role = role; },
  deleteFromPlayerlist: username => delete db.game.players[username],
  deleteFromReadylist: (username) => { delete db.chat.readylist[username]; },
  get: username => db.game.players[username],
  get playerlist() { return Object.keys(db.game.players); },
  ready: (username) => { db.chat.readylist[username] = true; },
  unready: (username) => { db.chat.readylist[username] = false; },
};
