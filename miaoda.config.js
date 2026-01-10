// Miaoda Platform Configuration
// CRITICAL: This configuration COMPLETELY disables automatic robots.txt and sitemap.xml injection
// The platform MUST NOT inject or override these files

module.exports = {
  // SEO Configuration - Disable ALL automatic SEO file injection
  seo: {
    disableRobotsTxtInjection: true,
    disableSitemapInjection: true,
    useCustomRobotsTxt: true,
    useCustomSitemap: true,
    robotsTxtPath: '/robots.txt',
    sitemapPath: '/sitemap.xml',
    forceCustomFiles: true,
    overridePlatformDefaults: true,
  },
  
  // CDN Configuration - Bypass ALL platform-level SEO injection
  cdn: {
    bypassRobotsTxt: true,
    bypassSitemap: true,
    disableAutomaticSEO: true,
    disablePlatformInjection: true,
    forceStaticFiles: true,
  },
  
  // Deployment Configuration - Preserve custom files
  deployment: {
    preserveStaticFiles: ['robots.txt', 'sitemap.xml'],
    noOverwrite: ['robots.txt', 'sitemap.xml'],
    forceCustomFiles: true,
    disablePlatformDefaults: true,
  },
  
  // Platform Configuration - Disable ALL default behaviors
  platform: {
    disableDefaultRobots: true,
    disableDefaultSitemap: true,
    disableInjection: true,
    useOnlyCustomFiles: true,
    ignorePlatformDefaults: true,
  },
  
  // Static Files Configuration - Force use of custom files
  staticFiles: {
    robots: {
      enabled: false,
      useCustom: true,
      path: '/robots.txt',
    },
    sitemap: {
      enabled: false,
      useCustom: true,
      path: '/sitemap.xml',
    },
  },
};
