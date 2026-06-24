import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export type ToolClient = "claude" | "cursor" | "windsurf";

export interface DetectedConfig {
  client: ToolClient;
  label: string;
  path: string;
  exists: boolean;
}

const CLIENT_PATHS: Record<ToolClient, { label: string; path: string }> = {
  claude: { label: "Claude Code", path: join(homedir(), ".claude", "settings.json") },
  cursor: { label: "Cursor", path: join(homedir(), ".cursor", "mcp.json") },
  windsurf: { label: "Windsurf", path: join(homedir(), ".windsurf", "mcp_config.json") },
};

export function detectClientConfigs(): DetectedConfig[] {
  return Object.entries(CLIENT_PATHS).map(([client, info]) => ({
    client: client as ToolClient,
    label: info.label,
    path: info.path,
    exists: existsSync(info.path),
  }));
}

export function findBestConfig(): { client: ToolClient; path: string } | null {
  const configs = detectClientConfigs();
  const existing = configs.filter((c) => c.exists);
  if (existing.length === 0) return null;
  return { client: existing[0].client as ToolClient, path: existing[0].path };
}

export function readConfigFile(path: string): Record<string, unknown> | null {
  try {
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}
