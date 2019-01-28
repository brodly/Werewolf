/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketsIO = require('socket.io');

// routes and controller
const routes = require('./routes/index');
const controller = require('./controllers/index');

// game database
const db = require('../database/index');

// game models
const { Player, Moderator } = require('./models/user');
const { Chat, Message } = require('./models/chat');
const { Game } = require('./models/game');

// server variables
const app = express();
const server = http.createServer(app);
const io = socketsIO(server);
const port = process.env.PORT || 3000;

// create a new instance of a chatroom
const chat = new Chat();
// const game = new Game();

// Middleware
app.use(routes.static);

app.get('/status', routes.router);

// Open socket connection
io.on('connection', (client) => {
  // USER FUNCTIONALITY
  client.on('new user', (username) => {
    controller.player.createPlayer(username);
    io.emit('update players', controller.player.getPlayerlist);
    console.log(username, 'connected');
  });

  client.on('player leave', (username) => {
    controller.player.deletePlayer(username);
    io.emit('update players', controller.player.getPlayerlist);
    console.log(username, 'has left');
  });

  client.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });




  // CHAT FUNCTIONALITY
  client.on('chat message', (data) => {
    const message = new Message(chat.getId, data.username, data.message);
    controller.player.updateRole(data.username, data.message);
    io.emit('chat message', message);
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });

// module.exports.game = game;
module.exports.chat = chat;
