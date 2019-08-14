module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: ['warn', 'never'],
    quotes: ['warn', 'single'],
    'react/jsx-filename-extension': 'off'
  },
  settings: {
    'import/resolver': 'webpack',
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect'
    }
  }
}
