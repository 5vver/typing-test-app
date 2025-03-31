import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // suppress errors for missing 'import React' in files
      'react/react-in-jsx-scope': 'off',
      // allow jsx syntax in js files
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/display-name': 'off',
    },
  },
]);
