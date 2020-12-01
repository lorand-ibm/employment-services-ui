import path from 'path';
import mapValues from 'lodash/mapValues';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';
import {browser as config} from './config';
import ChunkFilePlugin from './ChunkFilePlugin';
import MomentTimezoneDataPlugin from 'moment-timezone-data-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');
dotenv.config();
process.env.BABEL_ENV = 'development';

export default merge(config, {
  context: rootDir,
  mode: 'development',
  devtool: 'eval',
  entry: ['babel-polyfill', 'focus-visible', 'whatwg-fetch', 'delayed-scroll-restoration-polyfill', './src/index.js', './src/main.scss'],
  output: {
    path: path.join(rootDir, 'dist'),
    publicPath: `${process.env.FRONTEND_URL}/`,
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].js',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // need HMR for development, change to MiniCssExtractPlugin.loader when it supports HMR
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true,
    noInfo: true,
    quiet: true,
    stats: true,
    disableHostCheck: true,
  },

  plugins: [
    new webpack.DefinePlugin(
      mapValues(
        {
          ...process.env,
          ['process.env.NODE_ENV']: 'development',
        },
        v => JSON.stringify(v),
      ),
    ),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html',
      showErrors: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ChunkFilePlugin(),
    new MomentTimezoneDataPlugin({
      matchZones: 'Europe/Helsinki',
      startYear: 2000,
    }),
  ],
});
