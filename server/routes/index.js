const express = require('express');
const path = require('path');
const db = require('../../database/index');

const router = express.Router();
const distpath = path.join(__dirname, '../../dist');

router.get('/status', (req, res) => {
  res.send(db).end();
});

module.exports.router = router;
module.exports.static = express.static(distpath);
