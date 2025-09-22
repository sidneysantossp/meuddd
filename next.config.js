/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações para produção
  reactStrictMode: true,
  
  // Configurações de imagens
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações de ambiente
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Headers personalizados para SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects se necessário
  async redirects() {
    return [];
  },
  
  // Rewrites para API routes
  async rewrites() {
    return [];
  },
  
  // Configurações de build
  webpack: (config, { dev, isServer }) => {
    // Otimizações específicas para produção
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'react/jsx-runtime',
        'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
      });
    }
    
    return config;
  }
};

module.exports = nextConfig;