const {css} = require('../../loaders');

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
    expect(css({})).toMatchObject(defaults)
  );
  it('should load postcss-will-change-transition', () => {
    const {plugins} = css({}).loader[2].options;
    return expect(plugins().length).toBe(1);
  });
  describe('receives an options object to customize the config', () => {
    it('should use MiniCssExtractPlugin if options.env = production', () =>
      expect(css({env: 'production'}).loader[0]).toMatch(/mini-css-extract-plugin/)
    );
    it('should use style-loader if options.env != production', () =>
      expect(css({env: 'development'}).loader[0]).toBe('style-loader')
    );
  });
});
