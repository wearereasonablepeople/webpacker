const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = ({analyzeBundle}) => analyzeBundle ? new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  defaultSizes: 'gzip',
}) : null;
