# CleanWeb MCP

一个轻量级的Model Context Protocol (MCP)服务器，专门用于智能提取网页核心内容，自动过滤广告和无关元素，并转换为干净的Markdown格式。

## ✨ 功能特性

- 🌐 **智能内容提取**: 使用Axios + Cheerio + Readability算法提取网页主要内容
- 🧹 **智能内容清理**: 自动移除广告、导航、侧边栏等干扰元素
- 📝 **Markdown转换**: 将HTML内容转换为干净的Markdown格式
- 🖼️ **图片链接优化**: 自动处理过长的图片链接，提升阅读体验
- ⚡ **轻量级部署**: 无需浏览器依赖，部署简单快速
- 🔧 **多种输出格式**: 支持纯Markdown或包含元数据的JSON格式
- 🚀 **MCP协议**: 完全兼容Model Context Protocol标准

## 📦 安装依赖

```bash
npm install
```

**优势**: 使用轻量级的HTTP客户端，无需下载浏览器，部署更简单！专注于内容清理和优化。

## 🔧 构建项目

```bash
npm run build
```

## 🎯 使用方式

### 1. Stdio模式 (本地开发)

```bash
npm run mcp:stdio
```

### 2. SSE模式 (通过Supergateway)

```bash
npm run mcp:sse
```

服务器将在 `http://localhost:8000/sse` 启动

### 3. WebSocket模式

```bash
npm run mcp:ws
```

### 4. 开发模式 (监听文件变化)

```bash
npm run mcp:dev
```

## 🛠️ Claude配置

### Stdio模式配置

在Claude的配置文件中添加：

```json
{
  "mcpServers": {
    "copycat2jina": {
      "command": "node",
      "args": ["path/to/CopyCat2Jina/build/index.js"]
    }
  }
}
```

### SSE模式配置

```json
{
  "mcpServers": {
    "copycat2jina": {
      "type": "sse",
      "url": "http://localhost:8000/sse",
      "timeout": 600
    }
  }
}
```

## 🔨 工具说明

### extract_web_content

从网页URL提取并清理内容，转换为Markdown格式。

**参数:**
- `url` (必需): 要提取内容的网页URL
- `format` (可选): 返回格式，`markdown` 或 `json`，默认 `markdown`
- `timeout` (可选): 页面加载超时时间（毫秒），默认 30000
- `fastMode` (可选): 快速模式，跳过图片等资源加载，默认 false

**示例:**
```
提取网页内容：https://example.com/article
```

## 📁 项目结构

```
src/
├── index.ts                    # MCP服务器主入口
└── tools/
    └── web-content-extractor.ts # 网页内容提取工具
```

## 🔄 从Express服务器迁移

原有的Express服务器 (`server.js`) 仍然可以独立运行：

```bash
npm start
```

MCP版本提供了相同的核心功能，但通过MCP协议与AI助手集成。

## 🚨 注意事项

1. **轻量级实现**: 使用HTTP客户端获取静态内容，无需浏览器依赖
2. **网络访问**: 需要能够访问目标网站
3. **静态内容**: 主要适用于静态HTML内容，动态渲染的内容可能无法获取
4. **超时设置**: 对于加载缓慢的网站，可以适当增加timeout参数
5. **内容优化**: 自动优化图片链接显示，提升内容可读性

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！