import path from 'path'
import dotEnv from 'dotenv';
dotEnv.config({ path: path.resolve(__dirname + "/../../.env") });

import express from 'express';
import apiRouter from './api/api';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '../../build')));

app.use('/api', apiRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

const port = process.env.SERVER_PORT || 9000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
