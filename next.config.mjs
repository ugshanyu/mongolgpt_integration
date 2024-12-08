/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/front-end',
  assetPrefix: 'https://logic.mongolai.mn/front-end',
  // Add this to ensure all resources use HTTPS
  images: {
    domains: ['logic.mongolai.mn'],
    protocol: 'https'
  }
}
module.exports = nextConfig
