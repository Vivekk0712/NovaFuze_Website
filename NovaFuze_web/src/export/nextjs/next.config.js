/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for hosting on static platforms
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Configure trailing slashes to match current URL structure
  trailingSlash: true,
  
  // Configure asset prefix for CDN if needed
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.novafuze.in' : '',
  
  // Custom webpack configuration
  webpack: (config, { isServer }) => {
    // Add custom webpack rules if needed
    return config;
  },
  
  // Environment variables
  env: {
    SITE_URL: 'https://novafuze.in',
    SITE_NAME: 'NovaFuze',
    CONTACT_EMAIL: 'support@novafuze.in'
  },
  
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Add any necessary redirects here
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;