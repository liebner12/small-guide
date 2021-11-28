/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

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
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  pwa: {
    dest: 'public',
  },
});
