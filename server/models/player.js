/* eslint-disable no-multi-spaces */
const Roles = require('./roles');

class User {
  constructor(username) {
    this.username = username;
    this.role     = '';
    this.title    = '';
    this.selected = null;
    this.actions  = [];
  }

  updateRole(role) {
    this.role    = Roles[role].role;
    this.title   = Roles[role].title;
    this.actions = Roles[role].actions;
  }
}

class Moderator extends User {
  constructor(username) {
    super(username);
    this.updateRole('moderator');
  }
}

class Player extends User {
  constructor(username) {
    super(username);
    this.role  = 'player';
    this.title = 'Player';
    this.alive = true;
    this.ready = false;
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }

  toggleReady() {
    if (!this.ready) this.ready = true;
    else this.ready = false;
  }
}

module.exports.Moderator = Moderator;
module.exports.Player = Player;
