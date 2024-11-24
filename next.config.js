/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: "export"' line if it exists
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;