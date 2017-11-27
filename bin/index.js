#!/usr/bin/env node

'use strict';

const {execSync} = require('child_process');
const path = require('path');
const {size, map, omit} = require('lodash');
const chalk = require('chalk');
const pkg = require('../package.json');
const yargs = require('yargs');

const envCwd = `--env.cwd=${process.cwd()}`;
const envArgs = map(omit(yargs.argv, ['_', '$0']), (val, arg) => `--env.${arg}=${val}`).join(' ');
const nodeEnv = env => `NODE_ENV=${yargs.argv.env || env}`;

if(yargs.argv._ && yargs.argv._.length) {
  const cmds = {
    serve: `${nodeEnv('development')} npm start -- ${envCwd} ${envArgs}`,
    build: `${nodeEnv('production')} npm run build -- ${envCwd} ${envArgs} --env.env=production`,
  };
  const cmd = cmds[yargs.argv._];
  if(!cmd) {
    console.log('Command not found');
    return process.exit(1);
  }
  execSync(cmd, {cwd: path.join(__dirname, '..'), stdio: 'inherit'});
  console.log('Done');
} else {
  console.log(`Current version: ${pkg.version}`);
}
