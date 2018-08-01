const loaders = require('../loaders');

describe('Loaders', () => {
  it('should get schema from all loaders using only the default configurations', () => {
    Object.keys(loaders).forEach(k => {
      const loaderConfig = loaders[k]({});
      expect(typeof loaderConfig).toBe('object');
    });
  });

  it('validates the CSS-LOADER output', () => {
    const expected = [{
      test: /\.css$/,
      loader: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]___[name]__[local]',
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: expect.any(Function)
          }
        }
      ]
    }];
    const config = loaders.css({});
    expect([config]).toContainEqual(expect.objectContaining(expected));
  });

  it('validates the CYCLEJS-LOADER output', () => {
    const plugins = ['fake-plugin-1', 'fake-plugin-2'];
    const presets = ['fake-preset-1', 'fake-preset-2'];
    const excludePattern = /node_modules_2/;
    const expected = {
      test: /\.(jsx?)$/,
      loader: 'babel-loader',
      exclude: /node_modules_2/,
      query: expect.objectContaining({
        babelrc: false,
        plugins: expect.arrayContaining([
          expect.any(Function)
        ]),
        presets: expect.arrayContaining([
          expect.arrayContaining([
            expect.any(String),
            expect.objectContaining({
              debug: false,
              loose: true,
              modules: false,
              targets: expect.objectContaining({
                browsers: ['last 2 versions'],
              })
            }),
          ]),
          expect.objectContaining({
            plugins: expect.arrayContaining([
              expect.any(Function)
            ]),
            presets: expect.arrayContaining([
              expect.objectContaining({
                plugins: expect.arrayContaining([
                  expect.any(Function)
                ])
              })
            ])
          })
        ])
      })
    };

    const config = loaders.cyclejs({excludePattern, plugins, presets});
    expect([config]).toContainEqual(expect.objectContaining(expected));

    expect(config.query.presets).toEqual(expect.arrayContaining(presets));
    expect(config.query.plugins).toEqual(expect.arrayContaining(plugins));
  });

  it('validates the GRAPHQL-LOADER output', () => {
    const excludePattern = /node_modules_2/;
    const expected = {
      test: /\.(graphql|gql)$/,
      loader: 'graphql-tag/loader',
      exclude: excludePattern,
    };
    const config = loaders.graphql({excludePattern});
    expect([config]).toContainEqual(expect.objectContaining(expected));
  });

  it('validates the REACT-LOADER output', () => {
    const plugins = ['fake-plugin-1', 'fake-plugin-2'];
    const presets = ['fake-preset-1', 'fake-preset-2'];
    const excludePattern = /node_modules_2/;
    const expected = {
      test: /\.(jsx?)$/,
      loader: 'babel-loader',
      exclude: excludePattern,
      query: expect.objectContaining({
        babelrc: false,
        presets: expect.arrayContaining([
          expect.arrayContaining([
            expect.any(String),
            expect.objectContaining({
              debug: false,
              loose: true,
              modules: false,
              targets: expect.objectContaining({
                browsers: ['last 2 versions'],
              })
            }),
          ]),
        ]),
        plugins: expect.arrayContaining([
          expect.any(Function)
        ])
      })
    };

    const config = loaders.react({excludePattern, plugins, presets});
    expect([config]).toContainEqual(expect.objectContaining(expected));

    expect(config.query.presets).toEqual(expect.arrayContaining(presets));
    expect(config.query.plugins).toEqual(expect.arrayContaining(plugins));
  });

  it('validates the SCSS-LOADER output', () => {
    const cwd = './path';
    const useScssVariables = true;
    const scssPath = './scssPath/scss';
    const cssnextOpts = {custom: 1};

    const expected = {
      test: /\.scss$/,
      loader: expect.arrayContaining([
        expect.objectContaining({
          loader: 'css-loader',
          options: expect.objectContaining({
            modules: true,
            importLoaders: 2,
            camelCase: 'dashes',
            localIdentName: '[path]___[name]__[local]'
          })
        }),
        expect.objectContaining({
          loader: 'postcss-loader',
          options: expect.objectContaining({
            plugins: expect.any(Function)
          })
        }),
        expect.objectContaining({
          loader: 'sass-loader',
          options: expect.objectContaining({
            data: '\n            @import "variables";\n          ',
            includePaths: ['path/scssPath/scss']
          })
        })
      ]),
    };

    const config = loaders.scss({cwd, useScssVariables, scssPath, cssnextOpts});
    expect(config).toContainEqual(expect.objectContaining(expected));
  });
});
