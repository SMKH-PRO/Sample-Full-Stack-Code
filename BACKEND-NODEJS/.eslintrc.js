module.exports = {
  env: {
    es2021: true,
    node: true,

  },
  extends: [
    'eslint:recommended',
    'airbnb/base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  // rules: {
  //   'eol-last': 0,
  //   'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
  // },
};
