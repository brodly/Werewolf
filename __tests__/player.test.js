const io = require('socket.io')();
const controller = require('../server/controllers');
const {
  newGame,
  readyUp,
  startGame,
  resetGame,
  players,
  roles,
} = require('../__data__/testing_data');

beforeAll(() => {
  newGame();
  readyUp(io);
  startGame();
});

afterAll(() => {
  resetGame();
});

describe('Create Functions', () => {
  it('Should create a new moderator', () => {

  });

  it('Should create a new player', () => {

  });

  it('Should retrieve the moderator object', () => {

  });
});

describe('Player List', () => {
  it('Should return an array of players', () => {
    const result = controller.Player.getListOfPlayers();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(players.length);

    result.forEach((player, i) => {
      expect(player.username).toBe(players[i]);
      expect(typeof player.subtitle).toBe('string');
      expect(player.status).toBe('Alive');
    });
  });
});

describe('Role List', () => {
  it('Should display a list of players in the specified role and their selected status', () => {
    Object.keys(roles)
      .filter(role => role !== 'moderator')
      .forEach((role) => {
        const result = controller.Player.getListOfPlayersByRole(role);
        const { count } = roles[role];

        expect(result.length).toBe(count);

        result.forEach((player) => {
          expect(typeof player.username).toBe('string');
          expect(player.selected).toBeNull();
          expect(player.alive).toBeTruthy();
        });
      });
  });

  it('Should update the selected field of specified player in the rolelist', () => {
    const role = 'wolf';
    let rolelist = controller.Player.getListOfPlayersByRole(role);
    const p1 = rolelist[0];
    const p2 = rolelist[1];

    expect(p1.selected).toBeNull();

    controller.Player.updateSelected(role, p1.username, p2.username);
    rolelist = controller.Player.getListOfPlayersByRole(role);

    expect(p1.selected).toBe(p2.username);
  });
});

describe('Player Controls', () => {
  it('Should toggle ToggleActionUsed', () => {
    const player = 'Player 7';
    let result;

    const checkActionUsed = () => {
      result = controller.Player.getPlayer(player).actionUsed;
    };

    checkActionUsed();
    expect(result).toBe(false);
    controller.Player.toggleActionUsed(player);
    checkActionUsed();
    expect(result).toBe(true);
    controller.Player.toggleActionUsed(player);
    checkActionUsed();
    expect(result).toBe(false);
  });
});
