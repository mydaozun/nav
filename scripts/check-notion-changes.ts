#!/usr/bin/env node
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

import { Client } from '@notionhq/client';

const LAST_CHECK_FILE = path.join(__dirname, '..', '.last-notion-check');

function getRequiredEnvVars() {
  const requiredEnvVars = {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_CONFIG_DATABASE_ID: process.env.NOTION_CONFIG_DATABASE_ID,
    NOTION_WEBSITE_CONFIG_ID: process.env.NOTION_WEBSITE_CONFIG_ID,
  };

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) throw new Error(`${key} is not defined`);
  });

  return requiredEnvVars;
}

async function getLastCheckTime(): Promise<Date | null> {
  try {
    const content = await fs.readFile(LAST_CHECK_FILE, 'utf-8');
    return new Date(content.trim());
  } catch {
    return null;
  }
}

async function saveLastCheckTime() {
  await fs.writeFile(LAST_CHECK_FILE, new Date().toISOString(), 'utf-8');
}

async function hasDatabaseChanges(notion: Client, databaseId: string, lastCheckTime: Date | null): Promise<boolean> {
  if (!lastCheckTime) {
    return true;
  }

  try {
    const response: any = await notion.databases.query({
      database_id: databaseId,
      page_size: 1,
      sorts: [{ timestamp: 'last_edited_time', direction: 'descending' }]
    });

    if (response.results && response.results.length > 0) {
      const lastEditedTime = new Date(response.results[0].last_edited_time);
      return lastEditedTime > lastCheckTime;
    }
  } catch (error) {
    console.warn('检查数据库变化失败，假设需要更新:', error);
    return true;
  }

  return false;
}

async function main() {
  try {
    const envVars = getRequiredEnvVars();
    const notion = new Client({ auth: envVars.NOTION_API_KEY });
    
    const lastCheckTime = await getLastCheckTime();
    console.log('上次检查时间:', lastCheckTime ? lastCheckTime.toISOString() : '首次运行');

    let hasChanges = false;

    if (!lastCheckTime) {
      console.log('首次运行，需要同步数据');
      hasChanges = true;
    } else {
      console.log('检查网站数据库变化...');
      const sitesChanged = await hasDatabaseChanges(notion, envVars.NOTION_DATABASE_ID!, lastCheckTime);
      
      console.log('检查分类配置数据库变化...');
      const configChanged = await hasDatabaseChanges(notion, envVars.NOTION_CONFIG_DATABASE_ID!, lastCheckTime);
      
      console.log('检查网站配置数据库变化...');
      const websiteConfigChanged = await hasDatabaseChanges(notion, envVars.NOTION_WEBSITE_CONFIG_ID!, lastCheckTime);

      hasChanges = sitesChanged || configChanged || websiteConfigChanged;

      if (hasChanges) {
        console.log('检测到 Notion 数据有变化！');
        if (sitesChanged) console.log('- 网站数据库有更新');
        if (configChanged) console.log('- 分类配置有更新');
        if (websiteConfigChanged) console.log('- 网站配置有更新');
      } else {
        console.log('Notion 数据无变化，跳过同步');
      }
    }

    await saveLastCheckTime();

    if (hasChanges) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('检查 Notion 变化失败:', error);
    process.exit(0);
  }
}

main();
