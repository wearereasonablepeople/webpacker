const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = ({
  dry = false,
  cleanStaleWebpackAssets = true,
  protectWebpackAssets = true,
} = {}) => new CleanWebpackPlugin({dry, cleanStaleWebpackAssets, protectWebpackAssets});
