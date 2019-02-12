class User {
  constructor(username) {
    this.username = username;
  }
}

class Moderator extends User {
  constructor(username) {
    super(username);
    this.role = 'moderator';
    this.title = 'Moderator';
    this.alive = false;
    this.actions = ['start timer', 'next round'];
  }
}

class Player extends User {
  constructor(username) {
    super(username);
    this.role = 'player';
    this.title = 'Player';
    this.alive = true;
    this.ready = false;
    this.selected = '';
    this.actions = [];
  }

  toggleAlive() {
    if (!this.alive) this.alive = true;
    else this.alive = false;
  }

  toggleReady() {
    if (!this.ready) this.ready = true;
    else this.ready = false;
  }

  updateRole(role, actions) {
    this.role = role;
    this.title = role.charAt(0).toUpperCase() + role.slice(1);
    this.actions = actions;
  }
}

// class Villager extends Player {
//   constructor(username) {
//     super(username);
//     this.role = 'villager';
//     this.title = 'Villager';
//     this.actions = ['kill'];
//   }
// }

// class Wolf extends Player {
//   constructor(username) {
//     super(username);
//     this.role = 'wolf';
//     this.title = 'Wolf';
//     this.actions = ['kill'];
//   }
// }

// class Seer extends Player {
//   constructor(username) {
//     super(username);
//     this.role = 'seer';
//     this.title = 'Seer';
//     this.actions = ['reveal'];
//   }
// }

// class Doctor extends Player {
//   constructor(username) {
//     super(username);
//     this.role = 'doctor';
//     this.title = 'Doctor';
//     this.actions = ['save'];
//   }
// }

module.exports.Moderator = Moderator;
module.exports.Player = Player;
// module.exports.Role = (username, role) => (() => {
//   switch (role) {
//     case 'wolf': return Wolf;
//     case 'doctor': return Doctor;
//     case 'seer': return Seer;
//     case 'villager': return Villager;
//     default: return null;
//   }
// })();
