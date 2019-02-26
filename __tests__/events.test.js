const io = require('socket.io')();
const controller = require('../server/controllers');
const {
  newGame,
  readyUp,
  startGame,
  roles,
  players,
} = require('../__data__/testing_data');

beforeAll(() => {
  newGame();
  readyUp(io);
  startGame();
});

describe('Events', () => {
  it('Should return a role list specific to the moderator role', () => {
    const list = controller.Events.GetRolelist(io, 'moderator');
    players.forEach((player, i) => {
      expect(list[i].username).toBe(player);
      expect(list[i].alive).toBe(true);
      expect(list[i].selected).toBeNull();
    });
  });

  it('Should return a role list specific to the specified role', () => {
    Object.keys(roles).forEach((role) => {
      const list = controller.Events.GetRolelist(io, role);

      list.forEach((player) => {
        expect(player.username).toBeDefined();
        expect(player.alive).toBe(true);
        expect(player.selected).toBeNull();
        expect(list.length).toBe(roles[role]);
      });
    });
  });
});
