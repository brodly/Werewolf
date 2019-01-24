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
let count = 1;

app.use(routes.static);

io.on('connection', (client) => {
  client.on('new user', (username) => {
    console.log(username, 'connected');
  });

  client.on('chat message', (message) => {
    message.id = count;
    count += 1;
    console.log(message);
    io.emit('chat message', message);
  });

  client.on('disconnect', (data) => {
    console.log(data, 'user disconnected');
  });
});

server.listen(port, () => { console.log('Listening on port:', port); });
