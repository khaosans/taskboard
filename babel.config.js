module.exports = {
  presets: [
    '@babel/preset-env', // Transpile ES6+ syntax
    '@babel/preset-react', // Transpile JSX
    '@babel/preset-typescript', // Transpile TypeScript
  ],
  plugins: [
    // Remove any plugins related to import assertions if they exist
  ],
};