/* eslint-disable switch-colon-spacing */
/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Game } = require('../models');
const controller = require('../controllers');

module.exports = {
  // GAME CONTROLS
  create() { db.game = new Game(); },
  startGame() {
    const players       = Object.keys(db.game.players);
    const roles         = Object.keys(db.game.roles).filter(role => role !== 'moderator');
    const roleCount     = roles.reduce((acc, role) => acc + db.game.roles[role].max, 0);
    const villagerCount = players.length - roleCount;
    const randRoles     = [];
    const randPlayers   = [];
    const readylist     = Object.keys(db.chat.readylist).filter(player => db.chat.readylist[player]);

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

  // ROLE CONTROLS
  get rolelist()             { return db.game.rolelist; },
  getAllRoles:               () => db.roles.getAll(),

  // ACTION CONTROLS
  addToAction: (target, action) => { db.game.action.add(target, action); },
  resetAction:         (action) => { db.game.action.reset(action); },
  resetAllActions:           () => { db.game.action.resetAll(); },
  getAction:             action => db.game.action.get(action),
  get actionlist()        { return db.game.action.actionlist; },
  tallyAction:           action => db.game.action.tally(action),

  // MODERATOR CONTROLS
  nextRound:                 () => db.game.moderatorControls.nextRound(),
  getRound:                  () => db.game.round,
  toggleNight:               () => db.game.moderatorControls.toggleNight(),
  getNight:                  () => db.game.moderatorControls.getNight(),
  startTimer:                () => db.game.moderatorControls.startTimer(),
  stopTimer:                 () => db.game.moderatorControls.stopTimer(),
  resetTimer:                () => db.game.moderatorControls.resetTimer(),
  getCurrentTime:            () => db.game.moderatorControls.currentTime(),
};
