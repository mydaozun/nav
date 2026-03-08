import {
  NAV_LINKS_PATH,
  DEFAULT_ICON,
  logInfo,
  logSuccess,
  logWarning,
  logError,
  readFileContent,
  writeFileContent
} from './tools.js';
import type { OptimizedPathMap } from './3optimize.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const WEBPACK_FILE = path.join(__dirname, '..', 'src', 'data', 'webnav.js');

export async function updateNavLinksIconPaths(optimizedPaths: OptimizedPathMap): Promise<void> {
  try {
    logInfo(`开始更新 navLinks.js 文件中的图标路径...`);
    
    if (!fs.existsSync(WEBPACK_FILE)) {
      throw new Error('webnav.js 文件不存在');
    }

    const webnavContent = fs.readFileSync(WEBPACK_FILE, 'utf-8');
    const tempModulePath = path.join(__dirname, 'temp-webnav-link.js');
    fs.writeFileSync(tempModulePath, webnavContent, 'utf-8');
    const { categories, sites, websiteConfig } = await import(`file://${tempModulePath.replace(/\\/g, '/')}`);
    fs.unlinkSync(tempModulePath);

    const categoriesWithIcons = categories.map(cat => ({
      ...cat,
      icon: optimizedPaths[cat.id] || ''
    }));

    const sitesWithIcons = sites.map(site => ({
      ...site,
      icon: optimizedPaths[site.id] || ''
    }));

    const outputContent = `export const websiteConfig = ${JSON.stringify(websiteConfig, null, 2)};

/**
 * 网站分类列表
 * @type {Array<{id: string, name: string, icon: string}>}
 */
export const categories = ${JSON.stringify(categoriesWithIcons, null, 2)};
/**
 * 网站列表
 * @type {Array<{id: string, title: string, description: string, shortDesc: string, url: string, icon: string, category: string}>}
 */
export const sites = ${JSON.stringify(sitesWithIcons, null, 2)};
/**
 * 搜索网站功能
 * @param {string} query - 搜索关键词
 * @returns {Array} - 符合条件的网站列表
 */
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
/**
 * 将网站数据转换为HTML标记
 * 允许直接在页面中嵌入HTML内容
 * @param {Array} sitesList - 要呈现的网站列表
 * @returns {string} - HTML标记字符串
 */
export function sitesToHtml(sitesList) {
  if (!sitesList || !sitesList.length) return '<p>没有找到符合条件的网站</p>';
  const html = sitesList.map(site => {
    const safeTitle = escapeHtml(site.title);
    const safeDesc = escapeHtml(site.shortDesc || site.description);
    const safeUrl = escapeHtml(site.url);
    const safeIcon = escapeHtml(site.icon || '/images/default.svg');
    return \`
      <div class="site-card" data-category="\${site.category}">
        <a href="\${safeUrl}" target="_blank" rel="noopener noreferrer">
          <div class="site-icon">
            <img src="\${safeIcon}" alt="\${safeTitle}" loading="lazy" onerror="this.src='/images/default.svg'">
          </div>
          <div class="site-info">
            <h3>\${safeTitle}</h3>
            <p>\${safeDesc}</p>
          </div>
        </a>
      </div>
    \`;
  }).join('');
  return \`<div class="sites-grid">\${html}</div>\`;
}
/**
 * 安全转义HTML特殊字符
 * 防止XSS攻击
 * @param {string} str - 需要转义的字符串
 * @returns {string} - 安全的HTML字符串
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
`;

    await writeFileContent(NAV_LINKS_PATH, outputContent);
    
    let categoriesWithIconsCount = categoriesWithIcons.filter(c => c.icon).length;
    let sitesWithIconsCount = sitesWithIcons.filter(s => s.icon).length;
    logSuccess(`成功更新 navLinks.js 文件!`);
    logInfo(`📊 统计: ${categoriesWithIconsCount}/${categories.length} 个分类有图标, ${sitesWithIconsCount}/${sites.length} 个网站有图标`);
    
  } catch (error) {
    logError('更新 navLinks.js 文件失败:', error);
    throw error;
  }
}
