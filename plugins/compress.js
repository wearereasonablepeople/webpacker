const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({devServer, threshold = 0}) => !devServer ? new CompressionPlugin({
  test: /\.js$|\.css$|\.svg$|\.json$|\.html$/,
  threshold
}) : null;

