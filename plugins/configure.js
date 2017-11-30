'use strict';

const webpack = require('webpack');
const createConfig = require('../config');

module.exports = config => new webpack.DefinePlugin({
  environment: createConfig(config),
});
