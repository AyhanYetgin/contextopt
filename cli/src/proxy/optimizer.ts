export interface ProfileConfig {
  servers: string[];
}

export interface ToolEntry {
  serverName: string;
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export class ContextOptimizer {
  private profileServers: Set<string>;

  constructor(profile?: ProfileConfig) {
    this.profileServers = new Set(profile?.servers || []);
  }

  setProfile(profile?: ProfileConfig): void {
    this.profileServers = new Set(profile?.servers || []);
  }

  get enabledServers(): string[] {
    return Array.from(this.profileServers);
  }

  filterTools(allTools: ToolEntry[]): ToolEntry[] {
    if (this.profileServers.size === 0) {
      return allTools;
    }
    return allTools.filter((t) => this.profileServers.has(t.serverName));
  }

  shouldStartServer(serverName: string): boolean {
    if (this.profileServers.size === 0) return true;
    return this.profileServers.has(serverName);
  }

  calculateSavings(
    allTools: ToolEntry[],
    filteredTools: ToolEntry[]
  ): { totalTokens: number; savedTokens: number; remainingTokens: number; savingsPercent: number } {
    const AVG_TOOL_TOKENS = 250;
    const totalTokens = allTools.length * AVG_TOOL_TOKENS;
    const remainingTokens = filteredTools.length * AVG_TOOL_TOKENS;

    return {
      totalTokens,
      savedTokens: totalTokens - remainingTokens,
      remainingTokens,
      savingsPercent:
        totalTokens > 0
          ? Math.round((1 - remainingTokens / totalTokens) * 100)
          : 0,
    };
  }
}
