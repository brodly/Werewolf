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
    this.ready = false;
    this.selected = '';
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }

  // get selected() { return this.selected; }

  // set selected(selection) { this.selected = selection; }
}

module.exports.Moderator = Moderator;
module.exports.Player = Player;
