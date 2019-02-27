const io = require('socket.io')();
const controller = require('../server/controllers');
const {
  newGame,
  readyUp,
  startGame,
  resetGame,
  players,
} = require('../__data__/testing_data');

beforeAll(() => {
  newGame();
  readyUp(io);
  startGame();
});

afterAll(() => {
  resetGame();
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