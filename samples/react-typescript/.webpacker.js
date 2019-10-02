const path = require('path');
const {setLoader, setPlugin} = require('../../utils');

/**
 * (Optional)
 *
 * Use the `forkTsChecker` plugin to improve performance.
 *
 * However you must set the following changes to make it work
 * - The typescript loader must only transpile
 *   setLoader('typescript', {transpileOnly: true})
 *
 * - Inside your tsconfig.json you must set `"moduleResolution": "node"`,
 *   otherwise it will wrongly complain about the dependencies
 *
 *
 * The result will be something similar to this:
 *
 * `.webpacker.js`
 * module.exports = {
 *   output: fn => fn({path: path.join(__dirname, 'build')}),
 *   entry: () => './src/index.tsx',
 *   preset: {
 *     loaders: [
 *       setLoader('react'),
 *       setLoader('typescript', {transpileOnly: true}),
 *     ],
 *     plugins: [
 *       setPlugin('html'),
 *       setPlugin('forkTsChecker')
 *     ],
 *   }
 * };
 *
 * `tsconfig.json`
 * {
 *    "compilerOptions": {
 *      "moduleResolution": "node"
 *    }
 * }
 */

module.exports = {
  output: fn => fn({path: path.join(__dirname, 'build')}),
  entry: () => './src/index.tsx',
  preset: {
    loaders: [
      setLoader('react'),
      setLoader('typescript', {tsconfigPath: path.join(__dirname, 'tsconfig.json')}),
    ],
    plugins: [
      setPlugin('html'),
    ],
  }
};
