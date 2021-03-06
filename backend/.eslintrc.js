module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    root: true,
    env: {
      node: true,
    },
    rules: {
      quotes: ['error', 'single', { "avoidEscape": true }],
      '@typescript-eslint/no-unused-vars': 'off', // fix for https://github.com/typescript-eslint/typescript-eslint/pull/688
      '@typescript-eslint/no-unused-vars-experimental': 'error', // fix for https://github.com/typescript-eslint/typescript-eslint/pull/688
    }
  };
  