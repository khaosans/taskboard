module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  overrides: [
    {
      files: ['tests/**/*.ts', 'tests/**/*.tsx'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-console': 'off',
    'no-process-env': 'off',
  },
  globals: {
    process: 'readonly',
    console: 'readonly',
  },
};
