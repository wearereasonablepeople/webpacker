const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const index = require('../../plugins');

const readDir = promisify(fs.readdir);

describe('Plugin index', () => {
  it('Should return an option for each file in the plugins', async () => {
    const files = await readDir(path.join(__dirname, '../../plugins'));
    expect(Object.keys(index).length).toBe(files.length - 1);
  });
});
