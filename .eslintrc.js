module.exports = {
  env: {
    node: true,
    es6: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended', '@vue/prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
