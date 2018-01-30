const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const WebpackDevConfig = require('../config/webpack.dev.config');
const WebpackDevServerConfig = require('../config/webpack.dev.server.config');
const dotenv = require('dotenv');

const config = dotenv.config;
const compiler = webpack(WebpackDevConfig);

const devServer = new WebpackDevServer(compiler, WebpackDevServerConfig);
const port = parseInt(process.env.PORT || config.PORT, 10) || 3000;
const host = process.env.HOST || config.HOST || '0.0.0.0';

devServer.listen(port, host, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Starting the development server.');
});