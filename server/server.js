require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

const port = process.env.SERVER_PORT || 9000;
app.listen(port, () => {
  console.log("Server running on port", port);
});