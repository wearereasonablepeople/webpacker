'use strict';

const path = require('path');

module.exports = ({env, cwd, dotFile}) =>
  require(path.join(cwd, (dotFile.config || 'config'), `${env}.js`));
