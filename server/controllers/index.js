const { Game } = require('../models/game');
const { Chat, Message } = require('../models/chat');
const { Moderator, Player } = require('../models/user');
const db = require('../../database/index');

module.exports.player = {
  createPlayer: (username) => {
    const player = new Player(username);
    db.playerlist.push(player);
  },
  updateRole: (username, role) => {
    db.playerlist.forEach((player) => {
      if (player.username === username) {
        player.role = role;
      }
    });
  },
  deletePlayer: (username) => {
    let index = null;

    db.playerlist.forEach((player, i) => {
      if (player.username === username) {
        index = i;
      }
    });

    if (index !== null) {
      db.playerlist.splice(index, 1);
    } else {
      console.log(`Error: ${username} does not exist in playerlist`);
    }
  },
  getPlayer: (username) => {
    let result;

    db.playerlist.forEach((player) => {
      if (player.username === username) {
        result = player;
      }
    });

    return result;
  },
  get getPlayerlist() {
    const result = [];
    db.playerlist.forEach((player) => {
      result.push(player.username);
    });
    return result;
  },
};

module.exports.game = {
  updatePlayer: () => { },

  playerLeave: () => { },

  disconnect: () => { },
};

module.exports.chat = {
  createMessage: (data) => {
    const message = new Message(chat.getId, data.username, data.message);
    io.emit('chat message', message);
    chat.message(username, message);
  },
};

// client.on('new user', (username) => {
//   console.log(game);
//   game.addPlayer(username);
//   // const player = new Player(username, 'moderator');
//   // chat.addPlayer(username);
//   console.log(game);
//   io.emit('update players', game.players);
//   console.log(username, 'connected');
// });

// client.on('chat message', (data) => {
//   const message = new Message(chat.getId, data.username, data.message);
//   io.emit('chat message', message);
// });

// client.on('player leave', (username) => {
//   chat.removePlayer(username);
//   io.emit('update players', chat.userlist);
//   console.log(username, 'has left');
// });

// client.on('disconnect', (data) => {
//   // TODO: remove user from playerList
//   // Have to find how to pass username into the data object
//   console.log(data, 'user disconnected');
// });
