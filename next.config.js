/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["ap.rdcpix.com", "p.rdcpix.com", "nh.rdcpix.com"],
  },
};

module.exports = nextConfig;
