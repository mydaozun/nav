#!/usr/bin/env node
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WEBPACK_FILE = path.join(__dirname, '..', 'src', 'data', 'webnav.js');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'navLinks.js');

function escapeSingleQuote(str: string): string {
  if (!str) return '';
  return str.replace(/'/g, "\\'");
}

function formatCategories(categories: any[]): string {
  return categories.map(cat => {
    return `  {
    id: '${escapeSingleQuote(cat.id)}',
    name: '${escapeSingleQuote(cat.name)}',
  }`;
  }).join(',\n');
}

function formatSites(sites: any[]): string {
  const groupedSites: Record<string, any[]> = {};
  
  sites.forEach(site => {
    if (!groupedSites[site.category]) {
      groupedSites[site.category] = [];
    }
    groupedSites[site.category].push(site);
  });

  let result = '';
  
  for (const [category, siteList] of Object.entries(groupedSites)) {
    result += `  //${category}      
`;
    result += siteList.map(site => {
      return `      {
      id: '${escapeSingleQuote(site.id)}',
      title: '${escapeSingleQuote(site.title)}',
      description: '${escapeSingleQuote(site.description)}',
      shortDesc: '${escapeSingleQuote(site.shortDesc || '')}',
      url: '${escapeSingleQuote(site.url)}',
      category: '${escapeSingleQuote(site.category)}',
      }`;
    }).join(',\n');
    result += '\n';
  }
  
  return result;
}

async function main() {
  try {
    console.log('🚀 开始同步数据到 navLinks.js...');

    if (!fs.existsSync(WEBPACK_FILE)) {
      throw new Error('webnav.js 文件不存在，请先运行 pnpm sync:notion');
    }

    const webnavContent = fs.readFileSync(WEBPACK_FILE, 'utf-8');
    
    const tempModulePath = path.join(__dirname, 'temp-webnav.js');
    fs.writeFileSync(tempModulePath, webnavContent, 'utf-8');
    
    const { categories, sites, websiteConfig } = await import(`file://${tempModulePath.replace(/\\/g, '/')}`);
    
    fs.unlinkSync(tempModulePath);

    const outputContent = `export const websiteConfig = ${JSON.stringify(websiteConfig, null, 2)};

/**
 * 网站分类列表
 * @type {Array<{id: string, name: string, icon: string}>}
 */
export const categories = [
${formatCategories(categories)}
];
/**
 * 网站列表
 * @type {Array<{id: string, title: string, description: string, shortDesc: string, url: string, icon: string, category: string}>}
 */
export const sites = [
${formatSites(sites)}];
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
    // 转义HTML特殊字符以防止XSS攻击
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

    fs.writeFileSync(OUTPUT_FILE, outputContent, 'utf-8');

    console.log('✅ 数据同步完成！已保存到 src/data/navLinks.js');

  } catch (error) {
    console.error('❌ 同步数据失败:', error);
    process.exit(1);
  }
}

main();
