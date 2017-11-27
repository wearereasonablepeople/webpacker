'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = ({cwd}) => new HtmlWebpackPlugin({
  template: path.join(cwd, 'public/index.ejs'),
  chunks: ['app'],
  hash: false,
  baseHref: '/',
});
