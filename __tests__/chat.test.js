const io = require('socket.io-client')();
const controller = require('../server/controllers/index');
const db = require('../database');
const { newGame } = require('../__data__/testing_data');

beforeAll(() => {
  newGame();
});

describe('Chat', () => {
  it('Should generate empty chat object', () => {
    expect(db.chat.messageId).toEqual(1);
    expect(db.chat.readylist).toBeDefined();
  });

  it('Should increment messageId on each new message', () => {
    const message = { username: 'test', message: 'test' };

    expect(db.chat.messageId).toBe(1);
    controller.ChatMessage(io, message);
    expect(db.chat.messageId).toBe(2);
    controller.ChatMessage(io, message);
    controller.ChatMessage(io, message);
    expect(db.chat.messageId).toBe(4);
  });
});