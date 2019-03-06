const controller = require('../../controllers');

module.exports = (io) => {
  const list = [];
  controller.Game.actionlist.forEach((action) => {
    const tally = {
      action: action[0].toUpperCase() + action.slice(1),
      target: controller.Game.tallyAction(action),
    };

    list.push(tally);
  });

  io.to('moderator').emit('set info', list);

  // THIS RETURN IS FOR TESTING PURPOSES ONLY
  return list;
};
