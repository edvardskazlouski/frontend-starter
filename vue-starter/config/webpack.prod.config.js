const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackCommonConfig = require('./webpack.common.config');
const dotenv = require('dotenv');

const config = dotenv.config().parsed;
const appPath = path.resolve(__dirname, '../', config.NODE_PATH);

module.exports = {
  entry: WebpackCommonConfig.entry,
  output: WebpackCommonConfig.output,
  module: WebpackCommonConfig.module,
  resolve: WebpackCommonConfig.resolve,
  plugins: WebpackCommonConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ])
};