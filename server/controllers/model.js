const db = require('../../database');

class Model {
  constructor(tablename) {
    this.tablename = tablename;
  }
}

module.exports = Model;
