const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {stats} = require('../../plugins');

describe('STATS plugin', () => {
  it('should return the defaults if no options are provided', () => {
    expect(stats({})).toBe(null);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to active analyzeBundle', () => {
      const expected = expect.objectContaining({
        logger: {
          activeLevels: new Set(
            'info',
            'warn',
            'error',
            'silent'
          )
        },
        opts: {
          analyzerHost: '127.0.0.1',
          analyzerMode: 'static',
          analyzerPort: 8888,
          defaultSizes: 'gzip',
          excludeAssets: null,
          generateStatsFile: false,
          logLevel: 'info',
          openAnalyzer: true,
          reportFilename: 'report.html',
          startAnalyzer: true,
          statsFilename: 'stats.json',
          statsOptions: null
        },
        server: null
      });
      expect(stats({analyzeBundle: true})).toMatchObject(expected);
      expect(stats({analyzeBundle: true})).toBeInstanceOf(BundleAnalyzerPlugin);
    });
  });
});
