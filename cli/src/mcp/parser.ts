import { existsSync, readFileSync } from "node:fs";

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  estimatedTokens: number;
}

export interface MCPServer {
  name: string;
  command: string;
  args: string[];
  tools: MCPTool[];
}

export interface MCPConfig {
  servers: Record<string, MCPServerConfig>;
}

export interface MCPServerConfig {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

function resolveEnvVars(value: string): string {
  return value.replace(/\$\{(\w+)\}/g, (_, varName) => {
    return process.env[varName] || "";
  });
}

function resolveEnvVarsInConfig(
  config: MCPServerConfig
): MCPServerConfig {
  const resolved: MCPServerConfig = { command: config.command };
  if (config.args) resolved.args = config.args.map(resolveEnvVars);
  if (config.env) {
    resolved.env = Object.fromEntries(
      Object.entries(config.env).map(([k, v]) => [k, resolveEnvVars(v)])
    );
  }
  return resolved;
}

export function parseMCPConfig(configPath?: string): MCPConfig {
  const homedir = process.env.HOME || process.env.USERPROFILE || "";
  const defaultPath = `${homedir}/.claude/settings.json`;

  const path = configPath || defaultPath;

  if (!existsSync(path)) {
    throw new Error(`MCP config not found at ${path}`);
  }

  const raw = readFileSync(path, "utf-8");
  const parsed = JSON.parse(raw);

  const mcpConfig: MCPConfig = {
    servers: {},
  };

  if (parsed.mcpServers) {
    mcpConfig.servers = parsed.mcpServers;
  } else if (parsed.mcp_servers) {
    mcpConfig.servers = parsed.mcp_servers;
  }

  for (const [name, serverConfig] of Object.entries(mcpConfig.servers)) {
    mcpConfig.servers[name] = resolveEnvVarsInConfig(serverConfig);
  }

  return mcpConfig;
}

export function estimateToolTokens(tool: Partial<MCPTool>): number {
  let tokens = 0;

  if (tool.name) tokens += tool.name.length * 0.75;
  if (tool.description) tokens += tool.description.length * 0.75;

  if (tool.inputSchema) {
    const schemaStr = JSON.stringify(tool.inputSchema);
    tokens += schemaStr.length * 0.5;
  }

  return Math.max(Math.ceil(tokens), 10);
}

const TYPICAL_TOOLS_PER_SERVER: Record<string, number> = {
  filesystem: 15,
  github: 25,
  playwright: 30,
  "sequential-thinking": 3,
  memory: 5,
};

const AVG_TOOL_TOKEN_COST = 250;

export function estimateServerTokens(server: Partial<MCPServer>): number {
  if (server.tools && server.tools.length > 0) {
    return server.tools.reduce((sum, t) => sum + t.estimatedTokens, 0);
  }
  const toolCount = TYPICAL_TOOLS_PER_SERVER[server.name || ""] || 10;
  return toolCount * AVG_TOOL_TOKEN_COST;
}

export function generateSavingsReport(
  servers: MCPServer[],
  optimizationPercent: number = 70
): {
  totalTokens: number;
  savedTokens: number;
  remainingTokens: number;
  serverBreakdown: { name: string; current: number; saved: number }[];
} {
  const serverBreakdown = servers.map((s) => ({
    name: s.name,
    current: estimateServerTokens(s),
    saved: Math.floor(estimateServerTokens(s) * (optimizationPercent / 100)),
  }));

  const totalTokens = serverBreakdown.reduce((a, b) => a + b.current, 0);
  const savedTokens = serverBreakdown.reduce((a, b) => a + b.saved, 0);

  return {
    totalTokens,
    savedTokens,
    remainingTokens: totalTokens - savedTokens,
    serverBreakdown,
  };
}
