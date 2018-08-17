const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const index = require('../../loaders');

const readDir = promisify(fs.readdir);

describe('Plugin index', () => {
  it('Should return an option for each file in the loaders', async () => {
    const files = await readDir(path.join(__dirname, '../../loaders'));
    // - 2 because the utils and the index are not included.
    expect(Object.keys(index).length).toBe(files.length - 2);
  });
});
