# CleanWeb MCP 使用示例

## 🚀 快速开始

### 1. 构建并启动MCP服务器

```bash
# 构建项目
npm run build

# 启动MCP服务器（Stdio模式）
npm run mcp:stdio
```

成功启动后，你会看到：
```
🚀 CleanWeb MCP服务器已启动
```

### 2. 配置Claude

将以下配置添加到Claude的配置文件中：

```json
{
  "mcpServers": {
    "cleanweb-mcp": {
      "command": "node",
      "args": ["path/to/your/project/build/index.js"]
    }
  }
}
```

### 3. 在Claude中使用

#### 基础用法
```
请帮我提取这个网页的内容：https://example.com/article
```

#### 指定格式
```
请以JSON格式提取这个网页内容：https://news.example.com/tech-article
```

#### 快速模式
```
请用快速模式提取这个网页内容（跳过图片加载）：https://blog.example.com/post
```

## 🛠️ 工具参数说明

### extract_web_content

| 参数 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|---------|
| url | string | ✅ | - | 要提取内容的网页URL |
| format | string | ❌ | "markdown" | 返回格式："markdown" 或 "json" |
| timeout | number | ❌ | 30000 | 页面加载超时时间（毫秒） |
| fastMode | boolean | ❌ | false | 快速模式，跳过图片等资源 |

## 📋 使用场景

### 1. 文章内容提取
```
帮我提取这篇技术文章的内容：https://techblog.example.com/ai-trends-2024
```

### 2. 新闻内容整理
```
请提取这条新闻的主要内容，并总结要点：https://news.example.com/breaking-news
```

### 3. 博客文章分析
```
提取这篇博客的内容，然后帮我分析其中的观点：https://personal-blog.example.com/opinion-piece
```

### 4. 研究资料收集
```
请提取这个研究报告的内容：https://research.example.com/report-2024
格式要求：JSON格式，包含完整元数据
```

## 🔧 高级用法

### SSE模式部署

```bash
# 启动SSE服务器
npm run mcp:sse
```

然后在Claude中配置：
```json
{
  "mcpServers": {
    "cleanweb-mcp": {
      "type": "sse",
      "url": "http://localhost:3100/sse",
      "timeout": 600
    }
  }
}
```

### 开发模式

```bash
# 监听文件变化，自动重新编译
npm run mcp:dev
```

## ⚠️ 注意事项

1. **网络访问**：确保能够访问目标网站
2. **浏览器依赖**：需要Chrome/Chromium浏览器
3. **超时设置**：对于加载缓慢的网站，适当增加timeout
4. **资源消耗**：每次提取都会启动浏览器，请合理使用

## 🐛 故障排除

### 常见问题

1. **浏览器启动失败**
   - 检查是否安装了Chrome浏览器
   - 尝试设置环境变量 `CHROME_PATH`

2. **网页加载超时**
   - 增加timeout参数
   - 使用fastMode跳过资源加载

3. **内容提取失败**
   - 检查目标网站是否可访问
   - 某些网站可能有反爬虫机制

### 调试模式

```bash
# 查看详细日志
DEBUG=* npm run mcp:stdio
```