/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Disable the webpack cache if not needed
    config.cache = false;
    return config;
  },
};

export default nextConfig;