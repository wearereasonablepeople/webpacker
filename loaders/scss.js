'use strict';

const cssnext = require('postcss-cssnext');
const transitions = require('postcss-will-change-transition');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractFn = env => env === 'production'
  ? use => ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use
  })
  : x => x.unshift('style-loader') && x;

const postcss = (dotFile = {}) => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      cssnext(dotFile.cssnextOpts),
      transitions
    ]
  }
});

const getLocalIdentName = env => env === 'production'
? '[path]___[name]__[local]___[hash:base64:5]'
: '[path]___[name]__[local]'

module.exports = ({env, cwd, dotFile}) => [
  {
    test: /\.css$/,
    loader: extractFn(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: getLocalIdentName(env)
        }
      },
      postcss(dotFile),
    ])
  },
  {
    test: /\.scss$/,
    loader: extractFn(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          camelCase: 'dashes',
          localIdentName: getLocalIdentName(env)
        }
      },
      postcss(dotFile),
      {
        loader: 'sass-loader',
        options: {
          data: `
            @import "variables";
            ${fs.existsSync(dotFile.customVariables) ? '@import "customVariables";' : ''}
          `,
          includePaths: [
            path.join(cwd, dotFile.scss || '/src/scss'),
            dotFile.customVariables,
          ]
        }
      }
    ])
  }
];
