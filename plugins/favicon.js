'use strict';

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = ({cwd, dotFile}) => dotFile.favicon && new FaviconsWebpackPlugin({
  ...dotFile.favicon,
  logo: path.resolve(cwd, dotFile.favicon.logo),
});
