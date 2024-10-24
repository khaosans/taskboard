const { withClerkMiddleware } = require("@clerk/nextjs/next");

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
};

module.exports = withClerkMiddleware(nextConfig);
