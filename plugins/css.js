'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = ({devServer}) => !devServer && new ExtractTextPlugin('app.css');
