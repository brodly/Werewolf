class Chat {
  constructor() {
    this.messageId = 1;
  }

  get getId() {
    const id = this.messageId;
    this.messageId += 1;
    return id;
  }
}

class Message {
  constructor(id, username, message) {
    this.id = id;
    this.username = username;
    this.message = message;
  }
}

module.exports.Chat = Chat;
module.exports.Message = Message;
