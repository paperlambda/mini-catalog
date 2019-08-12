module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'indent': ['warn', 2],
    'quotes': ['warn', 'single'],
    'react/jsx-filename-extension': 'off'
  },
  settings: {
    'import/resolver': 'webpack',
    'react': {
      'createClass': 'createReactClass',
      'pragma': 'React',
      'version': 'detect'
    }
  }
};
