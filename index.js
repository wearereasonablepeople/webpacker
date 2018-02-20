'use strict';

/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const loaders = require('./loaders');
const pluginsDir = path.join(__dirname, 'plugins');

//Control log levels
const stats = {
  excludeAssets: name => !name.includes('bundle.js'),
  chunks: false,
  children: false,
  colors: true,
  errors: true,
  hash: false,
  maxModules: 0,
  modules: false,
  moduleTrace: false,
  timings: true,
  version: true,
  warnings: true,
};

module.exports = argv => {

  const config = Object.assign({
    env: 'development',
    stats: false,
    devServer: false,
    cwd: process.cwd()
  }, argv);
  config.dotFile = require(path.join(config.cwd, '.webpacker.json')) || {
    modules: [`${config.cwd}/node_modules`]
  };

  console.log(chalk.white.bgBlack(`Building for ${chalk.bold(config.env)} environment`), '\n');

  const plugins = fs.readdirSync(pluginsDir).map(file =>
    require(`${pluginsDir}/${file}`)(config)
  ).filter(Boolean);

  const entry = {
    app: ['babel-polyfill', path.join(config.cwd, (config.dotFile.entry || 'src/index.js'))],
  };

  return {
    bail: config.env === 'production',
    devtool: (config.devServer || config.sourcemap) && 'sourcemap',
    entry,
    output: {
      filename: `[name].bundle.js`,
      publicPath: '/',
      path: path.join(config.cwd, (config.dotFile.output || 'build'))
    },
    devServer: {
      contentBase: config.cwd,
      compress: true,
      historyApiFallback: true,
      publicPath: '/',
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 4000,
      stats,
    },
    stats,
    plugins,
    module: {
      rules: loaders(config),
    },
    resolve: {
      modules: config.dotFile.modules
    }
  };
};
