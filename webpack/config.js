import path from 'path';
import merge from 'webpack-merge';

export const general = {
  resolve: {
    modules: [path.join(__dirname, '../src'), path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.ts', '.tsx'],
  },
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: /src/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        include: /src/,
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
    ],
  },
};

export const browser = merge(general, {
  module: {
    rules: [
      {
        test: /\.(mp3|ogg|wav)$/,
        loader: 'url-loader?prefix=audio/&limit=5000',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?prefix=font/&limit=5000&mimetype=application/octet-stream',
      },
      {
        test: /\.(eot|svg|gif|jpg|png)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ],
  },
});
