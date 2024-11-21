/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jsdom', // Ensure jsdom environment is used for React tests
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Use Babel for transpiling ES6+ code
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  moduleNameMapper: {
    '^axios$': '<rootDir>/src/__mocks__/axios.js', // Map axios to the mock file
  },
};
