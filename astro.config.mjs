import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://52dh.cc.cd';
const sitemapConfig = {
  filter: (page) => {
    const excludedPaths = [
      '/xw_assets/',
      '/node_modules/',
    ];
    return !excludedPaths.some(path => page.includes(path));
  },
  customPages: [],
  serialize: (item) => {
    let priority = 0.7;   
    let changefreq = 'monthly'; 
    if (item.url === SITE_URL || item.url === `${SITE_URL}/`) {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (item.url.startsWith(SITE_URL)) {
      priority = 0.9;
    }
    return {
      url: item.url,
      changefreq,
      priority,
    };
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: {
      'zh-CN': 'zh-CN'
    },
  },
};
export default defineConfig({
  site: SITE_URL, 
  output: 'static',
  devToolbar: {
    enabled: false, 
  },
  build: {
    assets: 'xw_assets', 
    emptyOutDir: true, 
    inlineStylesheets: 'auto', 
    split: true, 
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['astro'],
          'vendor-ui': ['tailwindcss'],
          'react-core': ['react', 'react-dom'],
          'react-jsx': ['react/jsx-runtime'],
        },
      },
      plugins: [
        {
          name: 'safe-html-comment-remover',
          generateBundle(options, bundle) {
            if (process.env.NODE_ENV === 'production') {
              Object.keys(bundle).forEach(fileName => {
                if (fileName.endsWith('.html')) {
                  const htmlAsset = bundle[fileName];
                  if (htmlAsset.type === 'asset' && typeof htmlAsset.source === 'string') {
                    let content = htmlAsset.source;
                    content = content
                      .replace(/^\s*<!--[\s\S]*?-->\s*$/gm, '')
                      .replace(/^\s*<!--[\s\S]*?-->/gm, '')
                      .replace(/<!--[\s\S]*?-->\s*$/gm, '')
                      .replace(/<!--astro:end-->/g, '')
                      .replace(/<!--\s*[^>\n\r]{1,80}\s*-->/g, '');
                    htmlAsset.source = content;
                  }
                }
              });
            }
          }
        }
      ]
    },
  },
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false, 
    }),
    react(),
    sitemap(sitemapConfig),
    partytown({
      config: {
        debug: false,
        forward: ['dataLayer.push', 'gtag'],
      }
    })
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp', 
    },
    responsiveStyles: true, 
    layout: 'constrained', 
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), 
      },
    },
    server: {
      fs: {
        strict: true, 
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom'], 
      exclude: ['astro'], 
    },
    build: {
      cssCodeSplit: true, 
      minify: 'terser', 
      terserOptions: {
        compress: {
          drop_console: true, 
          drop_debugger: true, 
          pure_funcs: ['console.log', 'console.info'], 
          passes: 2, 
        },
        mangle: {
          safari10: true, 
        },
        format: {
          comments: false, 
        },
      },
      assetsInlineLimit: 4096, 
      chunkSizeWarningLimit: 1000, 
      reportCompressedSize: false, 
    },
    css: {
      devSourcemap: false, 
    },
  },
  server: {
    host: '0.0.0.0', 
    port: 4321, 
  },
});
