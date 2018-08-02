const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({copy}) => copy ? new CopyWebpackPlugin(copy) : null;
