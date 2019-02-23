/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Game } = require('../models');
const controller = require('../controllers');

module.exports = {
  // CREATE
  create() { db.game = new Game(); },

  // RETRIVE
  get rolelist() { return db.game.rolelist; },

  // UPDATE

  // DELETE

  // ACTIONS
  startGame() {
    const players = Object.keys(db.game.players);
    const roles = Object.keys(db.game.roles);
    const roleCount = roles.reduce((acc, role) => acc + db.game.roles[role].max, 0);
    const villagerCount = players.length - roleCount;
    const randRoles = [];
    const randPlayers = [];
    const readylist = Object.keys(db.chat.readylist).filter(player => db.chat.readylist[player]);

    if (readylist.length === players.length) {
      roles.forEach((role) => {
        if (role !== 'villager') {
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

      randRoles.forEach((role, i) => {
        const username = randPlayers[i];
        if (username) controller.Player.assignRole(username, role);
      });

      return [true, 'Game is starting'];
    }

    return [false, 'Not all players are ready'];
  },
  addToAction: (player, action) => { db.game.action.add(player, action); },
  resetAction: (action) => { db.game.action.reset(action); },
  tallyAction: (action) => { db.game.action.tally(action); },
  nextRound: () => db.game.nextRound(),
  toggleNight: () => db.game.toggleNight(),
};
