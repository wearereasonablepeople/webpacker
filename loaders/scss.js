'use strict';

const cssnext = require('postcss-cssnext');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractFn = env => env === 'production'
  ? use => ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use
  })
  : x => x.unshift('style-loader') && x;

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
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [cssnext()]
        }
      },
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
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [cssnext()]
        }
      },
      {
        loader: 'sass-loader',
        options: {
          data: '@import "variables";',
          includePaths: [
            path.join(cwd, dotFile.scss || '/src/scss')
          ]
        }
      }
    ])
  }
];
