'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({dotFile}) => dotFile.copy && new CopyWebpackPlugin(dotFile.copy);
