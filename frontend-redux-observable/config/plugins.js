const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../src/templates/index.html'),
  }),
  new CleanWebpackPlugin([
    path.resolve(__dirname, '../dist')
  ]),
];
