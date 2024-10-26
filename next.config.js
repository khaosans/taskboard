/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // Disable custom Babel loader
  webpack: (config, { isServer, dev }) => {
    // This will remove the custom Babel loader
    config.module.rules = config.module.rules.filter(
      (rule) => !(rule.use && rule.use.loader === 'next-babel-loader')
    );
    return config;
  },
};

module.exports = nextConfig;
