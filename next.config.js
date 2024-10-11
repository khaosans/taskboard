/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: "export"' line
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;