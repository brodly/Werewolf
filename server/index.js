/* eslint-disable no-multi-spaces */
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

  socket.on('assign moderator', () => {
    const moderator = controller.Player.getModerator;

    socket.join('moderator', () => {
      io.to('moderator').emit('assigned role', moderator);
    });
  });

  socket.on('assign player', (username) => {
    const player = controller.Player.getPlayer(username);

    socket.join(player, () => {
      io.to(`${socket.id}`).emit('assigned role', player);
    });
  });

  socket.on('get player', (username) => {
    const player = controller.Player.getPlayer(username);
    io.to(`${socket.id}`).emit('set role', player);
  });

  socket.on('reveal player', ({ player, username }) => {
    // console.log(username + ' wants to see ' + player);
    controller.Game.addToAction(player, 'reveal');
    // io.to('seer').emit('player role', controller.Player.getRole(player));
  });

  socket.on('kill player', ({ player, username }) => {
    // console.log(username + ' wants to kill ' + player);
    controller.Game.addToAction(player, 'kill');
  });

  socket.on('save player', ({ player, username }) => {
    // console.log(username + ' wants to save ' + player);
    controller.Game.addToAction(player, 'save');
  });

  socket.on('emit selected', ({ role, username, selected }) => {
    // controller.Player.setSelection(username, selected);
    io.to(role).emit('update selected', { username, selected });
  });

  socket.on('next round', () => {
    io.emit('update round', controller.Game.nextRound());
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
