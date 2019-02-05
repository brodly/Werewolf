/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Game } = require('../models');
const controller = require('../controllers');

module.exports = {
  create() {
    const game = new Game();

    return new Promise((resolve, reject) => {
      if (!game) reject('Game could not be created');
      else {
        db.game = game;
        resolve('Game was created');
      }
    });
  },
  startGame() {
    const players = Object.keys(db.game.players);
    const roles = Object.keys(db.game.roles);
    const roleCount = roles.reduce((acc, role) => acc + db.game.roles[role].max, 0);
    const villagerCount = players.length - roleCount;
    const randRoles = [];
    const randPlayers = [];

    roles.forEach((role) => {
      if (role !== 'villagers') {
        for (let i = 0; i < db.game.roles[role].max; i += 1) {
          const ran = Math.random(1, 10) * 10;
          if (ran < 5) {
            randRoles.push(role);
          } else {
            randRoles.unshift(role);
          }
        }
      } else {
        for (let i = 0; i < villagerCount; i += 1) {
          const ran = Math.random(1, 10) * 10;
          if (ran < 5) {
            randRoles.push(role);
          } else {
            randRoles.unshift(role);
          }
        }
      }
    });

    players.forEach((player) => {
      const ran = Math.random(1, 10) * 10;
      if (ran < 5) {
        randPlayers.push(player);
      } else {
        randPlayers.unshift(player);
      }
    });

    return new Promise((resolve, reject) => {
      const readylist = Object.keys(db.chat.readylist).filter(player => db.chat.readylist[player]);

      if (readylist.length === players.length) {
        randRoles.forEach((role, i) => {
          db.game.roles[role].list.push(db.game.players[randPlayers[i]]);
          controller.Player.deleteFromPlayerlist(randPlayers[i]);
          controller.Player.deleteFromReadylist(randPlayers[i]);
        });

        resolve([true, 'Game is starting']);
      } else {
        resolve([false, 'Not all players are ready']);
      }

      // TODO: Reject doesn't do anything at the moment
      reject('Could not start game');
    });
  },
};

// module.exports.create();
// controller.Chat.create();
// controller.Player.createModerator('Josh');
// controller.Player.createPlayer('Player 1');
// controller.Player.createPlayer('Player 2');
// controller.Player.createPlayer('Player 3');
// controller.Player.createPlayer('Player 4');
// controller.Player.createPlayer('Player 5');
// controller.Player.createPlayer('Player 6');
// controller.Player.createPlayer('Player 7');
// controller.Player.createPlayer('Player 8');
// controller.Player.createPlayer('Player 9');
// controller.Player.createPlayer('Player 10');
// controller.Player.createPlayer('Player 11');
// controller.Player.createPlayer('Player 12');
// module.exports.startGame();
