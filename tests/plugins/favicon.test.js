const path = require('path');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const {favicon} = require('../../plugins');

describe('FAVICON plugin', () => {

  it('should return the nothing if no options are provided', () => {
    const faviconPlugin = favicon({
      cwd: __dirname,
    });
    expect(faviconPlugin).toBe(null);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to pass a path to logo property', () => {
      const faviconPlugin = favicon({
        logo: path.join(__dirname, 'fakeFolder'),
      });

      const expected = {
        options: {
          logo: path.join(__dirname, 'fakeFolder'),
          cache: true,
          inject: true,
          prefix: 'meta/',
          favicons: {
            scope: '/',
            background: '#fff',
            //eslint-disable-next-line camelcase
            theme_color: '#fff',
            icons: {
              android: false,
              appleIcon: false,
              appleStartup: false,
              coast: false,
              favicons: true,
              firefox: false,
              windows: false,
              yandex: false
            }
          }
        }
      };

      expect(faviconPlugin.options).toEqual(expected.options);
      expect(faviconPlugin).toBeInstanceOf(WebappWebpackPlugin);
    });
  });
});
