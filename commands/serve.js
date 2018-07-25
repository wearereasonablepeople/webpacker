/* eslint-disable no-console */
const serve = require('webpack-serve');

const handler = (argv = {}) => {
  const {getConfig} = require('../getConfig');
  const config = getConfig({devServer: true, ...argv});
  //eslint-disable-next-line no-unused-vars
  const {$0, _, ...args} = argv;
  return serve(
    {
      ...args,
      logLevel: 'silent',
      clipboard: false,
    },
    {
      config,
      on: {
        'build-started': () => console.log('\nBuild started...\n'),
        'build-finished': ({stats}) => console.log(stats.toString(config.stats)),
      },
    }
  );
};

module.exports = {
  command: 'serve',
  describe: 'Start the webpack development server',
  builder: {},
  handler,
};
