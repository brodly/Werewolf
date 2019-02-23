const controller = require('../server/controllers');

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
  wolf: 2,
  villager: 7,
  doctor: 1,
  seer: 1,
};

module.exports.newGame = () => {
  controller.NewGame('Player 1');

  players.forEach((player) => {
    controller.Player.createPlayer(player);
  });
};

module.exports.readyUp = (io) => {
  players.forEach((player) => {
    controller.PlayerReady(io, player);
  });
};

module.exports.players = players;
module.exports.roles = roles;
