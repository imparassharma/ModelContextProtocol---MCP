import { McpServer } from "@modelcontextprotocol/server";
import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
const remoteServer = new McpServer({
    name: "remoteServer",
    version: "1.0.0",
});
remoteServer.registerResource("remoteResource", "https://paras-portfolio-ai.web.app/", {
    title: "blogs_remote",
    description: "My portfolio blogs data",
    mimeType: 'text/markdown'
}, async (uri) => {
    return {
        contents: [
            {
                uri: uri.href,
                mimeType: 'text/plain',
                text: 'Hi I am Paras'
            }
        ]
    };
});
function main() {
    const app = new Hono();
    app.all('/mcp', async (c) => {
        const transport = new StreamableHTTPTransport();
        await remoteServer.connect(transport);
        return transport.handleRequest(c);
    });
    serve({
        fetch: app.fetch,
        port: 8787
    });
}
main();
