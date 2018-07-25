const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = ({cwd, logo}) => logo && new FaviconsWebpackPlugin({
  logo: path.isAbsolute(logo) ? logo : path.join(cwd, logo),
  persistentCache: true,
  inject: true,
  background: '#fff',
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: false
  }
});
