'use strict';

const path = require('path');
const {mapValues, isString, isObject, isArray} = require('lodash');

const quote = config => mapValues(config, entry =>
  isString(entry)
    ? `'${entry}'`
    : isArray(entry) || isObject(entry)
      ? quote(entry)
      : entry
);

module.exports = ({env, cwd, dotFile}) =>
  quote(require(path.join(cwd, (dotFile.config || 'config'), `${env}.js`)));
