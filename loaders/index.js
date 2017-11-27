'use strict';

const cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractFn = env => env === 'production'
  ? use => ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use
  })
  : x => x.unshift('style-loader') && x;

module.exports = ({cwd, env, devServer}) => [
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
            `${cwd}/src/scss`
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
  devServer
    ? {
      test: /\.(js|jsx)$/,
      include: `${cwd}/src`,
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: [
          'react-hot-loader/babel',
          'babel-plugin-react-css-modules'
        ]
      }
    } : {
      test: /\.(js|jsx)$/,
      include: `${cwd}/src`,
      loader: 'babel-loader',
      query: {
        plugins: ['babel-plugin-react-css-modules']
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
