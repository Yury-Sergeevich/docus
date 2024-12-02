import eslintRecommended from 'eslint/use-at-your-own-risk';
import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import nuxt from 'eslint-plugin-nuxt';
import prettierPlugin, { configs } from 'eslint-plugin-prettier';
import markdownPlugin from 'eslint-plugin-markdown';
import eslintConfigPrettier from 'eslint-config-prettier';

import { version } from 'vue';

export default withNuxt([
  {
    ignores: ['node_modules', 'dist', '.nuxt'],
    files: ['**/*.{js,vue,ts,md}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      nuxt,
      prettier: prettierPlugin,
      markdown: markdownPlugin,
    },
    settings: {
      vue: {
        version: 'detect',
      },
    },
    ignorePatterns: ['.nuxt', 'node_modules', 'dist'],

    rules: {
      ...eslintRecommended.configs.recomended.rules,
      ...vue.configs['vue3-recommended'].rules,
      ...nuxt.configs.recomended.rules,
      ...eslintConfigPrettier.recomended.rules,
      'prettier/prettier': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    overrides: [
      {
        files: ['**/*.md'],
        processor: 'markdown/markdown',
        rules: {
          'no-undef': 'off',
          'no-unused-vars': 'off',
          'markdown/no-inline-html': 'warn',
          'markdown/no-duplicate-headings': 'error',
          'markdown/no-multiple-blanks': ['warn', { max: 1 }],
          eslintConfigPrettier: [
            'error',
            { proseWrap: 'always', singleQuote: true, trailingComma: 'none' },
          ],
        },
      },
    ],
  },
]);
