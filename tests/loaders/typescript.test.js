const {typescript} = require('../../loaders');

describe('Typescript loader', () => {

  const defaults = {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
  };

  it('should return the defaults if no options are provided', () =>
    expect(typescript({})).toMatchObject(defaults)
  );

  describe('receives an options object to customize the config', () => {
    it('allows to override the exclude prop', () => {
      const excludePattern = /foo_bar/;
      return expect(typescript({excludePattern}).exclude).toBe(excludePattern);
    });
  });

});
