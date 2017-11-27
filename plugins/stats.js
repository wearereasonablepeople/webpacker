'use strict';

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const plugin = () => new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  defaultSizes: 'gzip',
});

module.exports = ({stats}) => stats && plugin();
