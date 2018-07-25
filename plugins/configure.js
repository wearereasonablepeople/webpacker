const webpack = require('webpack');

module.exports = ({env, constants}) => new webpack.EnvironmentPlugin({
  NODE_ENV: env || 'development',
  ...constants,
});
