import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.express,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'prettier/prettier': 'error',
    },
  },
  prettierConfig,
];
