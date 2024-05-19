import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    languageOptions: {
      globals: globals.nodeBuiltin,
    },
    rules: {
      // 'no-unused-vars': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next' }],
    },
  },
];
