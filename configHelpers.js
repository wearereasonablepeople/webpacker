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

const resolveDotFile = cwd => {
  const p = path.join(cwd, '.webpacker');
  try {
    return require(`${p}`);
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
      resolveDotFile(config.cwd) || {modules: [`${config.cwd}/node_modules`]},
      pick(
        config,
        ['index', 'entry', 'app', 'config', 'output', 'scss', 'presets', 'customVariables']
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
