const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const plugin = () => new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  defaultSizes: 'gzip',
});

module.exports = ({analyzeBundle}) => analyzeBundle && plugin();
