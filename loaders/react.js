'use strict';

module.exports = () => ({
  test: /\.(js|jsx)$/,
  // include: path.join(cwd, dotFile.app || 'src'),
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    presets: [
      ['env', {
        debug: false,
        targets: {browsers: ['last 2 versions']},
        loose: true,
        modules: false
      }],
      require('babel-preset-react'),
      require('babel-preset-stage-2'),
    ],
    plugins: [
      require('babel-plugin-react-css-modules').default,
      require('babel-plugin-transform-decorators-legacy').default,
      require('babel-plugin-lodash')
    ]
  }
});
