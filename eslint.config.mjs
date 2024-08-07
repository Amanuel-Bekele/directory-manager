import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
      ecmaVersion: 12,
    },
    rules: {
      indent: ['error', 2], // Enforce 2-space indentation
      'max-len': ['error', { code: 120 }], // Set max line length to 120 characters
      'function-paren-newline': ['off'],
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: pluginPrettier,
    },
  },
];
