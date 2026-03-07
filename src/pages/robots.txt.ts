import type { APIRoute } from 'astro';
const SITE_URL = 'https://52dh.cc.cd';
const COMMON_RULES = {
  'Allow': ['/', '/icons/', '/images/'], 
  'Disallow': ['/xw_assets/', '/node_modules/', '/*?*','/~partytown/'], 
};
const RATE_LIMITED_CRAWLER_AGENTS = [
  'SemrushBot',
  'MJ12bot',
  'AhrefsBot',
  'DotBot',
  'BLEXBot',
];
const getRobotsTxt = (sitemapURL: URL): string => {
  let specificRulesOutput = "";
  if (RATE_LIMITED_CRAWLER_AGENTS.length > 0) {
    specificRulesOutput = RATE_LIMITED_CRAWLER_AGENTS.map(agent => {
      return `User-agent: ${agent}\nCrawl-delay: 10`; 
    }).join('\n\n'); 
    specificRulesOutput += '\n\n'; 
  }
  return `
# robots.txt for ${SITE_URL}
# Rate limit for specific crawlers, otherwise open for general indexing.
${specificRulesOutput}# Default rules for all other crawlers (and paths for rate-limited crawlers)
User-agent: *
${COMMON_RULES['Allow'].map((path) => `Allow: ${path}`).join('\n')}
${COMMON_RULES['Disallow'].map((path) => `Disallow: ${path}`).join('\n')}
# No Crawl-delay for general crawlers.
# 网站地图：指向 Astro 生成的索引文件
Sitemap: ${sitemapURL.href}
`.trim();
};
export const GET: APIRoute = () => {
  let sitemapURL: URL;
  try {
    sitemapURL = new URL('sitemap-index.xml', SITE_URL);
  } catch (error) {
    console.error('Invalid SITE_URL:', error);
    throw new Error('Failed to construct sitemap URL');
  }
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};
