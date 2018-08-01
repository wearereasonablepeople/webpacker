const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, cssnextOpts = {}}) => [
  {
    test: /\.css$/,
    loader: extractCssPlugin(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[path]___[name]__[local]',
        }
      },
      postcss({cssnextOpts}),
    ])
  },
];
