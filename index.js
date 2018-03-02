'use strict';

const createConfig = require('./createConfig');

const defaults = {
  logStd: false,
  skipDotFile: true
};

module.exports = argv => createConfig(Object.assign({}, defaults, argv));
