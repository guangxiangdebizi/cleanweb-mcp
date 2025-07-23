# 🌐 CleanWeb MCP

<div align="center">

[![npm version](https://badge.fury.io/js/cleanweb-mcp.svg)](https://www.npmjs.com/package/cleanweb-mcp)
[![GitHub stars](https://img.shields.io/github/stars/guangxiangdebizi/cleanweb-mcp.svg)](https://github.com/guangxiangdebizi/cleanweb-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**一个轻量级的Model Context Protocol (MCP)服务器**

专门用于智能提取网页核心内容，自动过滤广告和无关元素，并转换为干净的Markdown格式

[🚀 快速开始](#-快速开始) • [📖 文档](#-使用方式) • [🔧 配置](#-claude配置) • [🤝 贡献](#-贡献)

</div>

## ✨ 功能特性

<div align="center">

| 🌐 智能提取 | 🧹 内容清理 | 📝 格式转换 | ⚡ 轻量部署 |
|:---:|:---:|:---:|:---:|
| Axios + Cheerio + Readability | 自动过滤广告和干扰元素 | HTML → Markdown | 零浏览器依赖 |

</div>

### 🎯 核心优势

- 🌐 **智能内容提取**: 使用Axios + Cheerio + Readability算法提取网页主要内容
- 🧹 **智能内容清理**: 自动移除广告、导航、侧边栏等干扰元素
- 📝 **Markdown转换**: 将HTML内容转换为干净的Markdown格式
- 🖼️ **图片链接优化**: 自动处理过长的图片链接，提升阅读体验
- ⚡ **轻量级部署**: 无需浏览器依赖，部署简单快速
- 🔧 **多种输出格式**: 支持纯Markdown或包含元数据的JSON格式
- 🚀 **MCP协议**: 完全兼容Model Context Protocol标准

### 🛠️ 技术栈

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Cheerio](https://img.shields.io/badge/Cheerio-E34F26?style=for-the-badge&logo=html5&logoColor=white)

</div>

## 🚀 快速开始

### 📦 安装

```bash
# 从npm安装
npm install cleanweb-mcp

# 或者克隆仓库
git clone https://github.com/guangxiangdebizi/cleanweb-mcp.git
cd cleanweb-mcp
npm install
```

> **💡 优势**: 使用轻量级的HTTP客户端，无需下载浏览器，部署更简单！专注于内容清理和优化。

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

## 🔨 API 参考

### `extract_web_content`

智能提取网页内容并转换为Markdown格式。

#### 参数

| 参数 | 类型 | 必需 | 默认值 | 描述 |
|------|------|------|--------|------|
| `url` | string | ✅ | - | 要提取内容的网页URL |
| `format` | string | ❌ | `markdown` | 返回格式：`markdown` 或 `json` |
| `timeout` | number | ❌ | `30000` | 页面加载超时时间（毫秒） |

#### 使用示例

```javascript
// 基础用法
extract_web_content({
  url: "https://example.com/article"
})

// 高级用法
extract_web_content({
  url: "https://example.com/article",
  format: "json",
  timeout: 60000
})
```

## 📁 项目结构

```
cleanweb-mcp/
├── 📄 README.md                 # 项目文档
├── 📦 package.json              # 项目配置
├── ⚙️ tsconfig.json             # TypeScript配置
├── 🔧 claude-config-example.json # Claude配置示例
├── 📖 example-usage.md          # 使用示例
├── 🏗️ build/                    # 编译输出
│   ├── index.js
│   └── tools/
│       └── web-content-extractor.js
└── 📝 src/                      # 源代码
    ├── index.ts                 # MCP服务器主入口
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

## 🤝 贡献

欢迎提交Issue和Pull Request！如果你有任何问题或建议，请随时联系我。

## 📞 联系方式

- **GitHub**: [guangxiangdebizi](https://github.com/guangxiangdebizi/)
- **Email**: guangxiangdebizi@gmail.com
- **LinkedIn**: [Xingyu Chen](https://www.linkedin.com/in/xingyu-chen-b5b3b0313/)
- **NPM**: [@xingyuchen](https://www.npmjs.com/~xingyuchen)

## 🔗 相关链接

- **GitHub仓库**: [https://github.com/guangxiangdebizi/cleanweb-mcp](https://github.com/guangxiangdebizi/cleanweb-mcp)
- **NPM包**: [https://www.npmjs.com/package/cleanweb-mcp](https://www.npmjs.com/package/cleanweb-mcp)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件