import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import importHelpers from 'eslint-plugin-import-helpers';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Ignores globais
  {
    ignores: ['node_modules/', 'dist/', 'build/', 'coverage/'],
  },

  // Configuração base JS
  js.configs.recommended,

  // Configuração principal da aplicação
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
      prettier,
      'import-helpers': importHelpers,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups': [
            ['/^react/'],
            ['module', 'absolute'],
            '/^@/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },

  // Configuração específica para arquivos de teste do Vitest
  {
    files: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/__tests__/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules, // Aplica as regras recomendadas do Vitest
      'vitest/no-focused-tests': 'error',  // Impede o commit acidental de fit() ou test.only()
      'vitest/no-disabled-tests': 'warn',  // Avisa sobre xit() ou test.skip()
      'vitest/prefer-to-have-length': 'warn',
      'vitest/valid-expect': 'error',
    },
  },
];
