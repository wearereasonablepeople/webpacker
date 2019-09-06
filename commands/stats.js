/* eslint-disable no-console */
const webpack = require('webpack');

const handler = (argv = {}) => {
  const {getConfig} = require('../getConfig');
  const config = getConfig({...argv, analyzeBundle: true});
  const compiler = webpack(config);
  compiler.run((_, stats) => console.log(stats.toString(config.stats)));
};

module.exports = {
  command: 'stats',
  describe: 'Run the webpack stats process, outputting bundle information',
  builder: {},
  handler,
};
