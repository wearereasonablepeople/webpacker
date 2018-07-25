const loaders = require('../loaders');
const plugins = require('../plugins');
const optimizations = require('../optimizations');

const checkExists = (colType, col) => (collection, item) => {
  if(!collection[item]) {
    const available = Object.keys(collection).map(x => `'${x}'`).join(', ');
    throw new Error([
      `${colType} '${item}' not found`,
      `please use one of the following ${col}: [${available}]`
    ].join(', '));
  }
  return true;
};

const loaderExists = checkExists('Loader', 'loaders');
const pluginExists = checkExists('Plugin', 'plugins');
const optimizationExists = checkExists('Optimization', 'optimizations');

const apply = (checkFn, collection) => (item, args) => config =>
  checkFn(collection, item) && collection[item]({...config, ...args});

const setLoader = apply(loaderExists, loaders);
const setPlugin = apply(pluginExists, plugins);
const setOptimization = apply(optimizationExists, optimizations);

module.exports = {
  setLoader,
  setPlugin,
  setOptimization,
};
