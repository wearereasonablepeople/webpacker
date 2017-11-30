'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = ({cwd, dotFile}) => new HtmlWebpackPlugin({
  template: path.join(cwd, (dotFile.index || 'public/index.ejs')),
  chunks: ['app'],
  hash: false,
  baseHref: '/',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});
