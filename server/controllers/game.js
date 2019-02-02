/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Game } = require('../models');

module.exports = {
  create() {
    const game = new Game();

    return new Promise((resolve, reject) => {
      if (!game) reject('Game could not be created');
      resolve(db.game = game);
    });
  },
  startGame() {
    const readylist = Object.keys(db.chat.readylist).filter(player => db.chat.readylist[player]);
    const players = Object.keys(db.game.players);

    return new Promise((resolve, reject) => {
      if (readylist.length === players.length) {
        resolve('Game is starting');
      } else {
        resolve('Not all players are ready');
      }

      // TODO: Reject doesn't do anything at the moment
      reject('Could not start game');
    });
  },
};
