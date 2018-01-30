const webpack = require('webpack');
const WebpackProdConfig = require('../config/webpack.prod.config');

webpack(WebpackProdConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    return console.log(stats);
  }
  console.log('compiling success');
});
