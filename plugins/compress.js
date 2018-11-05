const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ({isDevServer, threshold = 0}) => !isDevServer ? new CompressionPlugin({
  test: /\.js$|\.css$|\.svg$|\.json$|\.html$/,
  threshold
}) : null;

