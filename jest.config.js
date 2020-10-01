/* eslint-disable max-len */
module.exports = {
  // preset: '@testing-library/react-native',
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-native-(.*)|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|react-native.*)'
  ],
  // moduleNameMapper: {
  // '\\.(png)$': '<rootDir>/__mocks__/fileMock.js',
  // },
  // setupFiles: [
  // './node_modules/react-native-gesture-handler/jestSetup.js',
  // './node_modules/jest-expo/src/preset/setup.js',
  // './jestSetup.js'
  // ],
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/**/styles.js'],
  cacheDirectory: '.jest-cache/'
};
