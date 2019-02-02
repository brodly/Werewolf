/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Player, Moderator } = require('../models/player');

module.exports = {
  createModerator: (username) => {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) reject('Moderator could not be created');
      resolve(db.game.moderator = moderator);
    });
  },
  updateModerator(username) {
    const moderator = new Moderator(username);
    return new Promise((resolve, reject) => {
      if (!moderator) reject('Moderator could not be updated');
      else {
        db.game.players.push(db.game.moderator);
        db.game.moderator = moderator;
        resolve(username, 'is now the moderator');
      }
    });
  },
  createPlayer: (username) => {
    const player = new Player(username);
    return new Promise((resolve, reject) => {
      if (!player) reject('Player could not be created');
      resolve(db.playerlist.push(player));
    });
  },
  updateRole: (username, role) => {
    db.playerlist.forEach((player) => {
      if (player.username === username) {
        player.role = role;
      }
    });
  },
  deletePlayer: (username) => {
    return new Promise((resolve, reject) => {
      let index = null;

      db.playerlist.forEach((player, i) => {
        if (player.username === username) {
          index = i;
        }
      });

      if (index !== null) {
        resolve(db.playerlist.splice(index, 1));
      } else {
        reject(`Error: ${username} does not exist in playerlist`);
      }
    });
  },
  getPlayer: (username) => {
    let result;

    db.playerlist.forEach((player) => {
      if (player.username === username) {
        result = player;
      }
    });

    return result;
  },
  get playerlist() {
    const result = [];
    db.playerlist.forEach((player) => {
      result.push(player.username);
    });
    return result;
  },
};
