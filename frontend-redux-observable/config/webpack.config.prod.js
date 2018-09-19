const path = require('path');
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

  plugins,

  module: modules,

  resolve,

  performance: { hints: false },

  mode: 'production',
};
