const {flatten} = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const transitions = require('postcss-will-change-transition');

const extractCssPlugin = env => env === 'production'
  ? use => [MiniCssExtractPlugin.loader, ...use]
  : use => ['style-loader', ...use];

const postcss = opts => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => opts || [transitions]
  }
});

const applyLoaders = (loaders = []) => {
  const flatLoaders = flatten(loaders);

  const exludePatterns = flatLoaders.map(preset => preset.test);

  return flatLoaders.concat([
    {
      exclude: exludePatterns.concat([
        /\.html$/,
        /\.json$/,
        /\.mjs$/,
      ]),
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: 'static/media/[name].[hash:8].[ext]',
        publicPath: url => url
      }
    },
  ]);
};

const jsFeatures = () => [
  // old Stage 1
  require('@babel/plugin-proposal-export-default-from').default,

  // old Stage 2
  [require('@babel/plugin-proposal-decorators').default, {legacy: true}],

  // old Stage 3
  require('@babel/plugin-syntax-dynamic-import').default,
  require('@babel/plugin-syntax-import-meta').default,
  [require('@babel/plugin-proposal-class-properties').default, {loose: false}],
  require('@babel/plugin-proposal-json-strings').default,
];

module.exports = {
  applyLoaders,
  extractCssPlugin,
  postcss,
  jsFeatures
};
