const io = require('socket.io-client')();
const controller = require('../server/controllers/index');
const db = require('../database');
const {
  newGame,
  players,
  readyUp,
  roles,
  startGame,
  resetGame,
} = require('../__data__/testing_data');

beforeEach(() => {
  newGame();
});

afterEach(() => {
  resetGame();
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
    readyUp(io);
    startGame();
    const { rolelist } = controller.Game;

    expect(Object.keys(rolelist).length).toBe(players.length);

    players.forEach((player) => {
      const role = rolelist[player];
      expect(Object.keys(roles)).toContain(role);
    });
  });
});

describe('Retrive Rolelist', () => {
  it('Should be an object containing list of every player and their role', () => {
    readyUp(io);
    startGame();

    const result = controller.Game.rolelist;
    const list = Object.keys(roles);

    players.forEach((player) => {
      expect(list).toContain(result[player]);
    });
  });
});

describe('Actions', () => {
  const mockAction = (count, username, target, action) => {
    for (let i = 0; i < count; i += 1) {
      controller.Events.Action({ username, target, action });
    }
  };

  beforeEach(() => {
    readyUp(io);
    startGame();
    controller.Events.ResetAllActions();
  });

  it('Should return an Object with player and their votes', () => {
    const action = 'reveal';
    const [t1, t2, t3, username] = players;

    mockAction(2, username, t1, action);
    mockAction(3, username, t2, action);
    mockAction(3, username, t3, action);
    const result = controller.Game.getAction(action);
    expect(result).toEqual({
      [t1]: 2,
      [t2]: 3,
      [t3]: 3,
    });
  });

  it('Should add a targetted player to the appropriate action list', () => {
    controller.Game.addToAction('Player 6', 'kill');
    controller.Game.addToAction('Player 6', 'reveal');
    controller.Game.addToAction('Player 7', 'reveal');
    controller.Game.addToAction('Player 9', 'save');
    controller.Game.addToAction('Player 8', 'kill');
    controller.Game.addToAction('Player 8', 'kill');

    const kill = controller.Game.getAction('kill');
    const save = controller.Game.getAction('save');
    const reveal = controller.Game.getAction('reveal');

    expect(kill).toEqual({ 'Player 6': 1, 'Player 8': 2 });
    expect(save).toEqual({ 'Player 9': 1 });
    expect(reveal).toEqual({ 'Player 6': 1, 'Player 7': 1 });
    expect(save).not.toEqual({ 'Player 6': 0 });
    expect(reveal).not.toEqual({ 'Player 6': 0 });
  });

  it('Should reset the specified action list', () => {
    let result;
    const username = players[5];
    const targets = [players[3], players[4], players[7]];
    const [target1, target2, target3] = targets;
    const action = 'kill';

    targets.forEach((target) => {
      mockAction(1, username, target, action);
    });
    result = controller.Game.getAction(action);
    expect(result).toEqual({ [target1]: 1, [target2]: 1, [target3]: 1 });

    controller.Game.resetAction(action);

    result = controller.Game.getAction(action);
    expect(result).toEqual({});
  });

  it('Should reset all action lists', () => {
    let result;
    const username = players[5];
    const targets = [players[3], players[4], players[7]];
    const actions = ['kill', 'reveal', 'save'];

    targets.forEach((target, i) => {
      mockAction(1, username, target, actions[i]);
    });

    actions.forEach((action) => {
      result = controller.Game.getAction(action);
      expect(result).not.toEqual({});
    });

    controller.Game.resetAllActions();

    actions.forEach((action) => {
      result = controller.Game.getAction(action);
      expect(result).toEqual({});
    });
  });

  it('Should return array with player that has the most votes', () => {
    const username = players[4];
    const action = 'kill';

    mockAction(4, username, players[3], action);
    mockAction(1, username, players[1], action);
    mockAction(1, username, players[2], action);

    const result = controller.Game.tallyAction(action);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(players[3]);
    expect(result[0]).not.toBe(players[2]);
  });

  it('Should return array of all players with equal votes', () => {
    const username = players[4];
    const action = 'reveal';
    const list = [players[3], players[4]];

    mockAction(3, username, players[2], action);
    mockAction(4, username, players[3], action);
    mockAction(4, username, players[4], action);

    const result = controller.Game.tallyAction(action);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(list).toContain(result[0]);
    expect(list).toContain(result[1]);
    expect(result[2]).not.toBeDefined();
  });
});

describe('Moderator Actions', () => {
  beforeEach(() => {
    readyUp(io);
    startGame();
    controller.Events.ResetAllActions();
  });

  it('Should start the timer when the timer button is clicked', () => {
    // EXPECT TIMER FUNCTION TO HAVE BEEN CLICKED
    // TIMER COUNTDOWN SHOULD BE TRIGGERED
  });

  it('Should get the current round count', () => {
    const result = controller.Game.getRound();
    expect(result).toBe(1);
  });

  it('Should advance the round', () => {
    let result;
    result = controller.Game.getRound();
    expect(result).toBe(1);
    result = controller.Game.nextRound();
    expect(result).toBe(2);
    result = controller.Game.nextRound();
    expect(result).toBe(3);
  });

  it('Should toggle night and increase the round when its a new night', () => {
    let result;
    expect(controller.Game.getRound()).toBe(1);
    result = controller.Game.toggleNight();
    expect(result).toBe(true);
    expect(controller.Game.getRound()).toBe(2);
    result = controller.Game.toggleNight();
    expect(result).toBe(false);
    expect(controller.Game.getRound()).toBe(3);
    result = controller.Game.toggleNight();
    expect(result).toBe(true);
    expect(controller.Game.getRound()).toBe(4);
  });
});
