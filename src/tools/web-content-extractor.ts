import axios from 'axios';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

// Turndown配置
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '*',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '_',
  strongDelimiter: '**',
  linkStyle: 'inlined'
});

// 移除不需要的元素
turndownService.remove(['script', 'style', 'nav', 'header', 'footer', 'aside', 'iframe']);

// 自定义图片处理规则 - 移除过长的图片链接
turndownService.addRule('images', {
  filter: 'img',
  replacement: function(content, node: any) {
    const alt = node.getAttribute('alt') || '';
    const src = node.getAttribute('src') || '';
    
    // 如果图片链接过长（超过100字符），只显示alt文本或简化显示
    if (src.length > 100) {
      return alt ? `[图片: ${alt}]` : '[图片]';
    }
    
    // 对于较短的链接，保持原有格式
    return alt ? `![${alt}](${src})` : `![](${src})`;
  }
});

// 清理HTML内容
function cleanHtml(html: string, url: string) {
  const dom = new JSDOM(html, { url });
  const document = dom.window.document;
  
  // 使用Readability提取主要内容
  const reader = new Readability(document);
  const article = reader.parse();
  
  if (article && article.content) {
    return {
      title: article.title || '',
      content: article.content,
      textContent: article.textContent || '',
      excerpt: article.excerpt || ''
    };
  }
  
  // 如果Readability失败，使用备用方法
  return fallbackExtraction(document);
}

// 备用内容提取方法
function fallbackExtraction(document: Document) {
  // 移除不需要的元素
  const unwantedSelectors = [
    'script', 'style', 'nav', 'header', 'footer', 'aside',
    '.advertisement', '.ads', '.sidebar', '.menu', '.navigation',
    '[class*="ad-"]', '[id*="ad-"]', '.social-share', '.comments'
  ];
  
  unwantedSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.remove());
  });
  
  // 尝试找到主要内容区域
  const contentSelectors = [
    'main', 'article', '.content', '.post', '.entry',
    '[role="main"]', '.main-content', '#content', '#main'
  ];
  
  let mainContent: Element | null = null;
  for (const selector of contentSelectors) {
    mainContent = document.querySelector(selector);
    if (mainContent) break;
  }
  
  if (!mainContent) {
    mainContent = document.body;
  }
  
  return {
    title: document.title || '',
    content: mainContent.innerHTML,
    textContent: mainContent.textContent || '',
    excerpt: mainContent.textContent?.substring(0, 200) + '...' || ''
  };
}

// 使用axios获取网页内容
async function fetchWebContent(url: string, options: any = {}) {
  try {
    const response = await axios.get(url, {
      timeout: options.timeout || 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 400
    });
    
    return response.data;
  } catch (error: any) {
    throw new Error(`获取网页失败: ${error.message}`);
  }
}

// 处理URL的主要函数
async function processUrl(url: string, options: any = {}) {
  try {
    console.error(`开始提取: ${url}`);
    
    // 获取网页HTML
    const html = await fetchWebContent(url, options);
    
    // 清理和提取内容
    const cleanedContent = cleanHtml(html, url);
    
    // 转换为Markdown
    const markdown = turndownService.turndown(cleanedContent.content);
    
    console.error(`提取完成: ${cleanedContent.title}`);
    
    return {
      url,
      title: cleanedContent.title,
      content: markdown,
      textContent: cleanedContent.textContent,
      excerpt: cleanedContent.excerpt,
      timestamp: new Date().toISOString()
    };
    
  } catch (error: any) {
    throw new Error(`处理URL失败: ${error.message}`);
  }
}

export const webContentExtractor = {
  name: "extract_web_content",
  description: "从网页URL提取并清理内容，转换为Markdown格式。支持去除广告、导航等无关内容，专注于主要文章内容。",
  parameters: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "要提取内容的网页URL"
      },
      format: {
        type: "string",
        enum: ["markdown", "json"],
        description: "返回格式：markdown（仅返回内容）或json（包含完整信息）",
        default: "markdown"
      },
      timeout: {
        type: "number",
        description: "页面加载超时时间（毫秒），默认30000",
        default: 30000
      }
    },
    required: ["url"]
  },
  
  async run(args: { url: string; format?: string; timeout?: number }) {
    try {
      // 参数验证
      if (!args.url) {
        throw new Error("URL参数不能为空");
      }
      
      // 验证URL格式
      try {
        new URL(args.url);
      } catch {
        throw new Error("无效的URL格式");
      }
      
      // 处理选项
      const options = {
        timeout: args.timeout || 30000,
        fastMode: true  // 默认启用快速模式
      };
      
      // 提取内容
      const result = await processUrl(args.url, options);
      
      // 根据格式返回结果
      if (args.format === 'json') {
        return {
          content: [{
            type: "text",
            text: `# 网页内容提取结果\n\n**URL:** ${result.url}\n**标题:** ${result.title}\n**提取时间:** ${result.timestamp}\n\n## 提取的内容\n\n\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``
          }]
        };
      } else {
        return {
          content: [{
            type: "text",
            text: `# ${result.title}\n\n**来源:** ${result.url}\n**提取时间:** ${result.timestamp}\n\n---\n\n${result.content}`
          }]
        };
      }
      
    } catch (error: any) {
      return {
        content: [{
          type: "text",
          text: `❌ 网页内容提取失败: ${error.message}`
        }],
        isError: true
      };
    }
  }
};