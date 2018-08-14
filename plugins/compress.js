const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({devServer}) => !devServer ? new CompressionPlugin({
  test: /\.js$|\.css$|\.html$/,
  threshold: 1024 * 10
}) : null;

