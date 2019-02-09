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
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('new game', (username) => {
    controller.Game.create();
    controller.Chat.create();
    controller.Player.createModerator(username);
  });

  socket.on('new user', async (username) => {
    try {
      await controller.Player.createPlayer(username);
      const message = await controller.Chat.newMessage(null, `${username} has joined!`);
      await io.emit('update player list', controller.Player.playerlist);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('player ready', async (username) => {
    try {
      controller.Player.ready(username);
      const message = await controller.Chat.newMessage(null, `${username} is ready`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('player leave', async (username) => {
    try {
      await controller.Player.deletePlayer(username);
      await io.emit('update player list', controller.Player.playerlist);
      const message = await controller.Chat.newMessage(null, `${username} has left!`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('update moderator', async (username) => {
    try {
      await controller.Player.updateModerator(username);
      const message = await controller.Chat.newMessage(null, `${username} is now the moderator`);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('try start game', async () => {
    try {
      const status = await controller.Game.startGame();
      const message = await controller.Chat.newMessage(null, status[1]);
      await io.emit('chat message', message);
      if (status[0]) {
        await io.emit('start game', 'game');
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('start game', (data) => {
    console.log(data);
  });

  socket.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    // make socket.id key, value is username -- store in DB
    console.log(data, socket.id, 'user disconnected');
  });

  socket.on('chat message', async (data) => {
    try {
      const message = await controller.Chat.newMessage(data.username, data.message);
      await io.emit('chat message', message);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on('assign role', (username) => {
    const role = controller.Player.getRole(username);
    const players = controller.Player.getRolePlayerlist(role);

    socket.join(role, () => {
      io.to(`${socket.id}`).emit('assigned role', { role, players });
    });
  });

  socket.on('get role', (username) => {
    io.to(`${socket.id}`).emit('set role', controller.Player.getRole(username));
  });

  socket.on('emit selected', ({ role, username, selected }) => {
    // controller.Player.setSelection(username, selected);
    io.to(role).emit('update selected', { username, selected });
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
