/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.svgrepo.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
