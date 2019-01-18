const express = require('express');
const path = require('path');

const app = express();

const port = 3000 || env.process.PORT;

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => { console.log('Listening on port: ', port) });