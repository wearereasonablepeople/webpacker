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

module.exports = ({cwd, env, dotFile}) => [
  {
    test: /\.ejs$/,
    loader: 'ejs-loader'
  },
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
  },
  {
    exclude: [
      /\.html$/,
      /\.ejs$/,
      /\.(js|jsx)$/,
      /\.css$/,
      /\.scss$/,
      /\.json$/,
      /\.svg$/
    ],
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: 'static/media/[name].[hash:8].[ext]'
    }
  },
  {
    test: /\.(js|jsx)$/,
    // include: path.join(cwd, dotFile.app || 'src'),
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        ['env', {
          debug: false,
          targets: {browsers: ['last 2 versions']},
          loose: true,
          modules: false
        }],
        require('babel-preset-react'),
        require('babel-preset-stage-2'),
      ],
      plugins: [
        require('react-hot-loader/babel'),
        require('babel-plugin-react-css-modules').default,
        'lodash'
      ]
    }
  },
  {
    test: /\.svg$/,
    loader: 'file-loader',
    query: {
      name: 'static/media/[name].[hash:8].[ext]'
    }
  }
  // ** STOP ** Are you adding a new loader?
  // Remember to add the new extension(s) to the "url" loader exclusion list.
];
