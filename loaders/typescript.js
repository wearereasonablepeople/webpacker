const path = require('path');

const tsDefaultPath = path.join(process.cwd(), 'tsconfig.json');

module.exports = ({
  excludePattern = /node_modules/,
  transpileOnly = false,
  tsconfigPath = tsDefaultPath,
}) => ({
  test: /\.tsx?$/,
  exclude: excludePattern,
  loader: 'ts-loader',
  options: {
    transpileOnly,
    configFile: tsconfigPath,
  },
});
