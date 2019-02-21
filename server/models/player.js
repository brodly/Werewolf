const Roles = require('./roles');

class User {
  constructor(username) {
    this.username = username;
  }
}

class Moderator extends User {
  constructor(username) {
    super(username);
    this.role = 'moderator';
    this.title = 'Moderator';
    this.actions = ['Start Timer', 'Next Round'];
  }
}

class Player extends User {
  constructor(username) {
    super(username);
    this.role = 'player';
    this.title = 'Player';
    this.alive = true;
    this.ready = false;
    this.selected = '';
    this.actions = [];
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }

  toggleReady() {
    if (!this.ready) this.ready = true;
    else this.ready = false;
  }

  updateRole(role) {
    this.role = Roles[role].role;
    this.title = Roles[role].title;
    this.actions = Roles[role].actions;
  }
}

module.exports.Moderator = Moderator;
module.exports.Player = Player;
