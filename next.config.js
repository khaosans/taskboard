/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Disable the webpack cache if not needed
    config.cache = false;
    return config;
  },
  // Enable SSR for all pages by default
  ssr: true,
};

module.exports = nextConfig;
