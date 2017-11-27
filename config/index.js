'use strict';

const {mapValues, isString, isObject, isArray} = require('lodash');

const quote = config => mapValues(config, entry =>
  isString(entry)
    ? `'${entry}'`
    : isArray(entry) || isObject(entry)
      ? quote(entry)
      : entry
);

module.exports = ({env}) => quote(require(`./${env}.js`));
