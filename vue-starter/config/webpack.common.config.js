const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');

const config = dotenv.config().parsed;
const appPath = path.resolve(__dirname, '../', config.NODE_PATH);

module.exports = {
  entry: [
    path.resolve(__dirname, appPath, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.vue/, use: 'vue-loader' },
      { test: /\.s[a|c]ss$/, use: 'style-loader!css-loader!sass-loader' }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, appPath)
    ],
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, appPath, 'views/index.html') }),
  ]
};