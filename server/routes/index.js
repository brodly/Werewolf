const express = require('express');
const db = require('../../database/index');

const router = express.Router();

router.get('/status', (req, res) => res.send(db).end());

module.exports = router;
