/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = [...config.externals, 'socket.io-client'];
    }
    config.cache = false;
    return config;
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
  env: {
    BASE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  },
};

module.exports = nextConfig;
/* eslint-enable no-undef */
