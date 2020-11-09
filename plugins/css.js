const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({isDevServer}) => !isDevServer ? new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',
  chunkFilename: '[id].[contenthash].css',
}) : null;
