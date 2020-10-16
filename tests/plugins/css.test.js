const {css} = require('../../plugins');

describe('CSS plugin', () => {
  const defaults = {
    options: {
      chunkFilename: '[id].[contenthash].css',
      filename: '[name].[contenthash].css'
    },
  };

  it('should return the plugin with default values', () => {
    expect(css({})).toMatchObject(defaults);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to enable isDevServer and disable minification', () => {
      expect(css({isDevServer: true})).toBe(null);
    });
  });
});
