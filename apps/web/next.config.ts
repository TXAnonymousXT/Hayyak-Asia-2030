import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization for performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hayyak2030.qa',
      },
      {
        protocol: 'https',
        hostname: 'images.hayyak2030.qa',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Experimental features
  experimental: {
    optimizePackageImports: [],
  },

  // Transpile packages from monorepo
  transpilePackages: [],
};

export default withNextIntl(nextConfig);
