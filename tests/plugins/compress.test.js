const compress = require('../../plugins/compress');

describe('Compression plugin', () => {
  const defaults = {
    options: {
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024 * 10
    },
  };

  it('should return the plugin with default values', () => {
    expect(compress({})).toMatchObject(defaults);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to enable devServer and disable compression', () => {
      expect(compress({devServer: true})).toBe(null);
    });
  });
});
