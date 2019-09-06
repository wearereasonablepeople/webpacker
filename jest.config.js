const path = require('path');
const {defaults} = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: path.join(__dirname, 'coverage'),
  coverageReporters: [...defaults.coverageReporters, 'html'],
  coveragePathIgnorePatterns: [...defaults.coveragePathIgnorePatterns, 'samples/'],
  transform: {},
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/node_modules/**',
    '!**/samples/**',
    '!**/coverage/**',
    '!jest.*'
  ]
};
