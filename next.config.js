/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [
      'maps.googleapis.com',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
    ],
  },
  env: {
    GOOGLE_MAPS_KEY: process.env.GOOGLE_MAPS_KEY,
    ALGOLIA_KEY: process.env.ALGOLIA_KEY,
    ALGOLIA_ID: process.env.ALGOLIA_ID,
    MAP_ID: process.env.MAP_ID,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  experimental: {
    outputStandalone: true,
  },
});
