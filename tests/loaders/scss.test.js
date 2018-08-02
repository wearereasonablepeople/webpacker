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
          data: '\n            undefined\n          ',
          includePaths: [expect.stringMatching('src/scss')]
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
    it('allows to enable SCSS variables', () => {
      const useScssVariables = true;
      return expect(scss({useScssVariables}).loader[3].options.data)
      .toBe('\n            @import "variables";\n          ');
    });
    it('allows to include SASS files from a different path', () => {
      const cwd = './path';
      const scssPath = './scssPath/scss';
      return expect(scss({cwd, scssPath}).loader[3].options.includePaths)
      .toContain('path/scssPath/scss');
    });
  });
});
