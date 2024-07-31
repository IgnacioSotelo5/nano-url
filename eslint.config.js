import tsEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import eslintPluginImport from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: eslintPluginImport
    },
    rules: {
      'semi': ['warn', 'never'],
      'no-multi-spaces': ['error', {
        ignoreEOLComments: false,
        exceptions: {
          Property: true,
        },
      }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'sort-imports': [
        'error', 
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
        }
      ],
      'import/order': ['error', {
        'groups': [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
        'alphabetize':{
          order: 'asc',
          caseInsensitive: true
        }
      }]
    },
  },
]