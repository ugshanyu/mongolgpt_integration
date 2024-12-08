/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/front-end',
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://logic.mongolai.mn/front-end'
    : '',
  images: {
    domains: ['logic.mongolai.mn'],
    protocol: 'https'
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests; default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:;"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ],
      }
    ]
  },
  // Optimize chunk loading
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        '@/components': path.resolve(__dirname, 'components'),
      });
    }
    return config;
  },
  output: 'standalone'
}

module.exports = nextConfig
