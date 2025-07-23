import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
// 导入业务工具
import { webContentExtractor } from "./tools/web-content-extractor.js";
// 创建MCP服务器
const server = new Server({
    name: "copycat2jina-mcp-server",
    version: "1.0.0",
}, {
    capabilities: { tools: {} }
});
// 工具注册
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: webContentExtractor.name,
                description: webContentExtractor.description,
                inputSchema: webContentExtractor.parameters
            }
        ]
    };
});
// 工具调用处理
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "extract_web_content":
            return await webContentExtractor.run(request.params.arguments);
        default:
            throw new Error(`Unknown tool: ${request.params.name}`);
    }
});
// 启动服务器
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🚀 CleanWeb MCP服务器已启动');
}
main().catch((error) => {
    console.error("❌ MCP服务器启动失败:", error);
    process.exit(1);
});
