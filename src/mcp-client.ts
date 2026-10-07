import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport;

  constructor(serverCommand: string, serverArgs: string[] = []) {
    this.client = new Client({ name: "document-client", version: "0.1.0" });
    this.transport = new StdioClientTransport({
      command: serverCommand,
      args: serverArgs,
    });
  }

  async connect(): Promise<void> {
    await this.client.connect(this.transport);
  }

  async listTools() {
    const response = await this.client.listTools();
    return response.tools;
  }

  async callTool(toolName: string, toolArgs: Record<string, unknown>) {
    return await this.client.callTool({ name: toolName, arguments: toolArgs });
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
