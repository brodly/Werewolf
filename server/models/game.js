/* eslint-disable no-multi-spaces */
/* eslint-disable key-spacing */
class Game {
  constructor() {
    const that = this;

    this.id        = 1;
    this.timer     = 300; // In Seconds
    this.round     = 1;
    this.night     = false;
    this.players   = {};
    this.moderator = null;
    this.rolelist  = {};
    this.actions = {
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
    this.roles = {
      moderator: {
        list:  [],
      },
      wolf: {
        max:   2,
        alive: 2,
        list:  [],
      },
      seer: {
        max:   1,
        alive: 1,
        list:  [],
      },
      doctor: {
        max:   1,
        alive: 1,
        list:  [],
      },
      villager: {
        alive: 0,
        list:  [],
        get max() {
          return this.list.length;
        },
      },
    };

    /**
     * PLAYER METHODS
     */
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
          role,
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

      get listOfPlayers() {
        const players = Object.keys(that.players);
        const result = [];

        players.forEach((player) => {
          const { username, alive } = that.players[player];

          const obj = {
            username,
            subtitle: 'Player Image',
            status: alive ? 'Alive' : 'Dead',
          };

          result.push(obj);
        });

        return result;
      },
    };

    /**
     * ROLE METHODS
     */
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
       * @returns Array of all the roles in game
       */
      getAllRoles() {
        return that.roles.filter(role => role !== 'moderator');
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

    /**
     * MODERATOR METHODS
     */
    this.moderatorControls = {
      timer: null,
      /**
       *
       * @param {object} moderator takes in a new Moderator class and
       * adds it to the moderator property of the game object
       */
      add(moderator) {
        that.moderator = moderator;
      },

      /**
       * Toggles night between true and false
       * @returns {boolean} Current night state
       */
      toggleNight() {
        if (!that.night) {
          that.night = true;
        } else {
          that.night = false;
          this.nextRound();
        }
        return that.night;
      },

      /**
       * Increases the round number by 1
       * @returns {number} Current round number
       */
      nextRound() {
        that.round += 1;
        return that.round;
      },

      decrementTimer() {
        that.timer -= 1;

        if (that.timer === 0) {
          this.stopTimer();
        }
      },

      startTimer() {
        this.timer = setInterval(this.decrementTimer, 1000);
      },

      stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
      },

      currentTime() {
        return that.timer;
      },

      getNight() {
        return that.night;
      },
    };

    this.action = {
      add: (target, action) => {
        if (this.actions[action].list[target]) {
          this.actions[action].list[target] += 1;
        } else {
          this.actions[action].list[target] = 1;
        }
      },
      get: action => this.actions[action].list,
      get actionlist() { return Object.keys(that.actions); },
      reset: (action) => { this.actions[action].list = {}; },
      resetAll: () => { Object.keys(this.actions).forEach((a) => { that.action.reset(a); }); },
      tally: (action) => {
        let result = [];
        let maxCount = 0;

        const list = Object.keys(this.actions[action].list);
        const actionList = this.actions[action].list;

        list.forEach((player) => {
          if (actionList[player] > maxCount) {
            result = [player];
            maxCount = actionList[player];
          } else if (actionList[player] === maxCount) {
            result.push(player);
          }
        });

        return result;
      },
    };
  }
}

module.exports = Game;
