import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCPServerConfig } from "../mcp/parser.js";

interface ManagedServer {
  name: string;
  config: MCPServerConfig;
  client: Client;
  transport: StdioClientTransport;
  tools: ToolDefinition[];
}

interface ToolDefinition {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export class ServerManager {
  private servers: Map<string, ManagedServer> = new Map();

  async startServer(name: string, config: MCPServerConfig): Promise<ToolDefinition[]> {
    if (this.servers.has(name)) {
      return this.servers.get(name)!.tools;
    }

    const transport = new StdioClientTransport({
      command: config.command,
      args: config.args || [],
      env: config.env,
      stderr: "pipe",
    });

    const client = new Client(
      { name: "contextopt", version: "0.1.0" },
      { capabilities: {} }
    );

    client.onerror = (error) => {
      console.error(`[${name}] client error:`, error?.message || error);
    };

    transport.onerror = (error) => {
      console.error(`[${name}] transport error:`, error?.message || error);
    };

    await client.connect(transport);

    const toolsResult = await client.listTools();
    const tools = (toolsResult.tools || []).map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema as Record<string, unknown>,
    }));

    const managed: ManagedServer = {
      name,
      config,
      client,
      transport,
      tools,
    };

    this.servers.set(name, managed);
    return tools;
  }

  async stopServer(name: string): Promise<void> {
    const server = this.servers.get(name);
    if (!server) return;

    try {
      await server.transport.close();
    } catch {
      // ignore close errors
    }
    this.servers.delete(name);
  }

  async stopAll(): Promise<void> {
    const names = Array.from(this.servers.keys());
    await Promise.all(names.map((n) => this.stopServer(n)));
  }

  getTools(name: string): ToolDefinition[] | null {
    return this.servers.get(name)?.tools || null;
  }

  getAllTools(): { serverName: string; tools: ToolDefinition[] }[] {
    const result: { serverName: string; tools: ToolDefinition[] }[] = [];
    for (const [name, server] of this.servers) {
      result.push({ serverName: name, tools: server.tools });
    }
    return result;
  }

  getServer(name: string): ManagedServer | undefined {
    return this.servers.get(name);
  }

  isRunning(name: string): boolean {
    return this.servers.has(name);
  }

  get runningServers(): string[] {
    return Array.from(this.servers.keys());
  }
}
