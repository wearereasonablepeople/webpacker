const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, postcssOpts}) => ({
  test: /\.css$/,
  exclude: /node_modules/,
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
