const lodash = require('../../plugins/lodash');

describe('Lodash plugin', () => {
  const defaults = {
    options: {},
  };

  it('should return the plugin with default values', () => {
    expect(lodash()).toMatchObject(defaults);
  });
});
