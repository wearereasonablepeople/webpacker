const {jsFeatures} = require('./loaders/utils');

module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: jsFeatures(),
};
