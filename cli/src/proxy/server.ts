import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  PingRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ServerManager } from "./manager.js";
import { ContextOptimizer, ToolEntry } from "./optimizer.js";
import { parseMCPConfig, MCPServerConfig } from "../mcp/parser.js";
import Conf from "conf";

const store = new Conf<{ active: string; profiles: Record<string, { servers: string[] }> }>({
  projectName: "contextopt",
});

interface ProxyOptions {
  configPath?: string;
  profileName?: string;
}

function getProfileServers(profileName?: string): string[] | null {
  try {
    const name = profileName || store.get("active");
    const profiles = store.get("profiles");
    const profile = profiles?.[name];
    return profile?.servers?.length ? profile.servers : null;
  } catch {
    return null;
  }
}

export async function startProxy(options: ProxyOptions): Promise<void> {
  const server = new Server(
    { name: "contextopt", version: "0.1.0" },
    { capabilities: { tools: { listChanged: false } } }
  );

  const manager = new ServerManager();
  const profileServers = getProfileServers(options.profileName);
  const optimizer = new ContextOptimizer(
    profileServers ? { servers: profileServers } : undefined
  );

  const config = parseMCPConfig(options.configPath);

  async function startRelevantServers(): Promise<void> {
    const entries = Object.entries(config.servers);
    const toStart = optimizer.enabledServers.length > 0
      ? entries.filter(([name]) => optimizer.shouldStartServer(name))
      : entries;

    if (toStart.length === 0) {
      console.error(`[proxy] No servers match the active profile. Starting all servers.`);
      for (const [name, serverConfig] of entries) {
        await tryStartServer(name, serverConfig);
      }
    } else {
      for (const [name, serverConfig] of toStart) {
        await tryStartServer(name, serverConfig);
      }
    }
  }

  async function tryStartServer(name: string, serverConfig: MCPServerConfig): Promise<void> {
    try {
      console.error(`[proxy] Starting server: ${name}`);
      await manager.startServer(name, serverConfig);
      console.error(`[proxy] Server "${name}" ready`);
    } catch (error) {
      console.error(`[proxy] Failed to start server "${name}":`, error);
    }
  }

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const allEntries: ToolEntry[] = [];
    const allServers = manager.getAllTools();
    for (const { serverName, tools } of allServers) {
      for (const tool of tools) {
        allEntries.push({
          serverName,
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        });
      }
    }

    const filtered = optimizer.filterTools(allEntries);

    const savings = optimizer.calculateSavings(allEntries, filtered);
    console.error(
      `[proxy] tools/list: ${allEntries.length} total, ${filtered.length} after profile filter (${savings.savingsPercent}% reduction)`
    );

    return {
      tools: filtered.map((t) => ({
        name: t.name,
        description: t.description,
        inputSchema: t.inputSchema,
      })),
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = request.params.arguments;

    const allEntries: ToolEntry[] = [];
    const allServers = manager.getAllTools();
    for (const { serverName, tools } of allServers) {
      for (const tool of tools) {
        allEntries.push({
          serverName,
          name: tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema,
        });
      }
    }

    const match = allEntries.find((t) => t.name === toolName);
    if (!match) {
      throw new Error(`Tool "${toolName}" not found`);
    }

    const serverObj = manager.getServer(match.serverName);
    if (!serverObj) {
      throw new Error(`Server "${match.serverName}" not running for tool "${toolName}"`);
    }

    console.error(`[proxy] tools/call: ${toolName} → ${match.serverName}`);

    const result = await serverObj.client.callTool(
      { name: toolName, arguments: args },
      undefined,
      {}
    );

    return result;
  });

  server.setRequestHandler(PingRequestSchema, async () => ({}));

  console.error(`[proxy] Starting ContextOpt Proxy...`);
  await startRelevantServers();
  console.error(`[proxy] Running servers: ${manager.runningServers.join(", ") || "none"}`);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error(`[proxy] Proxy ready. Connected servers: ${manager.runningServers.join(", ")}`);

  process.on("SIGINT", async () => {
    console.error("\n[proxy] Shutting down...");
    await manager.stopAll();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await manager.stopAll();
    process.exit(0);
  });
}
