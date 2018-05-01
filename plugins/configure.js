'use strict';

const webpack = require('webpack');
const createConfig = require('../config');

module.exports = config => new webpack.EnvironmentPlugin({
  NODE_ENV: config.env || 'development',
  ...createConfig(config),
  __: {...config}
});
