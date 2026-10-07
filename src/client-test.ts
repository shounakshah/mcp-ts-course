import { MCPClient } from "./mcp-client.js";

async function main() {
  const client = new MCPClient("node", ["dist/index.js"]);
  await client.connect();

  const tools = await client.listTools();
  console.log(
    "Available tools:",
    tools.map((tool) => tool.name)
  );

  const result = await client.callTool("read_document", {
    docId: "deposition.md",
  });
  console.log("read_document result:", result);

  await client.close();
}

main().catch((error) => {
  console.error("Client error:", error);
  process.exit(1);
});
