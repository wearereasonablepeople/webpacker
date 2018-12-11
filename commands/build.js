/* eslint-disable no-console */
const webpack = require('webpack');

const handler = (argv = {}) => {
  const {getConfig} = require('../getConfig');
  const config = getConfig(argv);
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if(err) {
      throw new Error(err);
    }
    console.log(stats.toString(config.stats));
  });
};

module.exports = {
  // $0 ensures that build will be the default command
  command: ['build', '$0'],
  describe: 'Run the webpack build process',
  builder: {},
  handler,
};
