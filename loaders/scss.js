const path = require('path');
const {extractCssPlugin, postcss} = require('./utils');

module.exports = ({env, cwd, scssPath, useScssVariables, postcssPresetEnvOptions}) => [
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
      postcss({postcssPresetEnvOptions}),
      {
        loader: 'sass-loader',
        options: {
          data: `
            ${useScssVariables && `@import "variables";`}
          `,
          includePaths: [
            path.join(cwd || process.cwd(), scssPath || '/src/scss'),
          ]
        }
      }
    ])
  }
];
