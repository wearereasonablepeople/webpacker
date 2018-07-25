module.exports = ({excludePattern = /node_modules/, plugins = [], presets = []}) => ({
  test: /\.(jsx?)$/,
  exclude: excludePattern,
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
      require('babel-preset-stage-2'),
      ...presets
    ],
    plugins: [
      require('babel-plugin-transform-decorators-legacy').default,
      ...plugins
    ]
  }
});
