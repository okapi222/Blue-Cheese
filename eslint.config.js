import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // Enforce design-system usage: app code should not introduce raw controls.
  // `src/ui/**` is the one allowed place to wrap the real MDS package.
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/ui/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='button']",
          message:
            'Do not use <button> in app code. Use `@ui` Button (or add a wrapper in `src/ui`).',
        },
        {
          selector: "JSXOpeningElement[name.name='input']",
          message:
            'Do not use <input> in app code. Use an `@ui` input component (or add a wrapper in `src/ui`).',
        },
        {
          selector: "JSXOpeningElement[name.name='select']",
          message:
            'Do not use <select> in app code. Use an `@ui` select component (or add a wrapper in `src/ui`).',
        },
        {
          selector: "JSXOpeningElement[name.name='textarea']",
          message:
            'Do not use <textarea> in app code. Use an `@ui` textarea component (or add a wrapper in `src/ui`).',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@mui/*',
                'antd',
                '@chakra-ui/*',
                'react-bootstrap',
                'semantic-ui-react',
              ],
              message:
                'Avoid adding third-party UI libraries. Use MDS via `@ui` instead.',
            },
          ],
        },
      ],
    },
  },
])
