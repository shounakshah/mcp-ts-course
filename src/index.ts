import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { documents } from "./documents.js";

const server = new McpServer({
  name: "DocumentMCP",
  version: "0.1.0",
});

server.registerTool(
  "read_document",
  {
    title: "Read Document",
    description: "Retrieve the contents of a document by its ID.",
    inputSchema: {
      docId: z.string().describe("Id of the document to read"),
    },
  },
  async ({ docId }) => {
    if (!(docId in documents)) {
      throw new Error(`Document with id ${docId} not found`);
    }
    return {
      content: [{ type: "text", text: documents[docId] }],
    };
  }
);

server.registerTool(
  "edit_document",
  {
    title: "Edit Document",
    description:
      "Edit a document by replacing a string in its contents with a new string.",
    inputSchema: {
      docId: z.string().describe("Id of the document to edit"),
      oldStr: z
        .string()
        .describe("Text to replace. Must match exactly, including whitespace."),
      newStr: z.string().describe("New text to replace the old text with"),
    },
  },
  async ({ docId, oldStr, newStr }) => {
    if (!(docId in documents)) {
      throw new Error(`Document with id ${docId} not found`);
    }
    documents[docId] = documents[docId].replaceAll(oldStr, newStr);
    return {
      content: [{ type: "text", text: documents[docId] }],
    };
  }
);

server.registerResource(
  "list_documents",
  "docs://documents",
  {
    description: "A list of IDs of all available documents",
    mimeType: "application/json",
  },
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(Object.keys(documents)),
        },
      ],
    };
  }
);

server.registerResource(
  "fetch_document",
  new ResourceTemplate("docs://documents/{docId}", { list: undefined }),
  {
    description: "The contents of a specific document by ID",
    mimeType: "text/plain",
  },
  async (uri, { docId }) => {
    const id = Array.isArray(docId) ? docId[0] : docId;
    if (!(id in documents)) {
      throw new Error(`Document with id ${id} not found`);
    }
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "text/plain",
          text: documents[id],
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DocumentMCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
