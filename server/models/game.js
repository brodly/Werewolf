class Game {
  constructor() {
    this.id = 1;
    this.round = 1;
    this.night = false;
    this.players = {};
    this.moderator = null;
    this.rolelist = {};
    this.roles = {
      wolf: {
        max: 2,
        alive: 2,
        list: [],
      },
      seer: {
        max: 1,
        alive: 1,
        list: [],
      },
      doctor: {
        max: 1,
        alive: 1,
        list: [],
      },
      villager: {
        alive: 0,
        list: [],
        get max() {
          return this.list.length;
        },
      },
    };
    this.action = {
      add: (player, action) => {
        if (this.action[action].list[player]) {
          this.action[action].list[player] += 1;
        } else {
          this.action[action].list[player] = 1;
        }
      },
      reset: (action) => { this.action[action].list = {}; },
      tally: (action) => {
        let result = '';
        let maxCount = 0;

        const list = Object.keys(this.action[action].list);

        list.forEach((player) => {
          if (list[player] > maxCount) {
            result = player;
            maxCount = list[player];
          }
        });

        return result;
      },
      reveal: {
        list: {},
      },
      save: {
        list: {},
      },
      kill: {
        list: {},
      },

    };
  }

  toggleNight() {
    if (this.night) this.night = false;
    else this.night = true;
    return this.night;
  }

  nextRound() {
    this.round += 1;
    return this.round;
  }
}

module.exports = Game;
