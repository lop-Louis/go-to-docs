import js from '@eslint/js'
import globals from 'globals'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from 'eslint-config-prettier'

export default [
  // Global ignores must be in a separate object
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/docs/.vitepress/dist/**',
      '**/docs/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/.vitepress/cache/**',
      '**/coverage/**'
    ]
  },

  // Base recommended configs
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,

  // Vue files configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'no-console': 'warn',
      'no-debugger': 'warn'
    }
  },

  // JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-unused-vars': 'off', // Turned off in favor of @typescript-eslint rule
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-useless-escape': 'off'
    }
  },

  // Test files - relax rules
  {
    files: ['tests/**/*.{js,ts,mjs}', '**/*.test.{js,ts}', '**/*.spec.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },

  // Script files - allow console
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
]
