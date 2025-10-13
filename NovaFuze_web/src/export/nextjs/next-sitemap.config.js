/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://novafuze.in',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/cms/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/cms/', '/api/']
      }
    ],
    additionalSitemaps: [
      'https://novafuze.in/sitemap.xml'
    ]
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'weekly' },
      '/about/': { priority: 0.8, changefreq: 'monthly' },
      '/services/': { priority: 0.9, changefreq: 'monthly' },
      '/services/web-development/': { priority: 0.8, changefreq: 'monthly' },
      '/portfolio/': { priority: 0.85, changefreq: 'weekly' },
      '/products/': { priority: 0.8, changefreq: 'weekly' },
      '/blog/': { priority: 0.75, changefreq: 'daily' },
      '/vlogs/': { priority: 0.7, changefreq: 'weekly' },
      '/contact/': { priority: 0.75, changefreq: 'monthly' },
      '/careers/': { priority: 0.7, changefreq: 'weekly' },
      '/privacy-policy/': { priority: 0.3, changefreq: 'yearly' },
      '/terms-of-service/': { priority: 0.3, changefreq: 'yearly' },
      '/refund-policy/': { priority: 0.3, changefreq: 'yearly' }
    };

    const pageConfig = customConfig[path] || { priority: 0.7, changefreq: 'monthly' };

    return {
      loc: path,
      changefreq: pageConfig.changefreq,
      priority: pageConfig.priority,
      lastmod: new Date().toISOString()
    };
  }
};