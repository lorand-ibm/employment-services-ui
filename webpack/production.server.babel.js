import path from 'path';
import mapValues from 'lodash/mapValues';
import webpack from 'webpack';
import merge from 'webpack-merge';
import dotenv from 'dotenv';
import {general as config} from './config';
import CleanWebpackPlugin from 'clean-webpack-plugin';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const context = path.resolve(__dirname, '..');
dotenv.config();

process.env.BABEL_ENV = 'server';

export default merge(config, {
  context,
  target: 'node',
  devtool: 'source-map',
  entry: ['./src/server/index.js', './src/main.scss'],
  // Everything inside node_modules is externalized. Imports with loaders (like 'exec!./commitHash`)
  // are not externalized
  externals: (_, request, callback) => {
    if (request.match(/webpack\/hot\/poll/)) {
      callback(null, false);
    } else {
      callback(null, !!request.match(/^[a-z\-@0-9]+[^!]*$/));
    }
  },
  output: {
    path: path.join(context, 'dist/server'),
    publicPath: process.env.SERVER_ADDRESS + '/static/',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        loader: 'url-loader?emitFile=false&prefix=audio/&limit=5000',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?emitFile=false&prefix=font/&limit=5000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
          'url-loader?emitFile=false&prefix=font/&limit=5000&mimetype=application/octet-stream',
      },
      {
        test: /\.(eot|svg|gif|jpg|png)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?emitFile=false',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({cleanBeforeEveryBuildPatterns: ['./dist/server']}),
    new webpack.DefinePlugin(
      mapValues(
        {
          ...process.env,
          ['process.env.NODE_ENV']: 'production',
        },
        v => JSON.stringify(v),
      ),
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
      },
    }),
    new MiniCssExtractPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
