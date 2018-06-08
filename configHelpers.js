'use strict';

const fs = require('fs');
const path = require('path');
const {pick} = require('lodash');
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

const processDotFile = (c, config) =>
  typeof c === 'function' ? c(config) : c;

const resolveDotFile = config => {
  const p = path.join(config.cwd, '.webpacker');
  try {
    const c = require(`${p}`);
    return processDotFile(c, config);
  } catch(e) {
    return require(`${p}.json`);
  }
};

const resolvePlugins = config =>
  fs.readdirSync(pluginsDir).map(file =>
    require(`${pluginsDir}/${file}`)(config)
  ).filter(Boolean);

const resolveConfig = argv => {
  const config = Object.assign({
    env: 'development',
    stats: false,
    devServer: false,
    cwd: process.cwd()
  }, argv);

  return {
    ...config,
    dotFile: Object.assign({},
      !config.skipDotFile
        ? resolveDotFile(config) || {modules: [`${config.cwd}/node_modules`]}
        : {},
      pick(
        config,
        ['index', 'entry', 'app', 'config', 'output', 'scss', 'presets', 'customVariables', 'disableHash']
      )
    )
  };
};

module.exports = {
  stats,
  resolveDotFile,
  resolvePlugins,
  resolveConfig,
};
