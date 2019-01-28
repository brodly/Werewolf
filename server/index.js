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

// Open socket connection
io.on('connection', (client) => {
  client.on('new user', (username) => {
    controller.newUser(username);

    // add player to game object
    // game.addPlayer(username);

    // // add player to player list
    // chat.addPlayer(username);

    // show player in chat

    // broadcast new player to clients

    // controller.addPlayer(username);


    // console.log(game);
    // io.emit('update players', game.players);
    console.log(username, 'connected');
  });

  client.on('chat message', (data) => {
    const message = new Message(chat.getId, data.username, data.message);
    controller.player.updateRole(data.username, data.message);
    console.log(db.playerlist);
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

// module.exports.game = game;
module.exports.chat = chat;
