#!/usr/bin/env node
/* eslint-disable no-console */

'use strict';

const {execSync} = require('child_process');
const chalk = require('chalk');
const path = require('path');
const {map, omit} = require('lodash');
const pkg = require('../package.json');
const yargs = require('yargs');
const ya = yargs.argv;
const platform = require('os').platform();

const silentError = chalk.red(`
Webpacker exited with an error.
To log this error, pass --verbose when executing webpacker.
`);

const createArg = (val, arg) => `--env.${arg}=${val}`;
const listArgs = args => map(args, createArg).join(' ');
const resolveEnv = def =>
  process.env.NODE_ENV || ya.environment || (ya.env && ya.env.environment) || def;
const nodeEnv = env =>
  platform === 'win32' ? `set NODE_ENV=${resolveEnv(env)} &&` : `NODE_ENV=${resolveEnv(env)}`;
const createCmd = (cmd, defEnv, envVars) =>
  `${nodeEnv(defEnv)} ${cmd} -- ${envVars} ${createArg(resolveEnv(defEnv), 'env')}`;

const envCwd = createArg(process.cwd(), 'cwd');
const envArgs = listArgs(omit(ya, ['_', '$0', 'env']));
// If webpacker is run from another (child) process, their envs will be passed as 'env'
const outerEnvs = listArgs(omit(ya.env, ['cwd']));
const envVars = `${envCwd} ${envArgs} ${outerEnvs}`;

if(ya._ && ya._.length) {
  const cmds = {
    serve: createCmd('npm start', 'development', envVars),
    build: createCmd('npm run build', 'production', envVars)
  };
  const cmd = cmds[ya._];
  if(!cmd) {
    console.log(chalk.red('Command not found'));
    return process.exit(0);
  }
  try {
    execSync(cmd, {cwd: path.join(__dirname, '..'), stdio: 'inherit'});
    console.log(chalk.green('Thank you for using webpacker! :)'));
    return process.exit(0);
  } catch(e) {
    if(ya.verbose || (ya.env && ya.env.verbose)) {
      console.error(e);
      return process.exit(1);
    }
    console.log(silentError);
    return process.exit(0);
  }
}
console.log(`Current version: ${pkg.version}`);
return process.exit(0);
