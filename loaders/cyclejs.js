const {jsFeatures} = require('./utils');

module.exports = ({excludePattern = /node_modules/, plugins = [], presets = []}) => ({
  test: /\.(jsx?)$/,
  exclude: excludePattern,
  loader: 'babel-loader',
  query: {
    babelrc: false,
    presets: [
      ['@babel/preset-env', {
        debug: false,
        targets: {browsers: ['last 2 versions']},
        loose: true,
        modules: false
      }],
      ...presets
    ],
    plugins: [
      ...jsFeatures(),
      ...plugins
    ]
  }
});
