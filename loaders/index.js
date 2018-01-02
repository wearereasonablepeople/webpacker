'use strict';

const {flatMap} = require('lodash');

module.exports = config => {
  const additionalPresets = flatMap(config.dotFile.presets || [], preset =>
    require(`./${preset}`)(config)
  );

  return additionalPresets.concat([
    {
      test: /\.ejs$/,
      loader: 'ejs-loader'
    },
    {
      exclude: [
        /\.html$/,
        /\.ejs$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.scss$/,
        /\.json$/,
        /\.svg$/
      ],
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
    {
      test: /\.svg$/,
      loader: 'file-loader',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }
    // ** STOP ** Are you adding a new loader?
    // Remember to add the new extension(s) to the "url" loader exclusion list.
  ]);
};
