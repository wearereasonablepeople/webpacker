const clean = require('../../plugins/clean');

describe('Clean plugin', () => {
  const defaults = {
    dry: false,
    cleanStaleWebpackAssets: true,
    protectWebpackAssets: true,
  };

  it('should return the plugin with default values', () => {
    expect(clean()).toEqual(expect.objectContaining(defaults));
  });

  describe('receives an options object to customize the config', () => {
    it('allows to simulate the removal of files', () => {
      // Verbose is always enabled when dry is true
      expect(clean({dry: true})).toEqual(
        expect.objectContaining({
          dry: true,
          verbose: true,
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: true,
        }),
      );
    });

    it('allows to disable the automatic removal of all unused webpack assets on rebuild', () => {
      expect(clean({cleanStaleWebpackAssets: false})).toEqual(
        expect.objectContaining({
          dry: false,
          verbose: false,
          cleanStaleWebpackAssets: false,
          protectWebpackAssets: true,
        }),
      );
    });

    it('allows to unblock the removal of current webpack assets', () => {
      expect(clean({protectWebpackAssets: false})).toEqual(
        expect.objectContaining({
          dry: false,
          verbose: false,
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false,
        }),
      );
    });

    it('Disallows the use of dangerous options', () => {
      const dangerousOptions = {
        cleanOnceBeforeBuildPatterns: ['customBeforePattern'],
        cleanAfterEveryBuildPatterns: ['customAfterPattern'],
        dangerouslyAllowCleanPatternsOutsideProject: true,
      };

      expect(clean(dangerousOptions)).not.toEqual(
        expect.objectContaining(dangerousOptions),
      );
    });
  });
});
