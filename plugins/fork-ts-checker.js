const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const tsDefaultPath = path.join(process.cwd(), 'tsconfig.json');

module.exports = ({
  tsconfigPath = tsDefaultPath,
}) => new ForkTsCheckerWebpackPlugin({
  tsconfigPath,
});
