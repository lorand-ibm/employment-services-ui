import path from 'path';
import mapValues from 'lodash/mapValues';
import {browser as config} from './config';
import merge from 'webpack-merge';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import ChunkFilePlugin from './ChunkFilePlugin';
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin';
import dotenv from 'dotenv';

import {getGoogleTagManagerNoScript, getGoogleTagManagerScript} from '../src/tag-manager';

const context = path.resolve(__dirname, '..');
dotenv.config();

export default merge(config, {
  context,
  devtool: 'source-map',
  entry: ['whatwg-fetch', 'babel-polyfill', 'focus-visible', 'delayed-scroll-restoration-polyfill', './src/index.js', './src/main.scss'],
  output: {
    path: path.join(context, 'dist/client'),
    publicPath: `${process.env.SERVER_ADDRESS}/static/`,
    filename: '[name].[hash].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({cleanBeforeEveryBuildPatterns: ['./dist/client']}),
    new webpack.DefinePlugin(
      mapValues(
        {
          ...process.env,
          ['process.env.NODE_ENV']: 'production',
        },
        v => JSON.stringify(v),
      ),
    ),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html',
      TAGMANAGER_SCRIPT: `<script>${getGoogleTagManagerScript(
        process.env.GOOGLE_TAGMANAGER_ID || '',
      )}</script>`,
      TAGMANAGER_NOSCRIPT: `<noscript>${getGoogleTagManagerNoScript(
        process.env.GOOGLE_TAGMANAGER_ID || '',
      )}</noscript>`,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(context, 'assets/images/favicon.png'),
      prefix: 'favicon-v2-[hash]/',
    }),
    new ChunkFilePlugin(),
    new MomentTimezoneDataPlugin({
      matchZones: 'Europe/Helsinki',
      startYear: 2000,
    }),
  ],
});
