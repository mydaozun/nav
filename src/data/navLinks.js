/**
统一分类opensource
网站：
github
baidu.com
谷歌
具体按照以下样式生成，使用“JavaScript风格格式+单引号”，不要添加"icon字段"和"[]""      
      {
      id: 'github',
      title: 'GitHub',
      description: '全球最大的开源代码托管平台，支持 Git 版本控制，适用于协作开发、项目管理和自动化工作流，是开发者共享与协作的核心工具。'
      shortDesc: '代码托管平台。',
      url: 'https://github.com/',
      category: 'opensource',
      },
描述根据网站实际内容,专业,准确,介绍背景独特优势等等,不要太刻板,臃肿,重复
自动下载图标脚本执行:
npx tsx icon-system/0icon.ts
*/
/**
 * 网站分类列表
 * @type {Array<{id: string, name: string, icon: string}>}
 */
export const categories = [
  {
    id: 'opensource',
    name: '开源平台', icon: '/icons/category/opensource.svg',
  },
  {
    id: 'Studying',
    name: '个人其他站点', icon: '/icons/category/studying.svg',
  },
  {
    id: 'pages',
    name: '静态部署平台', icon: '/icons/category/pages.svg',
  },
  {
    id: 'ai',
    name: 'AI 工具', icon: '/icons/category/ai.svg',
  },
  {
    id: 'tools',
    name: '在线工具', icon: '/icons/category/tools.svg',
  },
  {
    id: 'search',
    name: '搜索引擎', icon: '/icons/category/search.svg',
  },
  {
    id: 'dev',
    name: '开发资源', icon: '/icons/category/dev.svg',
  },
  {
    id: 'apps',
    name: '应用', icon: '/icons/category/apps.svg',
  },
  {
    id: 'news',
    name: '新闻', icon: '/icons/category/news.svg',
  },
  {
    id: 'media',
    name: '影音', icon: '/icons/category/media.svg',
  },
  {
    id: 'tech',
    name: '科技', icon: '/icons/category/tech.svg',
  },
  {
    id: 'image',
    name: '图片', icon: '/icons/category/image.svg',
  },
  {
    id: 'productivity',
    name: '效率', icon: '/icons/category/productivity.svg',
  },
  {
    id: 'education',
    name: '学习', icon: '/icons/category/education.svg',
  },
  {
    id: 'games',
    name: '游戏', icon: '/icons/category/games.svg',
  },
  {
    id: 'shopping',
    name: '购物', icon: '/icons/category/shopping.svg',
  },
  {
    id: 'social',
    name: '社交', icon: '/icons/category/social.svg',
  },
  {
    id: 'reading',
    name: '阅读', icon: '/icons/category/reading.svg',
  },
  {
    id: 'travel',
    name: '出行', icon: '/icons/category/travel.svg',
  },
  {
    id: 'finance',
    name: '金融', icon: '/icons/category/finance.svg',
  },
];


/**
 * 网站列表
 * @type {Array<{id: string, title: string, description: string, shortDesc: string, url: string, icon: string, category: string}>}
 */
