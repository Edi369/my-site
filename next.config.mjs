/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignorar erros de APIs do navegador durante build
    config.externals = config.externals || [];
    config.externals.push({
      'File': 'File',
      'window': 'window',
      'document': 'document',
    });
    
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
};

export default nextConfig;
