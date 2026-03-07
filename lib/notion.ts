import { Client } from '@notionhq/client';

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

let notion: Client | null = null;
function getNotionClient() {
  if (!notion) {
    const envVars = getRequiredEnvVars();
    notion = new Client({ auth: envVars.NOTION_API_KEY });
  }
  return notion;
}

export interface Link {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  link: string;
  created_time: string;
}

interface ConfigItem {
  type: 'order' | 'url_order';
  title: string;
  value: number;
  icon?: string;
}

export interface WebsiteConfig {
  title?: string;
  description?: string;
  keywords?: string;
  favicon?: string;
  author?: string;
  social_github?: string;
  social_blog?: string;
  social_x?: string;
  site_google?: string;
  site_monetag?: string;
}

function isPageObject(response: any): response is any {
  return 'properties' in response;
}

export async function getConfig(): Promise<ConfigItem[]> {
  try {
    const envVars = getRequiredEnvVars();
    const notion = getNotionClient();
    
    let allResults: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;
    
    while (hasMore) {
      const response: any = await notion.databases.query({
        database_id: envVars.NOTION_CONFIG_DATABASE_ID!,
        sorts: [{ property: "order", direction: "ascending" }],
        start_cursor: startCursor,
        page_size: 100
      });
      
      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allResults
      .filter(isPageObject)
      .map(page => {
        try {
          const props = page.properties as any;
          const title = props.Name?.title?.[0]?.plain_text;
          const value = props.order?.number;

          if (!title) return null;

          let iconUrl = '';
          
          if (props.Icon?.type === 'url' && props.Icon.url) {
            iconUrl = props.Icon.url;
          } else if (props.IconFile?.files?.[0]?.type === 'external') {
            iconUrl = props.IconFile.files[0].external.url;
          } else if (props.IconFile?.files?.[0]?.type === 'file') {
            iconUrl = props.IconFile.files[0].file.url;
          }
          
          if (iconUrl) {
            try {
              const url = new URL(iconUrl);
              if (!url.pathname || url.pathname === '/' || !url.pathname.includes('.')) {
                if (!iconUrl.endsWith('/favicon.ico')) {
                  iconUrl = url.origin + '/favicon.ico';
                }
              }
            } catch {
            }
          }

          return {
            type: 'order' as const,
            title: title.trim(),
            value: value ?? 999,
            icon: iconUrl || undefined
          };
        } catch {
          return null;
        }
      })
      .filter((item): item is ConfigItem => item !== null);
  } catch {
    return [];
  }
}

export async function getDatabaseInfo() {
  try {
    const envVars = getRequiredEnvVars();
    const notion = getNotionClient();
    const response: any = await notion.databases.retrieve({
      database_id: envVars.NOTION_DATABASE_ID!
    });

    const database = response as any;
    
    return {
      icon: database.icon?.type === 'external' ? database.icon.external.url : 
            database.icon?.type === 'file' ? database.icon.file.url : undefined,
      cover: database.cover?.type === 'external' ? database.cover.external.url :
             database.cover?.type === 'file' ? database.cover.file.url : undefined
    };
  } catch {
    return { icon: undefined, cover: undefined };
  }
}

export async function getLinks(): Promise<Link[]> {
  try {
    const envVars = getRequiredEnvVars();
    const notion = getNotionClient();
    
    let allResults: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;
    
    while (hasMore) {
      const response: any = await notion.databases.query({
        database_id: envVars.NOTION_DATABASE_ID!,
        sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
        start_cursor: startCursor,
        page_size: 100
      });
      
      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allResults
      .filter(isPageObject)
      .map(page => {
        try {
          const props = page.properties as any;
          
          let iconUrl = '';
          
          if (props.Icon?.type === 'url' && props.Icon.url) {
            iconUrl = props.Icon.url;
          } else if (props.IconFile?.files?.[0]?.type === 'external') {
            iconUrl = props.IconFile.files[0].external.url;
          } else if (props.IconFile?.files?.[0]?.type === 'file') {
            iconUrl = props.IconFile.files[0].file.url;
          }
          
          if (iconUrl) {
            try {
              const url = new URL(iconUrl);
              if (!url.pathname || url.pathname === '/' || !url.pathname.includes('.')) {
                if (!iconUrl.endsWith('/favicon.ico')) {
                  iconUrl = url.origin + '/favicon.ico';
                }
              }
            } catch {
            }
          }
          
          return {
            id: page.id,
            title: props.Name?.title?.[0]?.plain_text ?? '',
            description: props.Description?.rich_text?.[0]?.plain_text ?? '',
            category: props.category?.multi_select?.[0]?.name ?? '未分类',
            icon: iconUrl,
            link: props.URL?.url ?? '',
            created_time: page.created_time
          };
        } catch {
          return null;
        }
      })
      .filter((link): link is Link => link !== null);
  } catch {
    return [];
  }
}

export async function getWebsiteConfig(): Promise<WebsiteConfig> {
  try {
    const envVars = getRequiredEnvVars();
    const notion = getNotionClient();
    
    if (!envVars.NOTION_WEBSITE_CONFIG_ID) {
      return {};
    }
    
    const dbResponse: any = await notion.databases.retrieve({
      database_id: envVars.NOTION_WEBSITE_CONFIG_ID!
    });
    
    let allResults: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;
    
    while (hasMore) {
      const queryResponse: any = await notion.databases.query({
        database_id: envVars.NOTION_WEBSITE_CONFIG_ID!,
        start_cursor: startCursor,
        page_size: 100
      });
      
      allResults = allResults.concat(queryResponse.results);
      hasMore = queryResponse.has_more;
      startCursor = queryResponse.next_cursor ?? undefined;
    }

    const config: WebsiteConfig = {};

    const database = dbResponse as any;
    if (database.icon) {
      if (database.icon.type === 'external') {
        config.favicon = database.icon.external.url;
      } else if (database.icon.type === 'file') {
        config.favicon = database.icon.file.url;
      }
    }

    allResults
      .filter(isPageObject)
      .forEach(page => {
        try {
          const props = page.properties as any;
          
          let key: string | undefined;
          let value: string | undefined;
          
          for (const [propKey, propValue] of Object.entries(props)) {
            const prop = propValue as any;
            const lowerKey = propKey.toLowerCase();
            
            if (lowerKey === 'name') {
              if (prop.type === 'title' && prop.title?.[0]?.plain_text) {
                key = prop.title[0].plain_text.toLowerCase();
              }
            } else if (lowerKey === 'value') {
              if (prop.type === 'rich_text' && prop.rich_text) {
                value = prop.rich_text.map((rt: any) => rt.plain_text).join('');
              } else if (prop.type === 'url' && prop.url) {
                value = prop.url;
              }
            }
          }

          if (key && value) {
            switch (key) {
              case 'title':
              case 'site_title':
                config.title = value;
                break;
              case 'description':
              case 'site_description':
                config.description = value;
                break;
              case 'keywords':
              case 'site_keywords':
                config.keywords = value;
                break;
              case 'author':
              case 'site_author':
                config.author = value;
                break;
              case 'favicon':
              case 'site_favicon':
                config.favicon = value;
                break;
              case 'social_github':
                config.social_github = value;
                break;
              case 'social_blog':
                config.social_blog = value;
                break;
              case 'social_x':
                config.social_x = value;
                break;
              case 'site_google':
              case 'site_head_google':
              case 'head_google':
                config.site_google = value;
                break;
              case 'site_monetag':
              case 'site_head_monetag':
              case 'head_monetag':
                config.site_monetag = value;
                break;
            }
          }
        } catch {
        }
      });

    return config;
  } catch {
    return {};
  }
}

export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const envVars = getRequiredEnvVars();
    const notion = getNotionClient();
    
    let allResults: any[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;
    
    while (hasMore) {
      const response: any = await notion.databases.query({
        database_id: envVars.NOTION_WEBSITE_CONFIG_ID!,
        start_cursor: startCursor,
        page_size: 100
      });
      
      allResults = allResults.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    const config: Record<string, string> = {};

    for (const page of allResults) {
      if (!isPageObject(page)) continue;
      
      const props = page.properties as any;
      
      let key: string | undefined;
      let value: string | undefined;
      
      for (const [propKey, propValue] of Object.entries(props)) {
        const prop = propValue as any;
        const lowerKey = propKey.toLowerCase();
        
        if (lowerKey === 'name') {
          if (prop.type === 'title' && prop.title?.[0]?.plain_text) {
            key = prop.title[0].plain_text;
          }
        } else if (lowerKey === 'value') {
          if (prop.type === 'rich_text' && prop.rich_text) {
            value = prop.rich_text.map((rt: any) => rt.plain_text).join('');
          } else if (prop.type === 'url' && prop.url) {
            value = prop.url;
          }
        }
      }

      if (key && value) {
        config[key] = value;
        config[key.toUpperCase()] = value;
        
        const upperKey = key.toUpperCase();
        if (upperKey.startsWith('SITE_HEAD_')) {
          const newKey = 'SITE_' + upperKey.substring('SITE_HEAD_'.length);
          config[newKey] = value;
          config[newKey.toLowerCase()] = value;
        }
      }
    }

    return config;
  } catch {
    return {};
  }
}
