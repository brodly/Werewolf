const db = require('../../database');
const { Player, Moderator } = require('../models/player');

module.exports = {
  // updateModerator(username) {
  //   const moderator = new Moderator(username);
  //   db.game.players[username] = db.game.moderator;
  //   db.game.moderator = moderator;
  // },

  // CREATE FUNCTIONS
  createModerator: (username) => { db.game.moderator = new Moderator(username); },
  createPlayer: (username) => {
    db.chat.addToReadylist(username);
    db.game.player.add(new Player(username));
  },

  // GET FUNCTIONS
  get getModerator() { return db.game.moderator; },
  getReadyStatus: username => db.chat.readyStatus(username),
  getPlayer: username => db.game.player.get(username),
  getPlayerRole: username => db.game.player.getRole(username),
  getListOfPlayersByRole: role => db.game.role.listOfPlayers(role),
  getSelectedListByRole: role => db.game.selected.getList(role),
  get playerlist() { return db.game.player.list; },

  // SET FUNCTIONS
  assignRole: (username, role) => { db.game.player.assignRole(username, role); },

  // DELETE FUNCTIONS
  deleteFromPlayerlist: (username) => { db.game.player.deleteFromPlayerlist(username); },
  deleteFromReadylist: (username) => { db.chat.deleteFromReadylist(username); },

  // ACTION FUNCTIONS
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
