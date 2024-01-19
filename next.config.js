/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer[0].options = {
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
