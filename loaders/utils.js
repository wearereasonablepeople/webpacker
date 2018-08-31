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

module.exports = {
  applyLoaders,
  extractCssPlugin,
  postcss,
};