export const sites = [
  //开源      
      {
      id: 'github',
      title: 'GitHub',
      description: '全球最大的开源代码托管平台，支持 Git 版本控制，适用于协作开发、项目管理和自动化工作流，是开发者共享与协作的核心工具。',
      shortDesc: '全球最大代码托管平台。',
      url: 'https://github.com/',
      category: 'opensource',
      icon: '/icons/github.webp',
      },
  //个人其他站点      
      {
      id: '52DH',
      title: '52DH',
      description: '个人主页与知识集散地。作为技术爱好者，展示自己的全部项目、实践与分享的中心',
      shortDesc: '52DH个人官网',
      url: 'https://52dh.cc.cd/',
      category: 'Studying',
      icon: '/icons/zywede.png',
      },
      {
      id: 'dh_zywede',
      title: '导航网',
      description: '专属导航页,这里汇聚了日常学习、开发与管理服务器所需的所有高效工具与资源链接，快速触达各项在线服务的便捷入口，确保学习与实践的流畅性。',
      shortDesc: '让每个人都有自己的网站式收藏夹',
      url: 'https://mmaiverse.com/',
      category: 'Studying',
      icon: '/icons/dh-zywede.png',
      },
      // pages      
      {
      id: 'github-pages',
      title: 'GitHub Pages',
      description: 'GitHub 提供的静态网站托管服务，支持自定义域名与 HTTPS，可直接从仓库部署，适合个人主页、项目文档与开源展示，集成 Git 工作流，极简且可靠。',
      shortDesc: 'Git 驱动的静态网站托管。',
      url: 'https://pages.github.com/',
      category: 'pages',
      icon: '/icons/github-pages.webp',
      },
      {
      id: 'cloudflare-pages',
      title: 'Cloudflare Pages',
      description: '由全球领先的 CDN 提供商 Cloudflare 推出的前端部署平台，支持 Jamstack 架构，内置构建优化、边缘函数与自动缓存更新，适合高性能 Web 应用与博客。',
      shortDesc: 'CDN 优化的前端部署平台。',
      url: 'https://pages.cloudflare.com/',
      category: 'pages',
      icon: '/icons/cloudflare-pages.webp',
      },
      {
      id: 'vercel',
      title: 'Vercel',
      description: '专为前端开发打造的现代部署平台，由 Next.js 背后团队开发，支持 Serverless 架构、实时预览与多分支部署，适合敏捷开发、商业级应用与个性化项目。',
      shortDesc: 'Next.js 团队出品的部署平台。',
      url: 'https://vercel.com/',
      category: 'pages',
      icon: '/icons/vercel.webp',
      },
      // 优质工具网站
      {
      id: 'github',
      title: 'GitHub',
      description: '全球最大的开源代码托管平台，支持 Git 版本控制，适用于协作开发、项目管理和自动化工作流，是开发者共享与协作的核心工具。',
      shortDesc: '全球最大代码托管平台。',
      url: 'https://github.com/',
      category: 'dev',
      icon: 'https://github.githubassets.com/favicons/favicon.svg',
      },
      {
      id: 'google',
      title: 'Google',
      description: '全球领先的搜索引擎，提供网页搜索、图片搜索、视频搜索等多种搜索服务，是互联网信息获取的重要入口。',
      shortDesc: '全球领先的搜索引擎。',
      url: 'https://www.google.com/',
      category: 'search',
      icon: 'https://www.google.com/favicon.ico',
      },
      {
      id: 'bing',
      title: 'Bing',
      description: '微软推出的搜索引擎，提供网页搜索、图片搜索、视频搜索等服务，以其精美的背景图片和准确的搜索结果受到用户喜爱。',
      shortDesc: '微软推出的搜索引擎。',
      url: 'https://www.bing.com/',
      category: 'search',
      icon: 'https://www.bing.com/favicon.ico',
      },
      {
      id: 'stackoverflow',
      title: 'Stack Overflow',
      description: '全球最大的程序员问答社区，开发者可以在这里提问、回答技术问题，分享编程知识和经验。',
      shortDesc: '程序员问答社区。',
      url: 'https://stackoverflow.com/',
      category: 'dev',
      icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
      },
      {
      id: 'npm',
      title: 'npm',
      description: 'Node.js 的包管理器，是 JavaScript 生态系统中最大的软件注册表，提供了丰富的开源包和工具。',
      shortDesc: 'Node.js 包管理器。',
      url: 'https://www.npmjs.com/',
      category: 'dev',
      icon: 'https://www.npmjs.com/favicon.ico',
      },
      {
      id: 'mdn',
      title: 'MDN Web Docs',
      description: 'Mozilla 开发者网络，提供全面的 Web 技术文档，包括 HTML、CSS、JavaScript 等前端技术的详细指南和参考资料。',
      shortDesc: 'Web 技术文档资源。',
      url: 'https://developer.mozilla.org/',
      category: 'dev',
      icon: 'https://developer.mozilla.org/favicon.ico',
      },
      {
      id: 'w3schools',
      title: 'W3Schools',
      description: '提供 Web 技术学习资源的网站，包括 HTML、CSS、JavaScript、SQL、Python 等多种编程语言和技术的教程。',
      shortDesc: 'Web 技术学习资源。',
      url: 'https://www.w3schools.com/',
      category: 'dev',
      icon: 'https://www.w3schools.com/favicon.ico',
      },
      {
      id: 'devto',
      title: 'DEV Community',
      description: '面向开发者的社区平台，开发者可以在这里分享技术文章、教程和经验，与其他开发者交流和学习。',
      shortDesc: '开发者社区平台。',
      url: 'https://dev.to/',
      category: 'dev',
      icon: 'https://dev.to/favicon.ico',
      },
      // AI 相关网站
      {
      id: 'openclaw-ai',
      title: 'OpenClaw AI',
      description: 'OpenClaw AI 开源项目，提供创新的 AI 解决方案和工具。',
      shortDesc: 'OpenClaw AI 开源项目。',
      url: 'https://github.com/openclaw/openclaw',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'openclaw-chinese',
      title: 'OpenClaw 汉化版',
      description: 'OpenClaw 中文翻译版本，让中文用户更方便地使用。',
      shortDesc: 'OpenClaw 中文翻译版。',
      url: 'https://github.com/1186258278/OpenClawChineseTranslation',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'nanobot',
      title: 'nanobot',
      description: 'HKUDS 开发的 nanobot 项目，轻量级 AI 机器人解决方案。',
      shortDesc: '轻量级 AI 机器人。',
      url: 'https://github.com/HKUDS/nanobot',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'clawwork',
      title: 'ClawWork',
      description: 'HKUDS 开发的 ClawWork 项目，AI 工作流自动化工具。',
      shortDesc: 'AI 工作流自动化工具。',
      url: 'https://github.com/HKUDS/ClawWork',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'picoclaw-ai',
      title: 'picoClaw AI',
      description: 'Sipeed 开发的 picoClaw AI，适用于嵌入式设备的 AI 项目。',
      shortDesc: '嵌入式 AI 项目。',
      url: 'https://github.com/sipeed/picoclaw',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'mimiclaw',
      title: 'mimiclaw',
      description: 'Memov AI 开发的 mimiclaw 项目，AI 模拟与复制工具。',
      shortDesc: 'AI 模拟与复制工具。',
      url: 'https://github.com/memovai/mimiclaw',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'zeroclaw',
      title: 'zeroclaw',
      description: 'ZeroClaw Labs 开发的 zeroclaw 项目，下一代 AI 解决方案。',
      shortDesc: '下一代 AI 解决方案。',
      url: 'https://github.com/zeroclaw-labs/zeroclaw',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'nanoclaw',
      title: 'nanoclaw',
      description: 'Qwibit AI 开发的 nanoclaw 项目，轻量级 AI 框架。',
      shortDesc: '轻量级 AI 框架。',
      url: 'https://github.com/qwibitai/nanoclaw',
      category: 'ai',
      icon: 'https://github.com/favicon.ico',
      },
      {
      id: 'chatgpt',
      title: 'ChatGPT',
      description: 'OpenAI 开发的对话式 AI 模型，可以进行自然语言交互，回答问题、生成内容、协助编程等多种任务。',
      shortDesc: '对话式 AI 模型。',
      url: 'https://chatgpt.com/',
      category: 'ai',
      icon: 'https://chatgpt.com/favicon.ico',
      },
      {
      id: 'claude',
      title: 'Claude',
      description: 'Anthropic 开发的 AI 助手，提供对话、内容生成、数据分析等功能，以安全性和可靠性为特点。',
      shortDesc: 'Anthropic AI 助手。',
      url: 'https://claude.ai/',
      category: 'ai',
      icon: 'https://claude.ai/favicon.ico',
      },
      {
      id: 'gemini',
      title: 'Gemini',
      description: 'Google 开发的多模态 AI 模型，可以理解和生成文本、图像、音频等多种形式的内容。',
      shortDesc: 'Google 多模态 AI。',
      url: 'https://gemini.google.com/',
      category: 'ai',
      icon: 'https://gemini.google.com/favicon.ico',
      },
      {
      id: 'bing-ai',
      title: 'Bing AI',
      description: '微软整合在 Bing 搜索中的 AI 助手，可以提供搜索结果、回答问题、生成内容等功能。',
      shortDesc: '微软 AI 搜索助手。',
      url: 'https://www.bing.com/chat',
      category: 'search',
      icon: 'https://www.bing.com/favicon.ico',
      },
      {
      id: 'perplexity',
      title: 'Perplexity AI',
      description: '基于 AI 的搜索引擎，提供详细的问题回答和信息检索，整合了多个信息源。',
      shortDesc: 'AI 搜索引擎。',
      url: 'https://www.perplexity.ai/',
      category: 'search',
      icon: 'https://www.perplexity.ai/favicon.ico',
      },
      {
      id: 'huggingface',
      title: 'Hugging Face',
      description: 'AI 模型共享平台，提供各种预训练模型和工具，支持自然语言处理、计算机视觉等多种 AI 任务。',
      shortDesc: 'AI 模型共享平台。',
      url: 'https://huggingface.co/',
      category: 'dev',
      icon: 'https://huggingface.co/favicon.ico',
      },
      {
      id: 'midjourney',
      title: 'Midjourney',
      description: 'AI 图像生成工具，可以根据文本描述生成高质量的图像，适用于创意设计、艺术创作等领域。',
      shortDesc: 'AI 图像生成工具。',
      url: 'https://www.midjourney.com/',
      category: 'ai',
      icon: 'https://www.midjourney.com/favicon.ico',
      },
      // 在线小工具网站
      {
      id: 'tooltt',
      title: 'ToolTT',
      description: '集合了多种在线工具的平台，包括文本工具、图片工具、开发工具、转换工具等，提供一站式的在线工具服务。',
      shortDesc: '综合在线工具平台。',
      url: 'https://www.tooltt.com/',
      category: 'tools',
      icon: 'https://www.tooltt.com/favicon.ico',
      },
      {
      id: 'convertio',
      title: 'Convertio',
      description: '在线文件转换工具，支持多种文件格式之间的转换，包括文档、图像、音频、视频等。',
      shortDesc: '在线文件转换工具。',
      url: 'https://convertio.co/',
      category: 'tools',
      icon: 'https://convertio.co/favicon.ico',
      },
      {
      id: 'tinypng',
      title: 'TinyPNG',
      description: '在线图片压缩工具，可以在保持图片质量的同时减小图片文件大小，提高网站加载速度。',
      shortDesc: '在线图片压缩工具。',
      url: 'https://tinypng.com/',
      category: 'tools',
      icon: 'https://tinypng.com/favicon.ico',
      },
      {
      id: 'jsonformatter',
      title: 'JSON Formatter',
      description: '在线 JSON 格式化工具，可以美化、验证和转换 JSON 数据，便于开发人员查看和处理 JSON。',
      shortDesc: 'JSON 格式化工具。',
      url: 'https://jsonformatter.curiousconcept.com/',
      category: 'tools',
      icon: 'https://jsonformatter.curiousconcept.com/favicon.ico',
      },
      {
      id: 'regex101',
      title: 'Regex101',
      description: '在线正则表达式测试工具，可以测试、调试和生成正则表达式，帮助开发人员快速验证正则表达式的正确性。',
      shortDesc: '正则表达式测试工具。',
      url: 'https://regex101.com/',
      category: 'tools',
      icon: 'https://regex101.com/favicon.ico',
      },
      {
      id: 'colorpicker',
      title: 'Color Picker',
      description: '在线颜色选择器工具，可以选择、调整和生成颜色代码，支持多种颜色格式如 HEX、RGB、HSL 等。',
      shortDesc: '在线颜色选择器。',
      url: 'https://www.colorpicker.com/',
      category: 'tools',
      icon: 'https://www.colorpicker.com/favicon.ico',
      },
      {
      id: 'passwordgenerator',
      title: 'Password Generator',
      description: '在线密码生成工具，可以生成强密码，提高账户安全性，支持自定义密码长度和字符类型。',
      shortDesc: '在线密码生成工具。',
      url: 'https://passwordsgenerator.net/',
      category: 'tools',
      icon: 'https://passwordsgenerator.net/favicon.ico',
      },
      {
      id: 'gtmetrix',
      title: 'GTmetrix',
      description: '网站性能测试工具，可以分析网站的加载速度和性能，提供优化建议，帮助网站提高用户体验。',
      shortDesc: '网站性能测试工具。',
      url: 'https://gtmetrix.com/',
      category: 'tools',
      icon: 'https://gtmetrix.com/favicon.ico',
      },
      // 应用
      {
      id: 'appstore',
      title: 'Apple App Store',
      description: '苹果官方应用商店，提供 iOS 应用、游戏和数字内容的下载和购买。',
      shortDesc: '苹果应用商店。',
      url: 'https://apps.apple.com/',
      category: 'apps',
      icon: 'https://apps.apple.com/favicon.ico',
      },
      {
      id: 'googleplay',
      title: 'Google Play Store',
      description: '谷歌官方应用商店，提供 Android 应用、游戏和数字内容的下载和购买。',
      shortDesc: '谷歌应用商店。',
      url: 'https://play.google.com/store',
      category: 'apps',
      icon: 'https://play.google.com/favicon.ico',
      },
      // 新闻
      {
      id: 'bbc',
      title: 'BBC News',
      description: '英国广播公司的新闻网站，提供全球新闻、分析和评论。',
      shortDesc: 'BBC 新闻。',
      url: 'https://www.bbc.com/news',
      category: 'news',
      icon: 'https://www.bbc.com/favicon.ico',
      },
      {
      id: 'cnn',
      title: 'CNN',
      description: '美国有线电视新闻网，提供全球新闻、政治、商业、体育等内容。',
      shortDesc: 'CNN 新闻。',
      url: 'https://www.cnn.com/',
      category: 'news',
      icon: 'https://www.cnn.com/favicon.ico',
      },
      // 影音
      {
      id: 'youtube',
      title: 'YouTube',
      description: '全球最大的视频分享平台，用户可以上传、观看和分享视频内容。',
      shortDesc: '视频分享平台。',
      url: 'https://www.youtube.com/',
      category: 'media',
      icon: 'https://www.youtube.com/favicon.ico',
      },
      {
      id: 'spotify',
      title: 'Spotify',
      description: '全球领先的音乐流媒体服务，提供 millions of songs, podcasts, and videos from artists all over the world.',
      shortDesc: '音乐流媒体服务。',
      url: 'https://www.spotify.com/',
      category: 'media',
      icon: 'https://www.spotify.com/favicon.ico',
      },
      // 科技
      {
      id: 'techcrunch',
      title: 'TechCrunch',
      description: '科技新闻网站，报道创业公司、科技产品和互联网趋势。',
      shortDesc: '科技新闻网站。',
      url: 'https://techcrunch.com/',
      category: 'tech',
      icon: 'https://techcrunch.com/favicon.ico',
      },
      {
      id: 'wired',
      title: 'WIRED',
      description: '科技和文化杂志，报道科技、商业、艺术和设计等内容。',
      shortDesc: '科技文化杂志。',
      url: 'https://www.wired.com/',
      category: 'tech',
      icon: 'https://www.wired.com/favicon.ico',
      },
      // 图片
      {
      id: 'unsplash',
      title: 'Unsplash',
      description: '免费高清图片分享平台，提供大量高质量的免费图片资源。',
      shortDesc: '免费图片分享平台。',
      url: 'https://unsplash.com/',
      category: 'image',
      icon: 'https://unsplash.com/favicon.ico',
      },
      {
      id: 'pinterest',
      title: 'Pinterest',
      description: '图片分享和发现平台，用户可以创建和分享图片集合。',
      shortDesc: '图片分享平台。',
      url: 'https://www.pinterest.com/',
      category: 'image',
      icon: 'https://www.pinterest.com/favicon.ico',
      },
      // 效率
      {
      id: 'notion',
      title: 'Notion',
      description: '一站式工作空间，集成笔记、任务、数据库等功能，提高工作效率。',
      shortDesc: '一站式工作空间。',
      url: 'https://www.notion.so/',
      category: 'productivity',
      icon: 'https://www.notion.so/favicon.ico',
      },
      {
      id: 'todoist',
      title: 'Todoist',
      description: '任务管理工具，帮助用户组织和管理日常任务和项目。',
      shortDesc: '任务管理工具。',
      url: 'https://todoist.com/',
      category: 'productivity',
      icon: 'https://todoist.com/favicon.ico',
      },
      // 学习
      {
      id: 'coursera',
      title: 'Coursera',
      description: '在线学习平台，提供来自全球顶尖大学和机构的课程。',
      shortDesc: '在线学习平台。',
      url: 'https://www.coursera.org/',
      category: 'education',
      icon: 'https://www.coursera.org/favicon.ico',
      },
      {
      id: 'edX',
      title: 'edX',
      description: '由哈佛大学和麻省理工学院创立的在线学习平台，提供大学课程和专业证书。',
      shortDesc: '在线学习平台。',
      url: 'https://www.edx.org/',
      category: 'education',
      icon: 'https://www.edx.org/favicon.ico',
      },
      // 游戏
      {
      id: 'steam',
      title: 'Steam',
      description: ' Valve 开发的数字发行平台，提供 PC 游戏的购买、下载和社交功能。',
      shortDesc: 'PC 游戏平台。',
      url: 'https://store.steampowered.com/',
      category: 'games',
      icon: 'https://store.steampowered.com/favicon.ico',
      },
      {
      id: 'epicgames',
      title: 'Epic Games Store',
      description: 'Epic Games 推出的数字发行平台，提供游戏和软件的购买和下载。',
      shortDesc: '游戏数字发行平台。',
      url: 'https://www.epicgames.com/store/',
      category: 'games',
      icon: 'https://www.epicgames.com/favicon.ico',
      },
      // 购物
      {
      id: 'amazon',
      title: 'Amazon',
      description: '全球最大的电子商务平台，提供各种商品的购买和配送服务。',
      shortDesc: '电子商务平台。',
      url: 'https://www.amazon.com/',
      category: 'shopping',
      icon: 'https://www.amazon.com/favicon.ico',
      },
      {
      id: 'taobao',
      title: '淘宝',
      description: '中国最大的电子商务平台，提供各种商品的购买和配送服务。',
      shortDesc: '中国电子商务平台。',
      url: 'https://www.taobao.com/',
      category: 'shopping',
      icon: 'https://www.taobao.com/favicon.ico',
      },
      // 社交
      {
      id: 'facebook',
      title: 'Facebook',
      description: '全球最大的社交网络平台，用户可以分享内容、连接朋友和家人。',
      shortDesc: '社交网络平台。',
      url: 'https://www.facebook.com/',
      category: 'social',
      icon: 'https://www.facebook.com/favicon.ico',
      },
      {
      id: 'twitter',
      title: 'X (Twitter)',
      description: '社交媒体平台，用户可以发布和分享短消息（推文）。',
      shortDesc: '社交媒体平台。',
      url: 'https://x.com/',
      category: 'social',
      icon: 'https://x.com/favicon.ico',
      },
      // 阅读
      {
      id: 'medium',
      title: 'Medium',
      description: '在线出版平台，用户可以阅读和发布文章、故事和观点。',
      shortDesc: '在线出版平台。',
      url: 'https://medium.com/',
      category: 'reading',
      icon: 'https://medium.com/favicon.ico',
      },
      {
      id: 'goodreads',
      title: 'Goodreads',
      description: '图书推荐和社交阅读平台，用户可以分享读书心得和评论。',
      shortDesc: '图书推荐平台。',
      url: 'https://www.goodreads.com/',
      category: 'reading',
      icon: 'https://www.goodreads.com/favicon.ico',
      },
      // 出行
      {
      id: 'googlemaps',
      title: 'Google Maps',
      description: '谷歌地图服务，提供地图、导航、地点搜索等功能。',
      shortDesc: '地图导航服务。',
      url: 'https://www.google.com/maps',
      category: 'travel',
      icon: 'https://www.google.com/maps/favicon.ico',
      },
      {
      id: 'booking',
      title: 'Booking.com',
      description: '在线预订平台，提供酒店、民宿、公寓等住宿预订服务。',
      shortDesc: '住宿预订平台。',
      url: 'https://www.booking.com/',
      category: 'travel',
      icon: 'https://www.booking.com/favicon.ico',
      },
      // 金融
      {
      id: 'paypal',
      title: 'PayPal',
      description: '在线支付平台，提供安全的在线支付和转账服务。',
      shortDesc: '在线支付平台。',
      url: 'https://www.paypal.com/',
      category: 'finance',
      icon: 'https://www.paypal.com/favicon.ico',
      },
      {
      id: 'coinbase',
      title: 'Coinbase',
      description: '加密货币交易平台，提供比特币、以太坊等加密货币的买卖服务。',
      shortDesc: '加密货币交易平台。',
      url: 'https://www.coinbase.com/',
      category: 'finance',
      icon: 'https://www.coinbase.com/favicon.ico',
      },
];




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

