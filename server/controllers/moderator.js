/**
 * Creates and sets a new game moderator
 * @param {string} username - takes a string representing the
 * moderators name
 * @return {promise} returns a promise which produces a string
 * that says whether or not the moderator was created
 */
module.exports.createModerator = (username) => {
  const moderator = new Moderator(username);
  return new Promise((resolve, reject) => {
    if (!moderator) reject('Moderator could not be created');
    else {
      db.game.moderator = moderator;
      resolve(moderator, 'is set at the moderator');
    }
  });
};

/**
 * Updates and sets new game moderator
 * @param {string} username - takes a string representing the
 * moderator to update
 * @returns {Promise<Object>} A promise that is fulfilled with a
 * string indicating whether or not the chat object was created
 */
module.exports.updateModerator = (username) => {
  const moderator = new Moderator(username);
  return new Promise((resolve, reject) => {
    if (!moderator) reject('Moderator could not be updated');
    else {
      db.game.players.push(db.game.moderator);
      db.game.moderator = moderator;
      resolve(username, 'is now the moderator');
    }
  });
};