const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
          background: '#fff',
          emitStats: false,
          icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            windows: false,
            yandex: false
          },
          inject: true,
          logo: path.join(__dirname, 'fakeFolder'),
          persistentCache: true,
          prefix: 'icons-[hash]/',
          statsFilename: 'iconstats-[hash].json'
        }
      };

      expect(faviconPlugin).toEqual(expected);
      expect(faviconPlugin).toBeInstanceOf(FaviconsWebpackPlugin);
    });
  });
});
