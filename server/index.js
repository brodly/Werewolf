/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketsIO = require('socket.io');
const routes = require('./routes/index');
const { Player, Moderator } = require('./models/player');
const { Chat, Message } = require('./models/chat');
const { Game } = require('./models/game');

// server variables
const app = express();
const server = http.createServer(app);
const io = socketsIO(server);
const port = process.env.PORT || 3000;

// create a new instance of a chatroom
const chat = new Chat();
const game = new Game();

// Middleware
app.use(routes.static);

// Open socket connection
io.on('connection', (client) => {
  client.on('new user', (username) => {
    console.log(game);
    game.addPlayer(username);
    // const player = new Player(username, 'moderator');
    // chat.addPlayer(username);
    console.log(game);
    io.emit('update players', game.players);
    console.log(username, 'connected');
  });

  client.on('chat message', (data) => {
    const message = new Message(chat.getId, data.username, data.message);
    io.emit('chat message', message);
  });

  client.on('player leave', (username) => {
    chat.removePlayer(username);
    io.emit('update players', chat.userlist);
    console.log(username, 'has left');
  });

  client.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
