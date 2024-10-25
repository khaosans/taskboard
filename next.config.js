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
  // Add these lines
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@clerk/nextjs'],
  },
};

module.exports = nextConfig;
