const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = () => ({
  minimizer: [
    new UglifyJsPlugin({
      sourceMap: false,
      parallel: true,
      uglifyOptions: {
        compress: {
          inline: false
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  runtimeChunk: 'single',
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
});