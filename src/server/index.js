// @flow
import 'babel-polyfill';
import 'source-map-support/register';
import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import api from './api';
import {auth, setup as setupAuth} from './auth';
import cors from 'cors';
import csp from 'helmet-csp';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import render from './render';
import {debug, getMorgan} from './logger';

process.on('unhandledRejection', rejection => {
  console.log('unhandled rejection:');
  console.error(rejection);
});
dotenv.config(path.resolve(__dirname, '../../'));
// console.log('process.env === ', process.env);

global.fetch = fetch;
global.Response = fetch.Response;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.IS_CLIENT = false;

const PORT = process.env.PORT || 9000;
const server = express();

server.use('/static', express.static('dist/client'));

setupAuth();

server.use(
  cors({
    origin: function(origin, callback) {
      callback(null, true);
    },
    credentials: true,
  }),
);

api.use(csp({
  directives: {
    defaultSrc: ["'self'", 'localhost'],
    fontSrc: ["'self'", 'localhost'],
    imgSrc: ["'self'", 'localhost'],
  },
  setAllHeaders: true,
}));

server.use(cookieParser());
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(passport.session());

// if (process.env.NODE_ENV === 'develop') {
//   server.use(getMorgan());
//   debug('Using Morgan-logger');
// }
// Always use morgan for debugging
server.use(getMorgan());
debug('Using Morgan-logger');

server.use('/api', api);
server.use('/auth', auth);
server.use(render);

server.listen(PORT, error => {
  if (error) {
    debug(error.stack || error);
    throw error;
  }

  debug(`Server running on port ${PORT}`);
});
