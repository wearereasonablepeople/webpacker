const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const {getConfig} = require('../../getConfig');

const runner = ({dir, name, config}) => {
  const fs = new MemoryFS();

  const sample = (p = '') => path.join(__dirname, `../../samples/${dir}`, p);

  const build = (args, cb) => {
    const config = getConfig(args);
    const compiler = webpack({
      ...config,
      entry: path.resolve(args.cwd, './src/index'),
    });

    compiler.outputFileSystem = fs;

    compiler.run((err, stats) => {
      if(err) {
        throw new Error(err);
      }
      if(stats.hasErrors()) {
        throw new Error(stats.toString('errors-only'));
      }
      cb();
    });
  };

  describe(`${name} sample`, () => {
    it('should not crash when building for development', done => {
      build({
        env: 'test',
        mode: 'development',
        cwd: sample(),
        config: sample('.webpacker.js'),
        ...config,
      }, done);
    }, 500000);
  });
};

module.exports = {
  runner,
};
