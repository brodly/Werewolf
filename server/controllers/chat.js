/* eslint-disable prefer-promise-reject-errors */
const db = require('../../database');
const { Chat, Message } = require('../models/chat');

module.exports = {
  // CREATE CHAT
  create() {
    const chat = new Chat();

    return new Promise((resolve, reject) => {
      if (!chat) reject('Chat could not be created');
      else {
        db.chat = chat;
        resolve('Chat was created');
      }
    });
  },

  // MESSAGE
  newMessage(username, msg) {
    const message = new Message(db.chat.getId, username, msg);

    return new Promise((resolve, reject) => {
      if (!message) reject('Message could not be created');
      else resolve(message);
    });
  },

  // READYLIST
  get readylist() { return db.chat.readylist; },
  deleteFromReadylist(username) { db.chat.deleteFromReadylist(username); },

};
