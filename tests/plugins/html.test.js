const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {html} = require('../../plugins');

describe('HTML plugin', () => {
  const defaults = {
    cwd: __dirname,
  };
  it('should return the defaults if no options are provided', () => {
    const index = 'src/index.html';
    const expected = expect.objectContaining({
      options: {
        template: path.join(__dirname, index),
        templateParameters: expect.any(Function),
        title: 'Webpack App',
        xhtml: false,
        baseHref: '/',
        cache: true,
        hash: true,
        chunks: 'all',
        chunksSortMode: 'auto',
        compile: true,
        excludeChunks: expect.any(Array),
        favicon: false,
        filename: 'index.html',
        inject: true,
        meta: {},
        showErrors: true,
        minify: expect.objectContaining({
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyURLs: true,
          minifyJS: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        }),
      },
    });
    expect(html(defaults)).toBeInstanceOf(HtmlWebpackPlugin);
    expect(html(defaults)).toMatchObject(expected);
  });

  describe('receives an options object to customize the config', () => {
    it('allows to override plugin index', () => {
      const index = 'src/custom/path/indexcustom.html';
      const cwd = __dirname;

      const expected = expect.objectContaining({
        options: {
          template: path.join(__dirname, index),
          templateParameters: expect.any(Function),
          title: 'Webpack App',
          xhtml: false,
          baseHref: '/',
          cache: true,
          hash: true,
          chunks: 'all',
          chunksSortMode: 'auto',
          compile: true,
          excludeChunks: expect.any(Array),
          favicon: false,
          filename: 'index.html',
          inject: true,
          meta: {},
          showErrors: true,
          minify: expect.objectContaining({
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          }),
        },
      });

      expect(html({cwd, index})).toMatchObject(expected);
      expect(html({cwd, index})).toBeInstanceOf(HtmlWebpackPlugin);
    });
  });
});
