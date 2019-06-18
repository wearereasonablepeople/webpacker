const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, postcssOpts, exclude, include}) => ({
  test: /\.css$/,
  exclude,
  include,
  loader: extractCssPlugin(env)([
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[path]___[name]__[local]',
      }
    },
    postcss(postcssOpts),
  ])
});
