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

- [src/index.ts](src/index.ts) — MCP server setup, tool registration, and resource registration
- [src/documents.ts](src/documents.ts) — in-memory document store used by the tools and resources
- [src/mcp-client.ts](src/mcp-client.ts) — `MCPClient` wrapper around the SDK's `Client`/`StdioClientTransport`
- [src/client-test.ts](src/client-test.ts) — standalone script that spawns the server and exercises the client

## Tools

- `read_document` — retrieve a document's contents by ID
- `edit_document` — find-and-replace text within a document

## Resources

- `docs://documents` — static resource listing all available document IDs as JSON
- `docs://documents/{docId}` — templated resource returning one document's contents as plain text

## Debugging with the MCP Inspector

```bash
npm run inspector
```

## Running the client

```bash
npm run build
npm run client
```
