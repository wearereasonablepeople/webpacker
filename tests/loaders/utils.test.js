const {applyLoaders} = require('../../loaders/utils');

describe('Loaders utils', () => {
  const defaultLoader = {
    exclude: [
      /\.html$/,
      /\.json$/,
      /\.mjs$/,
    ],
    loader: 'url-loader',
    query: {
      limit: 8192,
      name: 'static/media/[name].[hash:8].[ext]',
      publicPath: expect.any(Function)
    }
  };

  describe('.applyLoaders', () => {
    it('should return the default loader if no extra loader is provided', () =>
      expect(applyLoaders().pop()).toMatchObject(defaultLoader)
    );
    it('should flatten all the loaders in a single config', () => {
      const res = applyLoaders([[{test: /foo_bar/}]]);
      const {exclude} = defaultLoader;
      expect(res).toContainEqual({test: /foo_bar/});
      expect(res[1]).toMatchObject({
        ...defaultLoader,
        exclude: [/foo_bar/, ...exclude]
      });
    });
  });
});
