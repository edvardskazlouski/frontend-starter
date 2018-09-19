const path = require('path');
const webpack = require('webpack');

const modules = require('./modules');
const resolve = require('./resolve');
const plugins = require('./plugins');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },

  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true
  },

  plugins: plugins.concat(new webpack.HotModuleReplacementPlugin()),

  module: modules,

  resolve,

  devtool: 'inline-source-map',

  performance: { hints: false },

  mode: 'development',
};
