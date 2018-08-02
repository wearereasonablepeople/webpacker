/**
 * .webpacker.js for tests
 */

const path = require('path');
const loaders = require('../../loaders');
const plugins = require('../../plugins');
const {setLoader, setPlugin} = require('../../utils');

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'tests/webpacker')}),
  preset: {
    loaders: Object.keys(loaders).map(l => setLoader(l)),
    plugins: Object.keys(plugins).map(p => setPlugin(p)),
  }
};
