#!/usr/bin/env node
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { getLinks, getConfig, getWebsiteConfig } from '../lib/notion';
import * as fs from 'fs';

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'navLinks.js');

async function main() {
  try {
    const [links, config, websiteConfig] = await Promise.all([
      getLinks(),
      getConfig(),
      getWebsiteConfig()
    ]);

    const orderedFromConfig = config
      .filter(item => item.type === 'order')
      .sort((a, b) => a.value - b.value)
      .map(item => item.title);

    const categoryOrder = config.reduce<Record<string, number>>((acc, item) => {
      if (item.type === 'order') {
        acc[item.title] = item.value;
      }
      return acc;
    }, {});

    const sortedLinks = [...links].sort((a, b) => {
      const catA = a.category.trim();
      const catB = b.category.trim();
      const orderA = categoryOrder[catA];
      const orderB = categoryOrder[catB];

      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB;
      }
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;

      const timeA = new Date(a.created_time).getTime();
      const timeB = new Date(b.created_time).getTime();
      return timeA - timeB;
    });

    const categoriesSet = new Set<string>();
    sortedLinks.forEach(link => categoriesSet.add(link.category));
    const allCategories = Array.from(categoriesSet);

    let orderedCategories: string[];
    if (orderedFromConfig.length > 0) {
      const configuredSet = new Set(orderedFromConfig);
      const unconfiguredCategories = allCategories.filter(cat => !configuredSet.has(cat))
        .sort((a, b) => a.localeCompare(b, 'zh-CN'));
      orderedCategories = [...orderedFromConfig, ...unconfiguredCategories];
    } else {
      orderedCategories = allCategories.sort((a, b) => {
        const orderA = categoryOrder[a];
        const orderB = categoryOrder[b];

        if (orderA !== undefined && orderB !== undefined) {
          return orderA - orderB;
        }
        if (orderA !== undefined) return -1;
        if (orderB !== undefined) return 1;

        return a.localeCompare(b, 'zh-CN');
      });
    }

    const configIcons = config.reduce<Record<string, string>>((acc, item) => {
      if (item.icon) {
        acc[item.title] = item.icon;
      }
      return acc;
    }, {});

    const categories = orderedCategories.map(category => ({
      id: category,
      name: category,
      icon: configIcons[category] || undefined
    }));

    const sites = sortedLinks.map(link => ({
      id: link.id,
      title: link.title,
      description: link.description,
      shortDesc: link.description.length > 50 ? link.description.substring(0, 50) + '...' : link.description,
      url: link.link,
      category: link.category,
      icon: link.icon || '/images/default.svg'
    }));

    const outputContent = `export const websiteConfig = ${JSON.stringify(websiteConfig, null, 2)};

export const categories = ${JSON.stringify(categories, null, 2)};

export const sites = ${JSON.stringify(sites, null, 2)};

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

  } catch (error) {
    console.error('从 Notion 获取数据失败:', error);
    process.exit(1);
  }
}

main();
