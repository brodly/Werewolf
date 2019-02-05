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
    const readylist = Object.keys(db.chat.readylist).filter(player => db.chat.readylist[player]);
    const players = Object.keys(db.game.players);
    const roleIndex = {};
    const roleArray = [];

    Object.keys(db.game.roles).forEach((role) => {
      // push the role n number of times where n is the max number for the role
      if (role !== 'villagers') {
        for (let i = 0; i < db.game.roles[role].max; i += 1) {
          const ran = Math.random(1, 10) * 10;
          if (ran < 5) {
            roleArray.push(role);
          } else {
            roleArray.unshift(role);
          }
        }
      }
    });

    return new Promise((resolve, reject) => {
      if (readylist.length === players.length) {
        // init roleArray
        // for each role in db.game.roles


        // generate a random number between 1 and players.length inclusive

        // console.log(roleIndex);
        // console.log(Object.keys(roleIndex));
        // check if number has been selected
          // if it has, generate a new one
          // else push number into roleAssignments array

        // iterate over roleArray
          // assign player at current index in roleAssignemtsn to the current index of roleArray
        // console.log(roleIndex);
        roleArray.forEach((role, i) => {
          db.game.roles[role].list.push(db.game.players[players[i]]);
        });

        // console.log(roleArray);
        // console.log(roleIndex);
        resolve('Game is starting');
      } else {
        resolve('Not all players are ready');
      }

      // TODO: Reject doesn't do anything at the moment
      reject('Could not start game');
    });
  },
};

module.exports.create();
controller.Chat.create();
controller.Player.createModerator('josh');
controller.Player.createPlayer('ryan');
controller.Player.createPlayer('adam');
controller.Player.createPlayer('cody');
controller.Player.createPlayer('Phil');
// module.exports.player.createPlayer('adam');
// module.exports.player.createPlayer('ryan');
module.exports.startGame();

console.log(db.game);
console.log(db.game.roles.wolves.list[0]);
console.log(db.game.roles.seers.list);
console.log(db.game.roles.doctors.list);
console.log(db.game.roles.villagers.list);
console.log(db.game.players);
