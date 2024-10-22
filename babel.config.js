// babel.config.js
module.exports = {
  presets: [
      '@babel/preset-env',
      '@babel/preset-react', // Ensure this is included
      '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-private-property-in-object',
    // Add any other plugins you need here
  ],
};