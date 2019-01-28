const express = require('express');
const path = require('path');

const router = express.Router();
const distpath = path.join(__dirname, '../../dist');

router.get('/', (req, res) => {
  // res.send(indexDir).status(200);
});

module.exports.static = express.static(distpath);
