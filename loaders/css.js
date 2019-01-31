const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, postcssOpts, exclude = /node_modules/}) => ({
  test: /\.css$/,
  exclude,
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
