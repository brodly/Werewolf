/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
const axios    = require('axios');
const express  = require('express');
const http     = require('http');
const path     = require('path');
const socketIO = require('socket.io');

// router and controller
const router     = require('./routes/index');
const controller = require('./controllers');

// server variables
const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);
const port   = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../dist')));

// Routes
app.get('/database', router);
app.get('/debug', router);

// Open socket connection
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // CREATE EVENTS
  socket.on('new game',         (username) => { controller.Events.NewGame(username); });
  socket.on('new user',         (username) => { controller.Events.NewUser(io, username); });

  // GAME EVENTS
  socket.on('try start game',   ()         => { controller.Events.TryStartGame(io); });
  socket.on('start game',       (data)     => { controller.Events.StartGame(data); });
  socket.on('next round',       ()         => { controller.Events.NextRound(io); });

  // MODERATOR EVENTS
  socket.on('make moderator',   ()         => { controller.Events.MakeModerator(io, socket); });
  socket.on('update moderator', (username) => { controller.Events.UpdateModerator(io, username); });

  // PLAYER EVENTS
  socket.on('make player',      (username) => { controller.Events.MakePlayer(io, socket, username); });
  socket.on('player ready',     (username) => { controller.Events.PlayerReady(io, username); });
  socket.on('player leave',     (username) => { controller.Events.PlayerLeave(io, username); });
  socket.on('player selected',  (data)     => { controller.Events.PlayerSelected(io, data); });

  // CLIENT REQUESTS
  socket.on('get player',       (username) => { controller.Events.GetPlayer(io, socket, username); });
  socket.on('get rolelist',     (role)     => { controller.Events.GetRolelist(io, role); });

  // CHAT EVENTS
  socket.on('chat message',     (data)     => { controller.Events.ChatMessage(io, data); });
  /**
   * EVENTS BELOW ARE STILL WORK IN PROGRESS
   */

  // ROLE EVENTS
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

  // DISCONNET EVENTS
  socket.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    // make socket.id key, value is username -- store in DB
    console.log(data, socket.id, 'user disconnected');
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
