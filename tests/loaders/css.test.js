const {css} = require('../../loaders');

const getConf = x => css(x).pop();

const defaults = {
  test: /\.css$/,
  loader: [
    expect.any(String), {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[path]___[name]__[local]',
      }
    }, {
      loader: 'postcss-loader',
      options: {plugins: expect.any(Function)}
    }
  ]
};

describe('CSS loader', () => {
  it('should return the defaults if no options are provided', () =>
    expect(getConf({})).toMatchObject(defaults)
  );
  it('should load postcss-preset-env and postcss-will-change-transition', () => {
    const {plugins} = getConf({}).loader[2].options;
    return expect(plugins().length).toBe(2);
  });
  describe('receives an options object to customize the config', () => {
    it('should use MiniCssExtractPlugin if options.env = production', () =>
      expect(getConf({env: 'production'}).loader[0]).toMatch(/mini-css-extract-plugin/)
    );
    it('should use style-loader if options.env != production', () =>
      expect(getConf({env: 'development'}).loader[0]).toBe('style-loader')
    );
  });
});
