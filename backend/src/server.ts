import { McpServer } from "@modelcontextprotocol/server"
import { StdioServerTransport } from "@modelcontextprotocol/server/stdio"
import { z } from 'zod'


const server = new McpServer({
    name: "server1",
    version: "1.0.0"
})

server.registerPrompt(
    "greeting-example",
    {
        title: "Greeting",
        description: "A simple greeting prompt template",
        argsSchema: z.object({
            name: z.string().describe("name to include in greeting")
        })
    },
    async ({ name }) => {
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
        }
    }
)

server.registerTool(
    "get_data",
    {
        description: "Get list of all students ",
        inputSchema: z.object({
            limit: z
                .number()
                .optional()
                .describe("Maximum Number of students to be fetched in the list"),
        }),
    },
    async ({ limit }) => {

        const lastMonth = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0]
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
        }
    }
)

server.registerResource(
    "blog_data",
    "https://paras-portfolio-ai.web.app/",
    {
        title: "Portfolio website blogs",
        description: "This is my portfolio website blogs",
        mimeType: 'text/plain'
    },
    async (uri) => {
        return {
            contents: [
                {
                    uri: uri.href,
                    text: `
# Portfolio Blog Repository Text Database
# AI Engineering & Agentic AI Learning Series
# Each blog post must start with === BLOG POST ===
# Use [CONTENT] to separate metadata from markdown content.

=== BLOG POST ===
slug: understanding-llms-from-scratch
title: Understanding LLMs From Scratch — The Foundation of Modern Generative AI
excerpt: A beginner-friendly deep dive into transformers, attention mechanisms, embeddings, and how Large Language Models actually work behind the scenes.
tag: Generative AI Foundations
date: May 24, 2026
readTime: 8 min read


# Understanding LLMs From Scratch — The Foundation of Modern Generative AI

The rise of Generative AI has completely transformed the software industry. From coding assistants and research copilots to intelligent chatbots and autonomous agents, Large Language Models are now becoming the cognitive engines behind modern digital products. Yet many beginners enter the field using APIs without deeply understanding what an LLM actually is.

At its core, a Large Language Model is simply a next-token prediction system trained on massive datasets. That definition may initially sound underwhelming, but the scale and architecture behind modern models make them incredibly powerful. The model studies billions of text patterns and learns how language, reasoning, and contextual relationships work.

When a user types a prompt, the model does not “think” like a human. Instead, it predicts the most probable next token based on previous tokens in the sequence. Over billions of training examples, this process creates surprisingly intelligent behavior.


One of the biggest breakthroughs in modern AI came from the Transformer architecture introduced in the paper “Attention Is All You Need.” Before transformers, models struggled with long context understanding. Attention mechanisms solved this by allowing the model to focus on important words relative to other words in a sentence.

For example, in the sentence:

“The animal didn’t cross the road because it was tired.”

the model understands that “it” refers to “animal.” This relationship is learned through attention.

Another important concept is embeddings. LLMs cannot directly understand human language. They first convert text into vector representations called embeddings. These vectors capture semantic meaning mathematically, allowing similar concepts to exist closer together in vector space.

This foundation becomes extremely important later while learning:
- Retrieval-Augmented Generation (RAG)
- semantic search
- vector databases
- conversational memory
- recommendation systems

Understanding LLMs deeply changes the way AI engineers build products. Instead of treating AI as magic, engineers begin thinking about:
- context windows
- token optimization
- hallucinations
- orchestration
- memory systems
- retrieval pipelines

This shift from “prompt user” to “AI systems engineer” is one of the most important transitions in modern AI development.

---

=== BLOG POST ===
slug: tool-calling-agentic-ai
title: Tool Calling Explained Simply — How AI Agents Interact With The Real World
excerpt: Understanding how modern AI systems use tools, APIs, and external functions to become intelligent action-oriented agents.
tag: Agentic AI
date: May 24, 2026
readTime: 7 min read

[CONTENT]
# Tool Calling Explained Simply — How AI Agents Interact With The Real World

Early LLMs were impressive text generators, but they had one major limitation: they could not interact with external systems. They could answer from training data, but they could not fetch live weather, search the internet, access databases, or perform actions in the real world.

Tool calling changed this completely.

Tool calling allows an LLM to decide when external functionality is required and generate structured instructions for using that functionality. This transformed AI from passive text generation into active orchestration systems.


An important engineering concept is that the LLM itself does not directly execute tools. The backend application executes them. The model only generates structured instructions.



Your backend then performs the actual API request using services like Tavily Search or News APIs.

This architecture is foundational to:
- AI copilots
- research assistants
- coding agents
- browser automation systems
- enterprise AI workflows

Tool calling also introduces the concept of orchestration loops. An AI system may:
- search the web
- analyze results
- retry searches
- summarize findings
- use multiple tools together

This is the beginning of Agentic AI.

One of the most valuable lessons while building tool-calling systems is understanding that AI products are no longer just prompts and responses. They are orchestrated systems involving:
- memory
- reasoning
- APIs
- tools
- backend workflows
- state management

As AI products continue evolving, orchestration and tool integration are becoming just as important as the models themselves.

---

=== BLOG POST ===
slug: conversational-memory-systems
title: Conversational Memory in AI Chatbots — What Actually Happens Behind The Scenes
excerpt: Exploring how AI assistants remember conversations using backend memory systems, caching, orchestration, and contextual replay.
tag: AI Memory Systems
date: May 24, 2026
readTime: 8 min read

[CONTENT]
# Conversational Memory in AI Chatbots — What Actually Happens Behind The Scenes

One of the most fascinating experiences in modern AI applications is conversational memory. You tell the assistant your name once, and several messages later it still remembers the context naturally.

For many users, this creates the illusion that the AI truly “remembers” conversations like a human brain. In reality, most AI memory systems are engineered through backend state management.

Modern LLMs generally do not permanently remember your conversations by default. Instead, developers store conversation history and replay relevant context during future requests.


Many beginners initially implement memory using frontend React state. This approach works surprisingly well for prototypes because the frontend simply stores previous messages and resends them during every request.

However, production AI systems usually move memory management to the backend.

Why?

Because backend memory provides:
- centralized orchestration
- secure hidden prompts
- multi-device continuity
- scalable architecture
- reduced frontend payloads

When implementing systems using NodeCache, Redis, or databases, the frontend can simply send:
- threadId
- latest user message

while the backend reconstructs the full conversational history internally.

One of the most important realizations for AI engineers is that simple caching alone does not automatically reduce LLM token usage. If the backend still sends the entire conversation history to the model, token costs remain similar.

Real token optimization usually comes from:
- conversation summarization
- sliding context windows
- semantic retrieval
- vector memory systems

This is why advanced AI systems increasingly combine:
- short-term memory
- long-term memory
- vector embeddings
- retrieval pipelines
- semantic search

Conversational memory is rapidly becoming one of the defining pillars of Agentic AI systems because autonomous workflows require persistent contextual awareness over long periods of interaction.

---

=== BLOG POST ===
slug: structured-output-and-json-schema
title: Why Structured Outputs Matter in AI Engineering
excerpt: Understanding JSON schemas, structured outputs, validation systems, and why production AI applications rely heavily on predictable data formats.
tag: AI Engineering
date: May 24, 2026
readTime: 6 min read

[CONTENT]
# Why Structured Outputs Matter in AI Engineering

One of the biggest challenges in production AI systems is reliability. Human language is flexible and unpredictable, but software systems require structured and deterministic outputs.

This is where structured outputs become extremely important.

Instead of allowing the model to generate completely free-form text, engineers can define schemas that force the model to follow predictable structures.

This approach becomes critical in:
- tool calling
- automation systems
- enterprise workflows
- AI pipelines
- backend integrations

Without structured outputs, AI responses may:
- omit fields
- generate invalid formats
- hallucinate parameters
- break downstream systems

A simple JSON schema may define:
- required fields
- parameter types
- validation rules
- output structure



This guarantees that the model always includes a valid city parameter before a weather tool executes.

Structured outputs are one of the key transitions from hobby AI applications to production-grade AI systems. Once AI starts interacting with APIs, databases, and automation workflows, predictable outputs become essential.

Modern AI engineering increasingly revolves around creating reliable orchestration layers around probabilistic models. Structured schemas are one of the most important tools enabling that reliability.

---

=== BLOG POST ===
slug:langgraph-and-agent-workflows
title: Understanding LangGraph — The Future of Stateful AI Agents
excerpt: Exploring how LangGraph enables cyclic workflows, memory-aware orchestration, and multi-step reasoning for advanced AI agents.
tag: Agentic AI Frameworks
date: May 24, 2026
readTime: 7 min read

[CONTENT]
# Understanding LangGraph — The Future of Stateful AI Agents

As AI systems become more autonomous, traditional prompt-response pipelines are no longer sufficient. Modern AI products increasingly require:
- memory
- tool orchestration
- retries
- loops
- branching logic
- multi-step reasoning

This is where LangGraph becomes extremely important.

LangGraph is a framework built on top of LangChain for creating stateful and cyclic AI workflows using graph-based execution.

A useful way to understand the difference is this:

LangChain is often similar to a linear pipeline.

LangGraph behaves more like an intelligent workflow network where the AI can revisit previous steps, use tools repeatedly, and maintain persistent state across reasoning cycles.

A simplified graph workflow may look like this:


This looping capability is one of the biggest reasons LangGraph is becoming important in Agentic AI engineering.

The framework introduces powerful concepts such as:
- state management
- cyclic execution
- durable workflows
- multi-agent systems
- checkpointing
- human-in-the-loop orchestration

When developers manually build:
- tool execution loops
- conversational memory
- reasoning pipelines

they are already implementing primitive forms of LangGraph-style orchestration.

Modern AI systems are rapidly moving away from simple prompts toward orchestrated intelligent systems. Frameworks like LangGraph represent this transition very clearly.

As enterprise AI products evolve, workflow orchestration may become just as important as the models themselves.
`
                }
            ]
        }
    }
)


async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Database MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});