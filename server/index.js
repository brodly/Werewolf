/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketsIO = require('socket.io');
const routes = require('./routes/index');
const { Player } = require('./models/player');
const { Chat, Message } = require('./models/chat');

// server variables
const app = express();
const server = http.createServer(app);
const io = socketsIO(server);
const port = process.env.PORT || 3000;

// create a new instance of a chatroom
const chat = new Chat();

// Middleware
app.use(routes.static);

// Open socket connection
io.on('connection', (client) => {
  client.on('new user', (username) => {
    // create a new player
    const player = new Player(username, 'moderator');

    // add the player username to chat list
    chat.addPlayer(player.username);

    // broadcast new chatlist
    io.emit('update players', chat.userlist);
    console.log(username, 'connected');
  });

  client.on('chat message', (data) => {
    // create new message
    const message = new Message(chat.getId, data.username, data.message);

    // broadcast message to clients
    io.emit('chat message', message);
  });

  client.on('disconnecting', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
