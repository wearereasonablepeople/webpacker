const configure = require('./configure');
const copy = require('./copy');
const clean = require('./clean');
const css = require('./css');
const favicon = require('./favicon');
const html = require('./html');
const stats = require('./stats');
const compress = require('./compress');
const lodash = require('./lodash');
const forkTsChecker = require('./fork-ts-checker');

module.exports = {
  configure,
  copy,
  clean,
  css,
  favicon,
  html,
  stats,
  compress,
  lodash,
  forkTsChecker,
};
