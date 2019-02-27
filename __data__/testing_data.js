const controller = require('../server/controllers');
const db = require('../database');

const players = [
  'Player 2',
  'Player 3',
  'Player 4',
  'Player 5',
  'Player 6',
  'Player 7',
  'Player 8',
  'Player 9',
  'Player 10',
  'Player 11',
  'Player 12',
];

const roles = {
  wolf: {
    count: 2,
    action: 'kill',
  },
  villager: {
    count: 7,
    action: 'kill',
  },
  doctor: {
    count: 1,
    action: 'save',
  },
  seer: {
    count: 1,
    action: 'reveal',
  },
};

module.exports.newGame = () => {
  controller.Events.NewGame('Player 1');

  players.forEach((player) => {
    controller.Player.createPlayer(player);
  });
};

module.exports.readyUp = (io) => {
  players.forEach((player) => {
    controller.Events.PlayerReady(io, player);
  });
};

module.exports.startGame = () => {
  controller.Game.startGame();
};

module.exports.resetGame = () => {
  db.game = null;
  db.chat = null;
};

module.exports.players = players;
module.exports.roles = roles;
