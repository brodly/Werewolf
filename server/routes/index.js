const express = require('express');
const path = require('path');
const db = require('../../database');

const router = express.Router();

router.get('/database', (req, res) => {
  res.send(db);
});

router.get('/debug', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/debug.html'));
});

module.exports = router;
