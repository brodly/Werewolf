/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// routes and controller
const router = require('./routes/index');
const controller = require('./controllers');

// server variables
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
app.get('/database', router);
app.get('/debug', router);

// Open socket connection
io.on('connection', (client) => {
  client.on('new game', (username) => {
    controller.Game.create();
    controller.Chat.create();
    controller.Player.createModerator(username);
  });

  // async (username) => {
  //   try {
  //     await controller.Game.create();
  //     await controller.Chat.create();
  //     await controller.Player.createModerator(username);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  client.on('new user', async (username) => {
    try {
      await controller.Player.createPlayer(username);
      const message = await controller.Chat.newMessage(null, `${username} has joined!`);
      await io.emit('update player list', controller.Player.playerlist);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('player ready', async (username) => {
    try {
      controller.Player.ready(username);
      const message = await controller.Chat.newMessage(null, `${username} is ready`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('player leave', async (username) => {
    try {
      await controller.Player.deletePlayer(username);
      await io.emit('update player list', controller.Player.playerlist);
      const message = await controller.Chat.newMessage(null, `${username} has left!`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('update moderator', async (username) => {
    try {
      await controller.Player.updateModerator(username);
      const message = await controller.Chat.newMessage(null, `${username} is now the moderator`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('start game', async () => {
    try {
      const status = await controller.Game.startGame();
      const message = await controller.Chat.newMessage(null, status);
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

  client.on('chat message', async (data) => {
    try {
      const message = await controller.Chat.newMessage(data.username, data.message);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
