module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true, // Enable Node.js global variables
    browser: true, // Enable browser global variables
    jest: true, // Enable Jest global variables if you're using Jest for testing
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'no-console': 'off', // Disable warnings for console statements
    'no-debugger': 'off', // Allow the use of debugger statements
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused variables, ignore those starting with _
    'react/prop-types': 'off', // Disable prop-types as we are using TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
    'jsx-a11y/anchor-is-valid': 'off', // Disable anchor validity checks, useful for Next.js Link
    'no-undef': 'off', // Disable no-undef rule to allow undefined variables like window, navigator, console, setTimeout, etc.
  },
  globals: {
    window: 'readonly', // Allow window as a global variable
    document: 'readonly', // Allow document as a global variable
    navigator: 'readonly', // Allow navigator as a global variable
    console: 'readonly', // Allow console as a global variable
    process: 'readonly', // Allow process as a global variable
    module: 'readonly', // Allow module as a global variable
    require: 'readonly', // Allow require as a global variable
    __dirname: 'readonly', // Allow __dirname as a global variable
    setTimeout: 'readonly', // Allow setTimeout as a global variable
    clearTimeout: 'readonly', // Allow clearTimeout as a global variable
    setInterval: 'readonly', // Allow setInterval as a global variable
    clearInterval: 'readonly', // Allow clearInterval as a global variable
  },
  overrides: [
    {
      files: [
        'utils/supabase/server.ts',
        'utils/supabaseClient.ts',
        'utils/supabaseDbClient.ts',
      ],
      rules: {
        'no-undef': 'off', // Disable no-undef rule for these files
      },
    },
  ],
};