const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const WebpackCommonConfig = require('./webpack.common.config');
const dotenv = require('dotenv');

const config = dotenv.config().parsed;
const appPath = path.resolve(__dirname, '../', config.NODE_PATH);

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000/'
  ].concat(WebpackCommonConfig.entry),
  output: Object.assign({}, WebpackCommonConfig.output, {
    publicPath: '/',
  }),
  module: WebpackCommonConfig.module,
  resolve: WebpackCommonConfig.resolve,
  plugins: WebpackCommonConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin()
  ])
};