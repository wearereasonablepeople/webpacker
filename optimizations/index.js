const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ({
  runtimeChunk = 'single',
  splitChunks = {
    chunks: 'all',
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
} = {}) => ({
  minimizer: [
    new TerserPlugin({
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ],
  runtimeChunk,
  splitChunks,
});
