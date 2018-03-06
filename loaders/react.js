'use strict';

module.exports = ({dotFile}) => ({
  test: /\.(js|jsx)$/,
  exclude: (dotFile.react && dotFile.react.excludePattern) || /node_modules/,
  loader: 'babel-loader',
  query: {
    babelrc: false,
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
