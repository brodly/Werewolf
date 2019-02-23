const io = require('socket.io-client')();
const controller = require('../server/controllers/index');
const db = require('../database');
const {
  newGame,
  players,
  readyUp,
  roles,
} = require('../__data__/testing_data');

beforeAll(() => {
  newGame();
});

describe('Create Game', () => {
  it('Game object should exist in database', () => {
    expect(typeof db.game.id).toBe('number');
    expect(db.game.round).toBe(1);
    expect(Object.keys(db.game.players).length).toBe(players.length);
  });

  it('Should return an array of all currently joined players', () => {
    const playerList = controller.Player.playerlist;
    expect(playerList).toEqual(players);
  });

  it('Should return the moderator object', () => {
    const moderator = {
      actions: ['Start Timer', 'Next Round'],
      role: 'moderator',
      title: 'Moderator',
      username: 'Player 1',
    };
    const moderatorResult = controller.Player.getModerator;
    expect(moderatorResult).toEqual(moderator);
  });

  it('Should return the specified player object', () => {
    const player = {
      actions: [],
      alive: true,
      ready: false,
      role: 'player',
      selected: '',
      title: 'Player',
      username: 'Player 5',
    };
    const result = controller.Player.getPlayer('Player 5');
    expect(result).toEqual(player);
  });
});

describe('Lobby', () => {
  it('Should toggle ready for a specific player', () => {
    let status;
    status = controller.Player.getReadyStatus('Player 3');
    expect(status).toBeFalsy();
    controller.PlayerReady(io, 'Player 3');
    status = controller.Player.getReadyStatus('Player 3');
    expect(status).toBeTruthy();
    controller.PlayerReady(io, 'Player 3');
  });
});

describe('Start Game', () => {
  it('Should not start game if all players are not ready', () => {
    const startGameResult = controller.Game.startGame();
    expect(startGameResult[0]).toBe(false);
  });

  it('Should start game if all players are ready', () => {
    readyUp(io);
    const startGameResult = controller.Game.startGame();
    expect(startGameResult[0]).toBe(true);
  });

  it('Should display all players and their roles', () => {
    const { rolelist } = controller.Game;

    expect(Object.keys(rolelist).length).toBe(players.length);

    players.forEach((player) => {
      const role = rolelist[player];
      expect(Object.keys(roles)).toContain(role);
    });
  });

  it('Should display a list of players in the specified role and their selected status', () => {
    Object.keys(roles).forEach((role) => {
      const result = controller.Player.getListOfPlayersByRole(role);
      expect(result.length).toBe(roles[role]);
    });
  });
});
