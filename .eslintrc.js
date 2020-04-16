module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};