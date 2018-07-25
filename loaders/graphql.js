module.exports = ({excludePattern = /node_modules/}) => ({
  test: /\.(graphql|gql)$/,
  exclude: excludePattern,
  loader: 'graphql-tag/loader',
});
