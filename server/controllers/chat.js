/**
 * Creates a new chat object to be stored in the database
 * @returns {Promise<Object>} A promise that is fulfilled with a
 * string indicating whether or not the chat object was created
 */
module.exports.createChat = () => {
  const chat = new Chat();
  return new Promise((resolve, reject) => {
    if (!chat) reject('Chat could not be created');
    else {
      db.chat = chat;
      resolve('Chat object was created');
    }
  });
};

module.exports.createMessage = (username, msg) => {
  const message = new Message(db.chat.getId, username, msg);
  return new Promise((resolve, reject) => {
    if (!message) reject('Message could not be created');
    resolve(message);
  });
};
