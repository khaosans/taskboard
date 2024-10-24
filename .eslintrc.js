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
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
  ],
};
