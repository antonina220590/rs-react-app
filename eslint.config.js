import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginNext from '@next/eslint-plugin-next';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReactCompiler from 'eslint-plugin-react-compiler';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslintParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint-define-config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { next: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      '@next/next': eslintPluginNext,
      'react-refresh': eslintPluginReactRefresh,
      'react-compiler': eslintPluginReactCompiler,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'react-refresh/only-export-components': [
        'off',
        { allowConstantExport: true },
      ],
      'react-compiler/react-compiler': 'error',
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginReact.configs['jsx-runtime'].rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-inline-comments': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'BlockComment',
          message: 'Use JSDoc/TSDoc for documentation.',
        },
        {
          selector:
            'LineComment:not(Program > LineComment, :matches([id.name=\"TODO\"],[id.name=\"FIXME\"]))',
          message:
            "Comments are discouraged. Explain 'why', not 'what'. Use JSDoc/TSDoc for APIs.",
        },
      ],
    },

    settings: { react: { version: 'detect' } },
    ignores: [
      'dist',
      'eslint.config.js',
      'coverage',
      'node_modules',
      'next/',
      '.next/',
    ],
  },
]);
