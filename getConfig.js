/* eslint-disable no-console */
const path = require('path');
const optimizations = require('./optimizations');
const {stats} = require('./plugins');
const chalk = require('chalk');
const {applyLoaders} = require('./loaders/utils');

const resolveConfigFile = args => {
  try {
    const p = !args.config
      ? `${process.cwd()}/.webpacker`
      : path.isAbsolute(args.config)
        ? args.config
        : path.join(process.cwd(), args.config);
    return require(p);
  } catch(e) {
    console.error(e);
    throw new Error('No config file found.');
  }
};

// Check if the config file is valid
const checkValidity = configFile => {
  if(!configFile.preset) {
    throw new Error('No preset defined, please define a preset');
  }
  const keys = [
    'devServer',
    'resolve',
    'entry',
    'output',
    'module',
    'plugins',
  ];
  keys.forEach(key => {
    if(configFile[key] && typeof configFile[key] !== 'function') {
      throw new Error(`Config option '${key}' was defined but is not a function.`);
    }
  });
};

const logIntro = config => {
  console.log(chalk.white.bgBlack(`Welcome to ${chalk.bold('webpacker')}!`));
  console.log(chalk.white.bgBlack(`Building for ${chalk.bold(config.env)} environment`));
};

// Using webpack-dev-server here
const devServer = ({
  port = 3000,
  host = '0.0.0.0',
  ...args
} = {}) => ({
  host,
  port,
  historyApiFallback: true,
  ...args
});

const entry = (ent = './src/index.js', cwd = process.cwd()) => path.resolve(cwd, ent);

const optimization = op => optimizations(op);

const defaultPath = path.resolve(process.cwd(), 'dist');
const output = (out = {}) => ({
  ...out,
  path: out.path || defaultPath,
  filename: out.filename ||
            (process.env.NODE_ENV === 'production' ? '[name].[contenthash].js' : '[name].js'),
});

const resolve = r => ({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  ...r,
});

const devtool = mode => mode || process.env.NODE_ENV === 'development' ? 'eval' : false;

const node = node => node || {};

const checkFile = configFile => (key, fn) =>
  typeof configFile[key] === 'function' ? configFile[key](fn) : fn();

const getConfig = args => {
  const baseConfig = {
    mode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'development'
      : 'production',
    //Control log levels
    stats: {
      excludeAssets: name => !name.endsWith('.js'),
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
    },
    performance: {
      hints: false,
    }
  };

  const configFile = resolveConfigFile(args);

  checkValidity(configFile);

  const config = {
    ...baseConfig,
    env: process.env.NODE_ENV || 'development',
    cwd: process.cwd(),
    ...args,
    ...configFile,
  };

  const checkOption = checkFile(configFile);
  config.env !== 'test' && logIntro(config);

  const moduleRules = () => ({
    rules: applyLoaders(config.preset.loaders.map(x => x(config))),
  });

  const plugins = () => config.preset.plugins.concat([stats]).map(x => x(config)).filter(Boolean);

  return {
    ...baseConfig,
    node: checkOption('node', node),
    devtool: checkOption('devtool', devtool),
    devServer: checkOption('devServer', devServer),
    entry: checkOption('entry', entry),
    output: checkOption('output', output),
    module: checkOption('module', moduleRules),
    plugins: checkOption('plugins', plugins),
    optimization: checkOption('optimization', optimization),
    resolve: checkOption('resolve', resolve),
    // Make sure webpacker uses its own node_modules when trying to resolve loaders
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
    },
  };
};

module.exports = {
  getConfig,
};
