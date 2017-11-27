'use strict';

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require('cssnano'),
  cssProcessorOptions: {discardComments: {removeAll: true}},
  canPrint: true
});
