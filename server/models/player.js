const uuidv4 = require('uuid/v4');

class Player {
  constructor(username, type) {
    this._id = uuidv4;
    this.username = username;
    this.type = type;
    this.alive = true;
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }
}

module.exports.Player = Player;
