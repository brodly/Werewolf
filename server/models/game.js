class Game {
  constructor() {
    this.id = 1;
    this.players = {};
    this.moderator = null;
    this.roles = {
      list: {},
      wolves: {
        max: 2,
        alive: 2,
        list: [],
      },
      seers: {
        max: 1,
        alive: 1,
        list: [],
      },
      doctors: {
        max: 1,
        alive: 1,
        list: [],
      },
      villagers: {
        alive: 0,
        list: [],
        get max() {
          return this.list.length;
        },
      },
    };
  }

  addPlayer(player) {
    console.log(player, 'added to game');
  }

  removePlayer(player) {
    console.log(player, 'removed from game');
  }

  addToWolves(player) {
    console.log(player, 'added to wolves');
  }

  addToVillagers(player) {
    console.log(player, 'added to Villagers');
  }

  addToSeers(player) {
    console.log(player, 'added to Seers');
  }

  addtoDoctors(player) {
    console.log(player, 'added to Doctors');
  }
}

module.exports = Game;
