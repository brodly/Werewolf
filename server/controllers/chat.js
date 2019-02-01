/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Chat, Message } = require('../models/chat');

module.exports = {
  create() {
    const chat = new Chat();

    return new Promise((resolve, reject) => {
      if (!chat) reject('Chat could not be created');
      resolve(db.chat = chat);
    });
  },
  newMessage(username, msg) {
    const message = new Message(db.chat.getId, username, msg);

    return new Promise((resolve, reject) => {
      if (!message) reject('Message could not be created');
      resolve(message);
    });
  },
};
