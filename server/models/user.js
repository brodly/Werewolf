const uuidv4 = require('uuid/v4');

class User {
  constructor(username) {
    this._id = uuidv4();
    this.username = username;
  }
}

class Moderator extends User {
  constructor() {
    super();
    this.role = 'moderator';
  }
}

class Player extends User {
  constructor(username) {
    super(username);
    this.role = null;
    this.alive = true;
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }

  setRole(role) {
    this.role = role;
  }
}

module.exports.User = User;
module.exports.Moderator = Moderator;
module.exports.Player = Player;
