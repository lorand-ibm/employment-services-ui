require('dotenv').config();
if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

require('./dist/server/main.js');
