const compress = require('../../plugins/compress');

describe('Compression plugin', () => {
  const defaults = {
    options: {
      test: /\.js$|\.css$|\.svg$|\.json$|\.html$/,
      threshold: 0
    },
  };

  it('should return the plugin with default values', () => {
    expect(compress({})).toMatchObject(defaults);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to enable isDevServer and disable compression', () => {
      expect(compress({isDevServer: true})).toBe(null);
    });
  });
});
