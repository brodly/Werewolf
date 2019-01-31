const Model = require('./model');
const db = require('../../database/index');


class Game extends Model {
  constructor() {
    super('game');
  }

  createGame() {
    const game = new Game();

    return new Promise((resolve, reject) => {
      if (!game) reject('Game could not be created');
      else {
        db.game = game;
        resolve('Game object created');
      }
    });
  };
}

module.exports = Game;

/**
 * @return {promise} returns a promise which produces a string
 * that says whether or not the game object could be created
 */
module.exports.

module.exports.Game = {
  updatePlayer: () => { },

  playerLeave: () => { },

  disconnect: () => { },
};
