/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC and use Babel instead for WebContainer compatibility
  swcMinify: false,
  compiler: {
    // Disable SWC compiler features
    removeConsole: false,
  },
  images: {
    domains: ['images.pexels.com'],
  },
}

module.exports = nextConfig