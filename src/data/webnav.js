export let categories = [];

export let sites = [];

export let websiteConfig = {};

export function searchSites(query) {
  if (!query) return sites;
  const lowerQuery = query.toLowerCase();
  return sites.filter(site => {
    return (
      site.title.toLowerCase().includes(lowerQuery) ||
      site.url.toLowerCase().includes(lowerQuery) ||
      site.category.toLowerCase().includes(lowerQuery)
    );
  });
}

export function sitesToHtml(sitesList) {
  if (!sitesList || !sitesList.length) return '<p>没有找到符合条件的网站</p>';
  const html = sitesList.map(site => {
    const safeTitle = escapeHtml(site.title);
    const safeDesc = escapeHtml(site.shortDesc || site.description);
    const safeUrl = escapeHtml(site.url);
    const safeIcon = escapeHtml(site.icon || '/images/default.svg');
    return `
      <div class="site-card" data-category="${site.category}">
        <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">
          <div class="site-icon">
            <img src="${safeIcon}" alt="${safeTitle}" loading="lazy" onerror="this.src='/images/default.svg'">
          </div>
          <div class="site-info">
            <h3>${safeTitle}</h3>
            <p>${safeDesc}</p>
          </div>
        </a>
      </div>
    `;
  }).join('');
  return `<div class="sites-grid">${html}</div>`;
}

export function getSitesByCategory(categoryId) {
  return sites.filter(site => site.category === categoryId);
}

export function getCategoryById(categoryId) {
  return categories.find(cat => cat.id === categoryId);
}

export function getAllCategories() {
  return categories;
}

export function getAllSites() {
  return sites;
}

export function refreshData(newCategories, newSites, newWebsiteConfig) {
  if (newCategories) categories = newCategories;
  if (newSites) sites = newSites;
  if (newWebsiteConfig) websiteConfig = newWebsiteConfig;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
