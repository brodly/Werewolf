const io = require('socket.io')();
const controller = require('../server/controllers');
const db = require('../database');
const {
  newGame,
  readyUp,
  startGame,
  resetGame,
  players,
  roles,
} = require('../__data__/testing_data');

beforeEach(() => {
  newGame();
  readyUp(io);
  startGame();
});

afterEach(() => {
  resetGame();
});

describe('Moderator Actions', () => {
  const username = players[2];
  const target = null;
  const [startTimer, nextRound, toggleNight] = roles.moderator.actions;

  it('Should call function to start timer', () => {
    const { moderatorControls } = db.game;
    const spy = jest.spyOn(moderatorControls, 'startTimer');

    controller.Game.startTimer(startTimer);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Should start the timer', () => {
    // TODO: Figure out how to test functions with time in Jest
  });

  it('Should increment the round', () => {
    const round = controller.Game.getRound;
    expect(round()).toBe(1);
    controller.Game.nextRound(nextRound);
    expect(round()).toBe(2);
    controller.Game.nextRound(nextRound);
    expect(round()).toBe(3);
  });

  it('Should toggle between day and night', () => {
    const night = controller.Game.getNight;
    const round = controller.Game.getRound;

    expect(night()).toBe(false);
    expect(round()).toBe(1);

    controller.Game.toggleNight();
    expect(night()).toBe(true);
    expect(round()).toBe(1);

    controller.Game.toggleNight();
    expect(night()).toBe(false);
    expect(round()).toBe(2);
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
      controller.Events.Action({ username, target, action });
    }
  });

  it('Should mark a player to be killed if they have the most votes', () => {
    const count = controller.Game.getAction(action);
    const result = controller.Events.TallyAction(action);

    // TODO: Need to have kill player functionality executed
    expect(false).toBe(true);

    expect(result).toBe(target2);
    expect(count[target1]).toBe(2);
    expect(count[target2]).toBe(3);
  });
});

describe('Wolf Actions', () => {

});

describe('Doctor Actions', () => {

});

describe('Seer Actions', () => {

});