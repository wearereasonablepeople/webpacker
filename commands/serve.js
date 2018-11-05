/* eslint-disable no-console */
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const handler = (argv = {}) => {
  const {getConfig} = require('../getConfig');
  const config = getConfig({isDevServer: true, ...argv});
  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, {
    stats: config.stats,
    ...config.devServer,
  });

  server.listen(config.devServer.port, config.devServer.host, () => {
    console.log(chalk.white.bgBlack(
      `Server running at ${chalk.bold(`http://${config.devServer.host}:${config.devServer.port}`)}`
    ));
  });
};

module.exports = {
  command: 'serve',
  describe: 'Start the webpack development server',
  builder: {},
  handler,
};
