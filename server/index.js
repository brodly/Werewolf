/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// routes and controller
const routes = require('./routes/index');
const controller = require('./controllers/index');

// game database
const db = require('../database/index');

// game models
const { Player, Moderator } = require('./models/users');
const { Message } = require('./models/chat');
const { Game } = require('./models/game');

// server variables
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Middleware
app.use(routes.static);

// Routes
app.get('/status', routes.router);

// Open socket connection
io.on('connection', (client) => {
  client.on('new game', (username) => {
    controller.createGame()
      .then(() => controller.createChat())
      .then(() => controller.createModerator(username))
      .catch(err => console.log(err));
  });

  client.on('new user', (username) => {
    controller.player.createPlayer(username)
      .then(() => { io.emit('update players', controller.player.getPlayerlist); })
      .then(() => controller.chat.createMessage(null, `${username} has joined!`))
      .then((message) => { io.emit('chat message', message); })
      .catch(err => console.log(err));
  });

  client.on('player leave', (username) => {
    controller.player.deletePlayer(username)
      .then(() => { io.emit('update players', controller.player.getPlayerlist); })
      .then(() => controller.chat.createMessage(null, `${username} has left!`))
      .then((message) => { io.emit('chat message', message); })
      .catch(err => console.log(err));
  });

  client.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });

  // CHAT FUNCTIONALITY
  // client.on('chat announce', (message) => {
  //   io.emit('chat message', { id: 999, username: 'bot', message });
  // });

  client.on('chat message', (data) => {
    const message = new Message(db.chat.getId, data.username, data.message);
    // controller.player.updateRole(data.username, data.message);
    io.emit('chat message', message);
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });

// module.exports.game = game;
// module.exports.chat = chat;
