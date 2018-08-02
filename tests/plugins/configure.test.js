const {configure} = require('../../plugins');
const webpack = require('webpack');

describe('CONFIGURE plugin', () => {

  const defaults = {
    defaultValues: {
      NODE_ENV: 'development'
    },
    keys: ['NODE_ENV']
  };

  it('should return plugin with default values', () => {
    expect(configure({})).toMatchObject(defaults);
    expect(configure({})).toBeInstanceOf(webpack.EnvironmentPlugin);
  });

  describe('receives an options object to customize the configuration', () => {
    it('adds more constants and change the env', () => {
      const configurePlugin = configure({
        constants: {
          SAMPLE_CONSTANT: true
        },
        env: 'test_env',
      });
      const expected = {
        defaultValues: {
          NODE_ENV: 'test_env',
          SAMPLE_CONSTANT: true
        },
        keys: ['NODE_ENV', 'SAMPLE_CONSTANT']
      };
      expect(configurePlugin).toEqual(expected);
    });
  });
});
