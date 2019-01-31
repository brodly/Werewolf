/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// routes and controller
const routes = require('./routes/index');
const controller = require('./controllers/model');

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
  client.on('new game', async (username) => {
    try {
      await controller.createGame();
      await controller.createChat();
      await controller.createModerator(username);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('new user', async (username) => {
    try {
      await controller.Player.createPlayer(username);
      await io.emit('update players', controller.Player.getPlayerlist);
      const message = await controller.Chat.createMessage(null, `${username} has joined!`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('player leave', async (username) => {
    try {
      await controller.Player.deletePlayer(username);
      await io.emit('update players', controller.Player.getPlayerlist);
      const message = await controller.Chat.createMessage(null, `${username} has left!`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('update moderator', async (username) => {
    try {
      await controller.updateModerator(username);
      const message = await controller.Chat.createMessage(null, `${username} is now the moderator`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });

  client.on('chat message', (data) => {
    const message = new Message(db.chat.getId, data.username, data.message);
    // controller.Player.updateRole(data.username, data.message);
    io.emit('chat message', message);
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
