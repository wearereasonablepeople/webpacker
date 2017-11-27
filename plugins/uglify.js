'use strict';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = ({env}) => env === 'production' && new UglifyJSPlugin({
  uglifyOptions: {
    ecma: 8,
    ie8: false,
    output: {
      comments: false,
    },
  },
});
