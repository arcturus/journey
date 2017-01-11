module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },

  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
  ],

  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },

  'plugins': [
    'react',
  ],

  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 0,
  },
};
