'use strict';

const path = require('path');

const getConfig = p => {
  try {
    return require(p);
  } catch(e) {
    return {};
  }
};

module.exports = config => {
  const p = path.join(config.cwd, (config.dotFile.config || 'config'), `${config.env}.js`);
  const confFile = getConfig(p);
  if(typeof confFile === 'function') {
    try {
      return confFile(config);
    } catch (e) {
      console.error(e);
    }
  }
  return confFile;
};
