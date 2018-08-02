const path = require('path');
const validate = require('@webpack-contrib/schema-utils');
const {getConfig} = require('../../getConfig');
const schema = require('webpack/schemas/WebpackOptions');

describe('WEBPACKER getConfig', () => {
  const config = getConfig({config: path.join(__dirname, '_webpacker.js')});
  const validateParams = {name: 'webpack', schema, target: config};

  it('should returns a webpack valid configuration', () => {
    expect(validate({...validateParams, log: true})).toBe(true);
  });

  describe('changes in configuration that is different from schema', () => {
    it('should returns a invalid webpack configuration', () => {
      const dirtyConfig = {...config, invalidProp: 123};
      const exec = () => validate({...validateParams, target: dirtyConfig});
      expect(exec).toThrow();
    });
  });
});
