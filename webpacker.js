const path = require('path');
const yargs = require('yargs');

const cliArgs = [
  {
    name: 'version',
    short: 'v',
    description: 'Show version number',
  },
  {
    name: 'config',
    short: 'c',
    description: 'Path to config file',
    default: path.join(process.cwd(), '.webpacker.js'),
  }
];

yargs.commandDir('./commands');

cliArgs.forEach(({name, short, description = ''}) =>
  yargs
  .alias(name, short)
  .describe(name, description)
);

const args = yargs.parse();

module.exports = {
  args,
  cliArgs,
};
