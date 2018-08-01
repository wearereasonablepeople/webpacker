const path = require('path');
const {setLoader, setPlugin} = require('../../utils');

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  preset: {
    loaders: [
      setLoader('react'),
      setLoader('css'),
      setLoader('scss', { useScssVariables: true }), // It will require variables.scss
    ],
    plugins: [
      setPlugin('html'),
      setPlugin('css'),
    ],
  }
};
