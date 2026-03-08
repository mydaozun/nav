import { promises as fs } from 'fs';
import * as path from 'path';
import { 
  NAV_LINKS_PATH, 
  logInfo, 
  logWarning, 
  logSuccess, 
  logError,
  extractDomain,
  normalizeFilename
} from './tools.js';

const WEB_NAV_PATH = path.join(path.dirname(NAV_LINKS_PATH), 'webnav.js');

export interface IconTask {
  id: string;
  name: string;
  url?: string;
  iconUrl?: string;
  type: 'site' | 'category';
}

export interface AnalysisResult {
  siteTasks: IconTask[];
  categoryTasks: IconTask[];
}

async function loadWebNavData() {
  const content = await fs.readFile(WEB_NAV_PATH, 'utf-8');
  const tempModulePath = path.join(path.dirname(WEB_NAV_PATH), 'temp-webnav-analysis.js');
  await fs.writeFile(tempModulePath, content, 'utf-8');
  
  const { categories, sites } = await import(`file://${tempModulePath.replace(/\\/g, '/')}`);
  await fs.unlink(tempModulePath);
  
  return { categories, sites };
}

export async function analyzeNavLinks(): Promise<AnalysisResult> {
  try {
    logInfo(`正在分析数据文件...`);
    
    const { categories, sites } = await loadWebNavData();
    
    const categoryTasks = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      iconUrl: cat.icon,
      type: 'category' as const
    }));
    
    const siteTasks = sites.map(site => ({
      id: site.id,
      name: site.title,
      url: site.url,
      iconUrl: site.icon,
      type: 'site' as const
    }));
    
    logSuccess(`分析完成! 发现 ${siteTasks.length} 个网站和 ${categoryTasks.length} 个分类需要下载图标`);
    return { siteTasks, categoryTasks };
  } catch (error) {
    logError('分析数据文件失败:', error);
    throw error;
  }
}
