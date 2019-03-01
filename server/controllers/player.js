/* eslint-disable key-spacing */
/* eslint-disable no-multi-spaces */
const db = require('../../database');
const { Player, Moderator } = require('../models/player');

module.exports = {
  // updateModerator(username) {
  //   const moderator = new Moderator(username);
  //   db.game.players[username] = db.game.moderator;
  //   db.game.moderator = moderator;
  // },

  // CREATE FUNCTIONS
  createModerator: (username) => {
    db.game.moderatorControls.add(new Moderator(username));
  },
  createPlayer: (username) => {
    db.chat.addToReadylist(username);
    db.game.player.add(new Player(username));
  },

  // GET FUNCTIONS
  getReadyStatus:     username => db.chat.readyStatus(username),
  getPlayer:          username => db.game.player.get(username),
  getPlayerRole:      username => db.game.player.getRole(username),
  getListOfPlayers:         () => db.game.player.listOfPlayers,
  getListOfPlayersByRole: role => db.game.role.listOfPlayers(role),

  get playerlist()   { return db.game.player.list; },
  get rolelist()     { return db.game.role.list; },
  get getModerator() { return db.game.moderator; },

  // SET FUNCTIONS
  assignRole: (username, role) => { db.game.player.assignRole(username, role); },

  // DELETE FUNCTIONS
  deleteFromPlayerlist: (username) => { db.game.player.deleteFromPlayerlist(username); },
  deleteFromReadylist: (username) => { db.chat.deleteFromReadylist(username); },

  // ACTION FUNCTIONS
  toggleReady: username => db.chat.toggleReady(username),
  updateSelected: (role, username, selected) => db.game.selected.update(role, username, selected),
  toggleActionUsed: username => db.game.players[username].toggleActionUsed(),
};
