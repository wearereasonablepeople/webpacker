const path = require('path');
const {setLoader, setPlugin} = require('../../utils');

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  preset: {
    loaders: [
      setLoader('react'),
    ],
    plugins: [
      setPlugin('html'),
      setPlugin('favicon', {logo:  path.join(__dirname, 'src/favicon.png')})
    ],
  }
};
