const path = require('path');
const {extractCssPlugin, postcss} = require('./utils');

module.exports = (
  {env, cwd, useScssVariables, postcssPresetEnvOptions, scssPath = '/src/scss'}) => (
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
            path.isAbsolute(scssPath) ? scssPath : path.join(cwd, scssPath)
          ]
        }
      }
    ])
  }
);
