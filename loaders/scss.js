const path = require('path');
const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, cwd, scssPath, cssnextOpts}) => [
  {
    test: /\.scss$/,
    loader: extractCssPlugin(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          camelCase: 'dashes',
          localIdentName: '[path]___[name]__[local]',
        }
      },
      postcss({cssnextOpts}),
      {
        loader: 'sass-loader',
        options: {
          data: `
            @import "variables";
          `,
          includePaths: [
            path.join(cwd, scssPath || '/src/scss'),
          ]
        }
      }
    ])
  }
];
