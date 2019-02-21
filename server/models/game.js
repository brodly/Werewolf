class Game {
  constructor() {
    const that = this;

    this.id = 1;
    this.round = 1;
    this.night = false;
    this.players = {};
    /* Contains a list of players
        Key: Player Name
        Value: {
          "username":"<username>",
          "role":"player",
          "title":"Player",
          "alive":true,
          "ready":false,
          "selected":"",
          "actions":[]
        }
    */

    this.moderator = null;
    /* Holds moderator Object

      "moderator": {
        "username": "<username>",
        "role": "moderator",
        "title": "Moderator",
        "actions": ["Start Timer", "Next Round"]
      }

    */

    this.rolelist = {};
    /* Holds list of players and roles
     "player1":"role",
     "player2":"role",
     ...
     "playerN":"role"}
    */
    this.roles = {
      // Each list holds player object in
      // same format at this.players
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

    this.player = {
      /**
       * @param {object} player Pass in the player object you want to add to the player list
       */
      add(player) {
        that.players[player.username] = player;
      },
      /**
       * @param {string} username Pass in the username as a string
       * @return {object} Returns the player object
       */
      get(username) {
        const role = that.player.getRole(username);
        return that.roles[role].list[username];
      },
      /**
       * Assigns the indicated player with the passed in role on the actual player object
       * @param {string} username
       * @param {string} role
       */
      assignRole(username, role) {
        that.players[username].updateRole(role);
        that.rolelist[username] = role;
        that.roles[role].list[username] = that.players[username];
      },
      /**
       * Removes the player object from the player list
       * @param {string} username
       */
      deleteFromPlayerlist(username) {
        delete that.players[username];
      },
      /**
       * Returns specific role of user
       * @param {string} username
       * @return {string} Returns users role
       */
      getRole(username) {
        return that.role.byUser(username);
      },
      /**
       * @return {array} Returns an array of all players in game
       */
      get list() {
        return Object.keys(that.players);
      },
    };

    this.role = {
      byUser(username) {
        return that.rolelist[username];
      },
      getList() {
        return that.rolelist;
      },
      listOfPlayers(role) {
        return that.role[role].list;
      },
    };

    this.selected = {
      getList(role) {
        const list = [];

        that.roles[role].list.forEach((player) => {
          const selected = {
            username: player.username,
            selected: player.selected,
          };

          list.push(selected);
        });

        return list;
      },
      update(username, selected) {
        const role = that.player.getRole(username);
        that.roles[role].list[username].selected = selected;
      },
    };

    this.moderator = {
      toggleNight() {
        if (that.night) that.night = false;
        else that.night = true; that.nextRound();
        return that.night;
      },

      nextRound() {
        that.round += 1;
        return that.round;
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
}

module.exports = Game;
