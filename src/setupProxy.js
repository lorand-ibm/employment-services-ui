const { createProxyMiddleware } = require('http-proxy-middleware');
let path = '/*';
const __DEV__ = process.env.NODE_ENV === 'development';

// don't SSR on local
if (__DEV__) {
  path = '/api'
}

module.exports = function(app) {
  app.use(
    path,
    createProxyMiddleware({
      target: 'http://localhost:7000',
      changeOrigin: true,
    })
  );
};