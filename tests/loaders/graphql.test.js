const {graphql} = require('../../loaders');

describe('GraphQL loader', () => {

  const defaults = {
    test: /\.(graphql|gql)$/,
    loader: 'graphql-tag/loader',
    exclude: /node_modules/,
  };

  it('should return the defaults if no options are provided', () =>
    expect(graphql({})).toMatchObject(defaults)
  );

  describe('receives an options object to customize the config', () => {
    it('allows to override the exclude prop', () => {
      const excludePattern = /foo_bar/;
      return expect(graphql({excludePattern}).exclude).toBe(excludePattern);
    });
  });

});
