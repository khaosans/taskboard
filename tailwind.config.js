/* eslint-env node, commonjs */
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        border: 'var(--border-color)',
      },
    },
  },
  plugins: [],
};

module.exports = config;
