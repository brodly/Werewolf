/* eslint-disable no-multi-spaces */
const io = require('socket.io')();
const controller = require('../server/controllers');
const {
  newGame,
  readyUp,
  startGame,
  resetGame,
  roles,
  players,
} = require('../__data__/testing_data');

beforeEach(() => {
  newGame();
  startGame();
});

afterEach(() => {
  resetGame();
});

describe('Ready Status', () => {
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

describe('Role Events', () => {
  it('Should return a role list specific to the moderator role', () => {
    const list = controller.Events.GetRolelist(io, 'moderator');
    players.forEach((player, i) => {
      expect(list[i].username).toBe(player);
      expect(list[i].alive).toBe(true);
      expect(list[i].selected).toBeNull();
    });
  });

  it('Should return a role list specific to the specified role', () => {
    Object.keys(roles)
      .filter(role => role !== 'moderator')
      .forEach((role) => {
        const list = controller.Events.GetRolelist(io, role);
        const { count } = roles[role];

        list.forEach((player) => {
          expect(player.username).toBeDefined();
          expect(player.alive).toBe(true);
          expect(player.selected).toBeNull();
          expect(list.length).toBe(count);
        });
      });
  });
});

describe('Action Events', () => {
  it('Should detect incoming action and add it to the appropriate action count', () => {
    Object.keys(roles)
      .filter(role => role !== 'moderator')
      .forEach((role, i) => {
        const username = players[5];
        const target = players[i];
        const { action } = roles[role];
        controller.Events.Action({ username, target, action });
        const result = controller.Game.getAction(action);
        expect(result[target]).toBe(1);
      });
  });

  it('Should handle moderator specific events', () => {

  });

  it('Should reset all actions list count', () => {

  });

  it('Should reset the Kill action list', () => {
    const action = 'kill';
    const username = players[3];
    const target = players[7];

    for (let i = 0; i < 8; i += 1) {
      controller.Events.Action({ username, target, action });
    }

    controller.Events.ResetAction(action);

    const result = controller.Game.getAction(action);
    expect(result).toEqual({});
  });

  it('Should reset all action lists', () => {
    controller.Events.ResetAllActions();
  });
});

describe('Round Events', () => {
  const { Game, Events } = controller;
  it('Should call controller.Game.startTimer', () => {
    const spy = jest.spyOn(Game, 'startTimer');

    Events.StartTimer(io);

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('Should call controller.Game.nextRound', () => {
    const spy = jest.spyOn(Game, 'nextRound');

    Events.NextRound(io);
    Events.NextRound(io);

    expect(spy).toHaveBeenCalledTimes(2);

    spy.mockReset();
    spy.mockRestore();
  });
});
