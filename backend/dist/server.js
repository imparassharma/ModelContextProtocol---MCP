import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio";
import { z } from 'zod';
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";



const server = new McpServer({
    name: "server1",
    version: "1.0.0"
});


server.registerPrompt("greeting-example", {
    title: "Greeting",
    description: "A simple greeting prompt template",
    argsSchema: z.object({
        name: z.string().describe("name to include in greeting")
    })
}, async ({ name }) => {
    return {
        messages: [
            {
                role: 'user',
                content: {
                    type: 'text',
                    text: `Please greet the ${name} in friendly manner and say Hola everytime`
                }
            }
        ]
    };
});
server.registerTool("get_data", {
    description: "Get list of all students ",
    inputSchema: z.object({
        limit: z
            .number()
            .optional()
            .describe("Maximum Number of students to be fetched in the list"),
    }),
}, async ({ limit }) => {
    const lastMonth = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
    const students = [
        {
            id: "STU001",
            name: "Rahul Sharma",
            email: "rahul.sharma@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU002",
            name: "Priya Patel",
            email: "priya.patel@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU003",
            name: "Aman Verma",
            email: "aman.verma@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU004",
            name: "Sneha Gupta",
            email: "sneha.gupta@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU005",
            name: "Arjun Mehta",
            email: "arjun.mehta@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU006",
            name: "Neha Singh",
            email: "neha.singh@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU007",
            name: "Rohan Kapoor",
            email: "rohan.kapoor@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU008",
            name: "Ananya Joshi",
            email: "ananya.joshi@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU009",
            name: "Vikram Nair",
            email: "vikram.nair@gmail.com",
            joinedAt: lastMonth,
        },
        {
            id: "STU010",
            name: "Kavya Iyer",
            email: "kavya.iyer@gmail.com",
            joinedAt: lastMonth,
        },
    ];
    return {
        content: [
            {
                type: "text", text: JSON.stringify(students.slice(0, limit))
            }
        ]
    };
});


server.registerResource("blog_data", "https://paras-portfolio-ai.web.app/", {
    title: "Portfolio website blogs",
    description: "This is my portfolio website blogs",
    mimeType: 'text/markdown'
}, async (uri) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const blogPath = path.join(__dirname, "../src/blogs.md");
    const blogs = await readFile(blogPath, "utf-8");
    return {
        contents: [
            {
                uri: uri.href,
                mimeType: "text/markdown",
                text: blogs
            }
        ]
    };
});


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Database MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
