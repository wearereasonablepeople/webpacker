const path = require('path');
const webpack = require('webpack');
const ramdaPlugin = require('babel-plugin-ramda').default;
const {setLoader, setPlugin} = require('../../utils');
const env = `${process.env.NODE_ENV || 'development'}`;

const port = 4000;
const host = '0.0.0.0';


const index = path.resolve(__dirname, './src/index.js');

module.exports = {
  devServer: fn => fn({port, host, hot: true}),
  entry: () => process.env.NODE_ENV === 'production'
    ? index
    : [
      index,
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://${host}:${port}/`,
    ],
  output: fn => fn({
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js'
  }),
  preset: {
    loaders: [
      setLoader('react', {
        plugins: [
          [ramdaPlugin, {'useES': true}],
        ],
        presets: [
          '@emotion/babel-preset-css-prop'
        ]
      }),
      setLoader('css'),
    ],
    plugins: [
      setPlugin('css'),
      setPlugin('html', {index: path.join(__dirname, './src/index.html')}),
      setPlugin('compress', {threshold: 0}),
      () => env === 'development' ? new webpack.SourceMapDevToolPlugin({}) : null,
      ({isDevServer}) => isDevServer && new webpack.HotModuleReplacementPlugin(),
    ],
  },
};
