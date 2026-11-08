import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'lib/'] },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  prettierRecommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
];
