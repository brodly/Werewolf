/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const http = require('http');
const socketsIO = require('socket.io');
const routes = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketsIO(server);

const port = process.env.PORT || 3000;

// Current player list
const chat = {
  count: 1,
  list: [],

  addPlayer: (user) => {
    chat.list.push(user);
  },

  removePlayer: (user) => {
    const playerList = chat.list;
    const index = playerList.indexOf(user);
    if (index > -1) {
      playerList.splice(index, 1);
    }
  },
};

app.use(routes.static);

io.on('connection', (client) => {
  client.on('new user', (username) => {
    chat.addPlayer(username);
    io.emit('update players', chat.list);
    console.log(username, 'connected');
  });

  client.on('chat message', (message) => {
    message.id = chat.count;
    chat.count += 1;
    console.log(message);
    io.emit('chat message', message);
  });

  client.on('disconnect', (data) => {
    // TODO: remove user from playerList
    // Have to find how to pass username into the data object
    console.log(data, 'user disconnected');
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
