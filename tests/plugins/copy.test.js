const {copy} = require('../../plugins');

describe('COPY plugin', () => {

  const defaults = {
    apply: expect.any(Function)
  };

  it('should return plugin with defaults if no options are provided', () => {
    expect(copy({copy: ['./sample']})).toMatchObject(defaults);
  });

  it('should throw an error if wrong options are provided', () => {
    const exec = () => copy({copy: 123});
    expect(exec).toThrow(new Error('[copy-webpack-plugin] patterns must be an array'));
  });

  describe('receives an options object to customize the config', () => {
    it('allows to pass patterns to copy files', () => {
      const patterns = [
        {
          from: 'path/to/file.txt',
          to: 'directory/with/extension.ext',
          toType: 'dir'
        }
      ];

      expect(copy({copy: patterns})).toMatchObject(defaults);
    });
  });
});
