class Chat {
  constructor() {
    this.currentId = 1;
    this.userlist = [];
  }

  get getId() {
    const id = this.currentId;
    this.currentId += 1;
    return id;
  }

  addPlayer(username) {
    this.userlist.push(username);
  }

  removePlayer(username) {
    const newUserlist = this.userlist;
    const index = newUserlist.indexOf(username);

    if (index > -1) {
      newUserlist.splice(index, 1);
    }
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
