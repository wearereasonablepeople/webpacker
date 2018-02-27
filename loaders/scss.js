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

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      cssnext(),
      transitions
    ]
  }
};

module.exports = ({env, cwd, dotFile}) => [
  {
    test: /\.css$/,
    loader: extractFn(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      },
      postcss,
    ])
  },
  {
    test: /.scss$/,
    loader: extractFn(env)([
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          camelCase: 'dashes',
          localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
        }
      },
      postcss,
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
