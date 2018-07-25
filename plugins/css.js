const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({devServer}) => !devServer && new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});
