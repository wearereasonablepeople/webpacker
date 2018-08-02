const {cyclejs} = require('../../loaders');

describe('CycleJS loader', () => {

  const envPreset = expect.arrayContaining(['env', {
    debug: false,
    targets: {browsers: ['last 2 versions']},
    loose: true,
    modules: false
  }]);

  const babelPresetStage2 = expect.objectContaining({
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
  });

  const babelPluginTransformDecoratorsLegacy = expect.any(Function);

  const defaults = {
    test: /\.(jsx?)$/,
    loader: 'babel-loader',
    exclude: /node_modules_2/,
    query: {
      babelrc: false,
      plugins: expect.arrayContaining([babelPluginTransformDecoratorsLegacy]),
      presets: expect.arrayContaining([envPreset, babelPresetStage2])
    }
  };

  it('should return the defaults if no options are provided', () =>
    expect(cyclejs({})).toMatchObject(defaults)
  );
  describe('receives an options object to customize the config', () => {
    it('allows to extend the plugins array', () => {
      const plugin = 'fake-plugin-1';
      return expect(cyclejs({plugins: [plugin]}).query.plugins).toContain(plugin);
    });
    it('allows to extend the presets array', () => {
      const preset = 'fake-preset-1';
      return expect(cyclejs({presets: [preset]}).query.presets).toContain(preset);
    });
    it('allows to override the exclude prop', () => {
      const excludePattern = /foo_bar/;
      return expect(cyclejs({excludePattern}).exclude).toBe(excludePattern);
    });
  });
});
