'use strict';

const {flatMap} = require('lodash');
const path = require('path');

module.exports = config => {
  const additionalPresets = flatMap(config.dotFile.presets || [], preset =>
    require(preset[0] === '.' ? path.resolve(config.cwd, preset) : `./${preset}`)(config)
  );

  const exludePatterns = additionalPresets.map(preset => preset.test);

  return additionalPresets.concat([
    {
      test: /\.ejs$/,
      loader: 'ejs-loader'
    },
    {
      exclude: exludePatterns.concat([
        /\.html$/,
        /\.ejs$/,
        /\.json$/,
        /\.svg$/,
      ]),
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
