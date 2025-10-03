import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configurações específicas para Vercel
  output: 'standalone',
  // Configurações de imagens para Vercel
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
};

export default nextConfig;
