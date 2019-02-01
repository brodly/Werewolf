/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Game } = require('../models/game');

module.exports = {
  create() {
    const game = new Game();

    return new Promise((resolve, reject) => {
      if (!game) reject('Game could not be created');
      resolve(db.game = game);
    });
  },
  updatePlayer: () => { },

  playerLeave: () => { },

  disconnect: () => { },
};
