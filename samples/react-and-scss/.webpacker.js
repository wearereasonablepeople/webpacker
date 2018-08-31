const path = require('path');
const {setLoader, setPlugin} = require('../../utils');

const scssVariables = path.join(__dirname, 'src/variables.scss');

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  preset: {
    loaders: [
      setLoader('react'),
      setLoader('css'),
      setLoader('scss', {scssVariables}),
    ],
    plugins: [
      setPlugin('html'),
      setPlugin('css'),
    ],
  }
};
