import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['tailwindcss.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
        pathname: '/plus-assets/**',
      },
    ],
  },
};

export default nextConfig;
