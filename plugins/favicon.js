const WebappWebpackPlugin = require('webapp-webpack-plugin');
const path = require('path');

const defaultIcons = {
  android: false,
  appleIcon: false,
  appleStartup: false,
  coast: false,
  favicons: true,
  firefox: false,
  windows: false,
  yandex: false
};

module.exports = ({
  cwd,
  logo,
  background = '#fff',
  theme_color = '#fff',
  prefix = 'meta/',
  icons = {}
}) => logo
  ? new WebappWebpackPlugin({
    logo: path.isAbsolute(logo) ? logo : path.join(cwd, logo),
    cache: true,
    inject: true,
    prefix,
    favicons: {
      background,
      theme_color,
      scope: '/',
      icons: {
        ...defaultIcons,
        ...icons
      },
    }
  }) : null;
