'use strict';

module.exports = () => ({
  test: /\.(js|jsx)$/,
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
      require('babel-preset-stage-2'),
    ],
    plugins: [
      'lodash'
    ]
  }
});
