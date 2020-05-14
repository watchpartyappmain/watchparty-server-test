module.exports = {
  env: {
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    // Note: 0 ignore, 1 warn, 2 error
    'quotes': 0,
    'operator-linebreak': 0,
    'arrow-parens': 1,
    'no-use-before-define': 1,
    'no-param-reassign': 1,
  }
};
