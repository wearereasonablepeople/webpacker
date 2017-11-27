'use strict';

const webpack = require('webpack');
const createConfig = require('../config');

module.exports = ({env}) => new webpack.DefinePlugin({
  environment: createConfig({env}),
});
