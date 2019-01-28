const { Game } = require('../models/game');
const { Chat, Message } = require('../models/chat');
const { Moderator, Player } = require('../models/user');
const db = require('../../database/index');

module.exports.newUser = (username) => {
  const player = module.exports.player.createPlayer(username);
  db.playerlist.push(player);
};

module.exports.player = {
  createPlayer: username => new Player(username),
  updateRole: (username, role) => {
    db.playerlist.forEach((player) => {
      if (player.username === username) {
        player.role = role;
      }
    });
  },
  deletePlayer: (username) => {
    console.log('deleted', username);
  },
  getPlayer: (username) => {
    console.log('getting' + username + 'object');
  },
};

module.exports.game = {
  addPlayer: (username) => {
    console.log('added' + username + 'to game object');
    game.addPlayer(username);
    chat.addPlayer(username);
  },

  removePlayer: (username) => {
    console.log('removed' + username + 'from game object')
    game.removePlayer(username);
  },

  updatePlayer: (playerList) => { io.emit('update players'), game.playerList },

  playerLeave: () => { },

  disconnect: () => { },
};

module.exports.chat = {
  chatMessage: (data) => {
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
