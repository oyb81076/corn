'use strict';

module.exports = {
  // collectCoverageFrom: ['packages/**/*.js'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  setupFiles: [require.resolve('./setupEnvironment.js')],
  testEnvironment: "node",
  testRegex: '/__tests__/[^/]+\\.tsx?$',
  timers: 'fake',
};
