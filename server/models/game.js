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
        return that.players[username];
      },

      /**
       * Assigns the indicated player with the passed in role on the actual player object
       * @param {string} username
       * @param {string} role
       */
      assignRole(username, role) {
        const player = {
          username,
          alive: true,
          selected: null,
        };

        that.players[username].updateRole(role);
        that.rolelist[username] = role;
        that.roles[role].list.push(player);
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
       * @return {array} Returns an array of strings which list all joined players.
       * This list comes from the keys of the players list which contains each individual
       * player object
       */
      get list() {
        return Object.keys(that.players);
      },
    };

    this.role = {
      /**
       *
       * @param {string} username
       * @returns {string} Specific role of user
       */
      byUser(username) {
        return that.rolelist[username];
      },

      /**
       * @returns {array} Returns an array of objects where each
       * object has a key denoted the user and a value denoted their role
       */
      get list() {
        return that.rolelist;
      },

      /**
       *
       * @param {string} role
       * @returns {array} Returns an array of objects where each object is a player.
       * The key is the username of the player and the value is the current selected user.
       * This is currently used for role selection indication on the client.
       */
      listOfPlayers(role) {
        return that.roles[role].list;
      },
    };

    this.selected = {
      update(role, username, selected) {
        that.roles[role].list.forEach((player) => {
          if (player.username === username) {
            player.selected = selected;
          }
        });
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
