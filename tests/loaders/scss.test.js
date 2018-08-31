const path = require('path');
const {scss} = require('../../loaders');

describe('SCSS loader', () => {

  const defaults = {
    test: /\.scss$/,
    loader: [
      'style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          camelCase: 'dashes',
          localIdentName: '[path]___[name]__[local]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: expect.any(Function)
        }
      }, {
        loader: 'sass-loader',
        options: {
          data: '',
        }
      }
    ],
  };

  it('should return the defaults if no options are provided', () =>
    expect(scss({})).toMatchObject(defaults)
  );
  describe('receives an options object to customize the config', () => {
    it('should use MiniCssExtractPlugin if options.env = production', () =>
      expect(scss({env: 'production'}).loader[0]).toMatch(/mini-css-extract-plugin/)
    );
    it('should use style-loader if options.env != production', () =>
      expect(scss({env: 'development'}).loader[0]).toBe('style-loader')
    );
    it('allows to not pass SCSS variables path', () =>
      expect(scss({}).loader[3].options.data).toBe('')
    );
    it('allows to pass SCSS variables path', () => {
      const scssVariables = path.resolve(__dirname, './variables.scss');
      return expect(scss({scssVariables}).loader[3].options.data)
      .toBe('$test: 10px;\n');
    });
  });
});
