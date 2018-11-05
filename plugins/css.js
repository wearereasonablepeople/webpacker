const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({isDevServer}) => !isDevServer ? new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
}) : null;
