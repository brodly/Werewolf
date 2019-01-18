/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();

const port = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => { console.log('Listening on port: ', port); });
