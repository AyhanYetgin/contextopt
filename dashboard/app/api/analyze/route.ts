import { NextRequest, NextResponse } from "next/server";

const TYPICAL_TOOLS_PER_SERVER: Record<string, number> = {
  filesystem: 15,
  github: 25,
  playwright: 30,
  "sequential-thinking": 3,
  memory: 5,
};

const AVG_TOOL_TOKEN_COST = 250;

function estimateServerTokens(name: string): number {
  const toolCount = TYPICAL_TOOLS_PER_SERVER[name] || 10;
  return toolCount * AVG_TOOL_TOKEN_COST;
}

function generateSavingsReport(servers: { name: string }[], optimizationPercent = 70) {
  const serverBreakdown = servers.map((s) => {
    const current = estimateServerTokens(s.name);
    return {
      name: s.name,
      current,
      saved: Math.floor(current * (optimizationPercent / 100)),
    };
  });

  const totalTokens = serverBreakdown.reduce((a, b) => a + b.current, 0);
  const savedTokens = serverBreakdown.reduce((a, b) => a + b.saved, 0);

  return {
    totalTokens,
    savedTokens,
    remainingTokens: totalTokens - savedTokens,
    serverBreakdown,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawConfig = body.config;

    if (!rawConfig) {
      return NextResponse.json(
        { error: "Missing 'config' in request body" },
        { status: 400 }
      );
    }

    const mcpServers = rawConfig.mcpServers || rawConfig.mcp_servers;
    if (!mcpServers || typeof mcpServers !== "object") {
      return NextResponse.json(
        { error: "Config must contain mcpServers or mcp_servers object" },
        { status: 400 }
      );
    }

    const servers = Object.entries(mcpServers).map(([name, serverConfig]: [string, any]) => ({
      name,
      command: serverConfig.command || "",
      args: serverConfig.args || [],
    }));

    const report = generateSavingsReport(servers);

    return NextResponse.json({
      servers: servers.map((s) => ({
        name: s.name,
        command: s.command,
        estimatedTokens: estimateServerTokens(s.name),
      })),
      ...report,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
