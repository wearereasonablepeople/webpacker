'use strict';

/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const {stats, resolvePlugins, resolveConfig} = require('./configHelpers');
const loaders = require('./loaders');

module.exports = argv => {
  const config = resolveConfig(argv);
  const plugins = resolvePlugins(config);

  console.log(chalk.white.bgBlack(`Building for ${chalk.bold(config.env)} environment`), '\n');

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
      path: path.isAbsolute(config.dotFile.output)
        ? config.dotFile.output
        : path.join(config.cwd, (config.dotFile.output || 'build'))
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
