const { createProxyMiddleware } = require('http-proxy-middleware');
const path = '/*';
const __DEV__ = process.env.NODE_ENV === 'development';

if (__DEV__) {
  path = '/api'
}

module.exports = function(app) {
  app.use(
    path,
    createProxyMiddleware({
      target: 'http://localhost:9000',
      changeOrigin: true,
    })
  );
};