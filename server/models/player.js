class User {
  constructor(username) {
    this.username = username;
  }
}

class Moderator extends User {
  constructor(username) {
    super(username);
    this.role = 'moderator';
    this.alive = true;
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

module.exports.Moderator = Moderator;
module.exports.Player = Player;
