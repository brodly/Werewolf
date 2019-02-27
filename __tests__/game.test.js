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
      selected: null,
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
      selected: null,
      title: 'Player',
      username: 'Player 5',
      actionUsed: false,
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
    controller.Events.PlayerReady(io, 'Player 3');
    status = controller.Player.getReadyStatus('Player 3');
    expect(status).toBeTruthy();
    controller.Events.PlayerReady(io, 'Player 3');
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
      const count = roles[role];

      expect(result.length).toBe(count);

      result.forEach((player) => {
        expect(typeof player.username).toBe('string');
        expect(player.selected).toBeNull();
        expect(player.alive).toBeTruthy();
      });
    });
  });
});

describe('In Game functions', () => {
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

describe('Moderator Actions', () => {
  it('Should start the timer when the timer button is clicked', () => {
    // EXPECT TIMER FUNCTION TO HAVE BEEN CLICKED
    // TIMER COUNTDOWN SHOULD BE TRIGGERED
  });

  it('Should reset all actions list count', () => {

  });
});

describe('Player Actions', () => {
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

describe('Villager Actions', () => {
  const action = 'kill';
  const [target1, target2] = players;

  beforeEach(() => {
    for (let i = 3; i < 8; i += 1) {
      let target;
      const username = players[i];

      if (i % 2 === 0) target = target1;
      else target = target2;
      controller.Events.Kill({ username, target });
    }
  });

  it('Should mark a player to be killed', () => {
    const count = controller.Game.getAction(action);
    const result = controller.Events.TallyAction(action);

    expect(result).toBe(target2);
    expect(count[target1]).toBe(2);
    expect(count[target2]).toBe(3);
  });

  it('Should reset the Kill action list', () => {
    const target = target1;
    const username = target2;

    controller.Events.Kill({ username, target });

    // controller.Events.ResetAction(action);

    const result = controller.Game.getAction(action);
    expect(result).toEqual({});
  });
});
