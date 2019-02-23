class Chat {
  constructor() {
    this.messageId = 1;
    this.readylist = {};
  }

  get getId() {
    const id = this.messageId;
    this.messageId += 1;
    return id;
  }

  toggleReady(username) {
    const status = this.readylist[username];
    if (status) this.readylist[username] = false;
    else this.readylist[username] = true;
    return this.readylist[username];
  }

  addToReadylist(username) {
    this.readylist[username] = false;
  }

  deleteFromReadylist(username) {
    delete this.readylist[username];
  }

  readyStatus(username) {
    return this.readylist[username];
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
