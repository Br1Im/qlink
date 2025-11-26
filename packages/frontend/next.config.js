/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Отключаем проверку типов при сборке (для production)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Отключаем ESLint при сборке (для production)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['storage.yandexcloud.net'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
};

module.exports = nextConfig;
