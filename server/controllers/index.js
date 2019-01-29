/* eslint-disable prefer-promise-reject-errors */
const { Game } = require('../models/game');
const { Chat, Message, Announcement } = require('../models/chat');
const { Moderator, Player } = require('../models/users');
const db = require('../../database/index');

module.exports.createGame = () => {
  const game = new Game();

  return new Promise((resolve, reject) => {
    if (!game) reject('Game could not be created');
    resolve(db.game = game);
  });
};

module.exports.createModerator = (username) => {
  const moderator = new Moderator(username);
  return new Promise((resolve, reject) => {
    if (!moderator) reject('Moderator could not be created');
    resolve(db.game.moderator = moderator);
  });
};

module.exports.createChat = () => {
  const chat = new Chat();
  return new Promise((resolve, reject) => {
    if (!chat) reject('Chat could not be created');
    resolve(db.chat = chat);
  });
};

module.exports.player = {
  createPlayer: (username) => {
    const player = new Player(username);
    return new Promise((resolve, reject) => {
      if (!player) reject('Player could not be created');
      resolve(db.playerlist.push(player));
    });
  },
  updateRole: (username, role) => {
    db.playerlist.forEach((player) => {
      if (player.username === username) {
        player.role = role;
      }
    });
  },
  deletePlayer: (username) => {
    return new Promise((resolve, reject) => {
      let index = null;

      db.playerlist.forEach((player, i) => {
        if (player.username === username) {
          index = i;
        }
      });

      if (index !== null) {
        resolve(db.playerlist.splice(index, 1));
      } else {
        reject(`Error: ${username} does not exist in playerlist`);
      }
    });
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
  createMessage: (username, msg) => {
    const message = new Message(db.chat.getId, username, msg);
    return new Promise((resolve, reject) => {
      if (!message) reject('Message could not be created');
      resolve(message);
    });
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
