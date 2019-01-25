const Player = require('./player');

class Moderator extends Player {
  constructor() {
    super();
    this.type = 'moderator';
  }
}

module.exports.Moderator = Moderator;
