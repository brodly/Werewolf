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
  // updateModerator(username) {
  //   const moderator = new Moderator(username);
  //   return new Promise((resolve, reject) => {
  //     if (!moderator) {
  //       console.log('Moderator could not be updated');
  //       reject(false);
  //     } else {
  //       db.game.players[username] = db.game.moderator;
  //       db.game.moderator = moderator;
  //       console.log(`${username} is now the moderator`);
  //       resolve(true);
  //     }
  //   });
  // },
  createPlayer: (username) => {
    const player = new Player(username);
    return new Promise((resolve, reject) => {
      if (!player) {
        console.log('Player could not be created');
        reject(false);
      } else {
        db.game.player.add(player);
        db.chat.toggleReady(username);
        console.log(`${username} was created.`);
        resolve(true);
      }
    });
  },
  assignRole: (username, role) => { db.game.player.assignRole(username, role); },
  deleteFromPlayerlist: (username) => { db.game.player.deleteFromPlayerlist(username); },
  deleteFromReadylist: (username) => { db.chat.deleteFromReadylist(username); },
  get getModerator() { return db.game.moderator; },
  getPlayer: username => db.game.player.get(username),
  getPlayerRole: username => db.game.player.getRole(username),
  getListOfPlayersByRole: role => db.game.role.list(role),
  getSelectedListByRole: role => db.game.selected.getList(role),
  get playerlist() { return db.game.player.list; },
  toggleReady: username => db.chat.toggleReady(username),
  // getSelection: username => db.game.players[username].selected,
  // setSelection: (username, selection) => { db.game.players[username].selected = selection; },

  /* TODO: get/set for selection by Role
     Note: Data is located in different locations,
           make sure selection property is located
           in the proper location for access and passing
           around.
  */
  // getSelectionByRole: username => db.game.rolelist[username].selected,
  // setSelectionByRole: (username, selection) => {
  //   db.game.rolelist[username].selected = selection;
  // },
};
