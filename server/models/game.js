class Game {
  constructor() {
    this.id = 1;
    this.players = {};
    this.moderator = null;
    this.roles = {
      wolves: {
        alive: 2,
        list: [],
        max: 2,
      },
      seers: {
        alive: 1,
        list: [],
        max: 1,
      },
      doctors: {
        alive: 1,
        list: [],
        max: 1,
      },
      villagers: {
        alive: null,
        list: [],
        get count() {
          return this.list.length;
        },
      },
    };
  }

  addPlayer(player) {
    if (this.moderator === null) {
      this.moderator = player;
    } else {
      this.players.push(player);
    }
  }

  removePlayer(player) {
    const newPlayerList = this.players;
    const index = newPlayerList.indexOf(player);

    if (index > -1) {
      newPlayerList.splice(index, 1);
      this.players = newPlayerList;
    } else {
      console.log(player, 'does not exist');
    }
  }

  addToWolves(player) {
    console.log(player, 'added to wolves')
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
