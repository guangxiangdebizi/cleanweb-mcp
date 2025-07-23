# 🌐 CleanWeb MCP

<div align="center">

[![npm version](https://badge.fury.io/js/cleanweb-mcp.svg)](https://www.npmjs.com/package/cleanweb-mcp)
[![GitHub stars](https://img.shields.io/github/stars/guangxiangdebizi/cleanweb-mcp.svg)](https://github.com/guangxiangdebizi/cleanweb-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A lightweight Model Context Protocol (MCP) server**

Specialized in intelligently extracting core web content, automatically filtering ads and irrelevant elements, and converting to clean Markdown format

[🚀 Quick Start](#-quick-start) • [📖 Documentation](#-usage) • [🔧 Configuration](#-claude-configuration) • [🤝 Contributing](#-contributing)

</div>

## ✨ Features

<div align="center">

| 🌐 Smart Extraction | 🧹 Content Cleaning | 📝 Format Conversion | ⚡ Lightweight Deploy |
|:---:|:---:|:---:|:---:|
| Axios + Cheerio + Readability | Auto-filter ads & distractions | HTML → Markdown | Zero browser dependency |

</div>

### 🎯 Core Advantages

- 🌐 **Smart Content Extraction**: Uses Axios + Cheerio + Readability algorithm to extract main web content
- 🧹 **Intelligent Content Cleaning**: Automatically removes ads, navigation, sidebars and other distracting elements
- 📝 **Markdown Conversion**: Converts HTML content to clean Markdown format
- 🖼️ **Image Link Optimization**: Automatically handles overly long image links for better readability
- ⚡ **Lightweight Deployment**: No browser dependencies, simple and fast deployment
- 🔧 **Multiple Output Formats**: Supports pure Markdown or JSON format with metadata
- 🚀 **MCP Protocol**: Fully compatible with Model Context Protocol standard

### 🛠️ Tech Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Cheerio](https://img.shields.io/badge/Cheerio-E34F26?style=for-the-badge&logo=html5&logoColor=white)

</div>

## 🚀 Quick Start

### 📦 Installation

```bash
# Install from npm
npm install cleanweb-mcp

# Or clone the repository
git clone https://github.com/guangxiangdebizi/cleanweb-mcp.git
cd cleanweb-mcp
npm install
```

> **💡 Advantage**: Uses lightweight HTTP client, no browser download required, simpler deployment! Focused on content cleaning and optimization.

## 🔧 Build Project

```bash
npm run build
```

## 🎯 Usage

### 1. Stdio Mode (Local Development)

```bash
npm run mcp:stdio
```

### 2. SSE Mode (via Supergateway)

```bash
npm run mcp:sse
```

Server will start at `http://localhost:3100/sse`

### 3. WebSocket Mode

```bash
npm run mcp:ws
```

### 4. Development Mode (Watch file changes)

```bash
npm run mcp:dev
```

## 🛠️ Claude Configuration

### Stdio Mode Configuration

Add to Claude's configuration file:

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

### SSE Mode Configuration

```json
{
  "mcpServers": {
    "cleanweb-mcp-sse": {
      "type": "sse",
      "url": "http://localhost:3100/sse",
      "timeout": 600
    }
  }
}
```

## 🔨 API Reference

### `extract_web_content`

Intelligently extract web content and convert to Markdown format.

#### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `url` | string | ✅ | - | The web URL to extract content from |
| `format` | string | ❌ | `markdown` | Return format: `markdown` or `json` |
| `timeout` | number | ❌ | `30000` | Page loading timeout (milliseconds) |

#### Usage Examples

```javascript
// Basic usage
extract_web_content({
  url: "https://example.com/article"
})

// Advanced usage
extract_web_content({
  url: "https://example.com/article",
  format: "json",
  timeout: 60000
})
```

## 📁 Project Structure

```
cleanweb-mcp/
├── 📄 README.md                 # Project documentation
├── 📦 package.json              # Project configuration
├── ⚙️ tsconfig.json             # TypeScript configuration
├── 🔧 claude-config-example.json # Claude configuration example
├── 📖 example-usage.md          # Usage examples
├── 🏗️ build/                    # Compiled output
│   ├── index.js
│   └── tools/
│       └── web-content-extractor.js
└── 📝 src/                      # Source code
    ├── index.ts                 # MCP server main entry
    └── tools/
        └── web-content-extractor.ts # Web content extraction tool
```

## 🔄 Migration from Express Server

The original Express server (`server.js`) can still run independently:

```bash
npm start
```

The MCP version provides the same core functionality but integrates with AI assistants through the MCP protocol.

## 🚨 Important Notes

1. **Lightweight Implementation**: Uses HTTP client to fetch static content, no browser dependencies required
2. **Network Access**: Requires access to target websites
3. **Static Content**: Primarily suitable for static HTML content, dynamically rendered content may not be accessible
4. **Timeout Settings**: For slow-loading websites, you can appropriately increase the timeout parameter
5. **Content Optimization**: Automatically optimizes image link display for better readability

## 🤝 Contributing

Welcome to submit Issues and Pull Requests! If you have any questions or suggestions, feel free to contact me.

## 📞 Contact

- **GitHub**: [guangxiangdebizi](https://github.com/guangxiangdebizi/)
- **Email**: guangxiangdebizi@gmail.com
- **LinkedIn**: [Xingyu Chen](https://www.linkedin.com/in/xingyu-chen-b5b3b0313/)
- **NPM**: [@xingyuchen](https://www.npmjs.com/~xingyuchen)

## 🔗 Related Links

- **GitHub Repository**: [https://github.com/guangxiangdebizi/cleanweb-mcp](https://github.com/guangxiangdebizi/cleanweb-mcp)
- **NPM Package**: [https://www.npmjs.com/package/cleanweb-mcp](https://www.npmjs.com/package/cleanweb-mcp)

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details