class User {
  constructor(username) {
    this.username = username;
  }
}

class Moderator extends User {
  constructor(username) {
    super(username);
    this.alive = false;
  }
}

class Player extends User {
  constructor(username) {
    super(username);
    this.alive = true;
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }
}

module.exports.Moderator = Moderator;
module.exports.Player = Player;
