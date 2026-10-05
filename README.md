# mcp-ts-course

A TypeScript port of the exercises from Anthropic Academy's
[Introduction to Model Context Protocol](https://academy.claude.com/courses/introduction-to-model-context-protocol)
course. The course examples use Python + FastMCP; this repo follows along
using the official [TypeScript MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk).

## Setup

```bash
npm install
npm run dev
```

## Project structure

- [src/index.ts](src/index.ts) — MCP server setup and tool registration
- [src/documents.ts](src/documents.ts) — in-memory document store used by the tools

## Tools

- `read_document` — retrieve a document's contents by ID
- `edit_document` — find-and-replace text within a document

## Debugging with the MCP Inspector

```bash
npm run inspector
```
