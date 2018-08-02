const {react} = require('../../loaders');

describe('React loader', () => {

  const envPreset = ['env', {
    debug: false,
    targets: {browsers: ['last 2 versions']},
    loose: true,
    modules: false
  }];

  const defaults = {
    test: /\.(jsx?)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: expect.objectContaining({
      babelrc: false,
      presets: expect.arrayContaining([envPreset, expect.objectContaining({
        plugins: expect.arrayContaining([expect.any(Function)]),
        presets: expect.any(Array)
      })]),
      plugins: expect.arrayContaining([expect.any(Function)])
    })
  };

  it('should return the defaults if no options are provided', () =>
    expect(react({})).toMatchObject(defaults)
  );
  describe('receives an options object to customize the config', () => {
    it('allows to extend the plugins array', () => {
      const plugin = 'fake-plugin-1';
      return expect(react({plugins: [plugin]}).query.plugins).toContain(plugin);
    });
    it('allows to extend the presets array', () => {
      const preset = 'fake-preset-1';
      return expect(react({presets: [preset]}).query.presets).toContain(preset);
    });
    it('allows to override the exclude prop', () => {
      const excludePattern = /foo_bar/;
      return expect(react({excludePattern}).exclude).toBe(excludePattern);
    });
  });

});
