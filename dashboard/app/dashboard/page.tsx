const serverData = [
  { name: "filesystem", tokens: 3750, tools: 15, color: "bg-green-600" },
  { name: "github", tokens: 6250, tools: 25, color: "bg-green-500" },
  { name: "playwright", tokens: 7500, tools: 30, color: "bg-green-400" },
  { name: "sequential-thinking", tokens: 750, tools: 3, color: "bg-green-300" },
  { name: "memory", tokens: 1250, tools: 5, color: "bg-green-200" },
];

const maxTokens = Math.max(...serverData.map((s) => s.tokens));

const profiles = [
  { name: "default", tokens: 19500, savings: null },
  { name: "coding", tokens: 10000, savings: 49 },
  { name: "debugging", tokens: 8750, savings: 55 },
  { name: "research", tokens: 2000, savings: 90 },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Token usage analytics for your MCP configuration
      </p>

      {/* KPI cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-10">
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-xs text-muted-foreground mb-1">Total tokens</p>
          <p className="text-2xl font-bold">19.5K</p>
          <p className="text-xs text-muted-foreground mt-1">5 servers</p>
        </div>
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-xs text-muted-foreground mb-1">Saved tokens</p>
          <p className="text-2xl font-bold text-green-600">13.7K</p>
          <p className="text-xs text-green-600 mt-1">70% reduction</p>
        </div>
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-xs text-muted-foreground mb-1">Cost saved</p>
          <p className="text-2xl font-bold text-orange-500">$0.04</p>
          <p className="text-xs text-muted-foreground mt-1">per session</p>
        </div>
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-xs text-muted-foreground mb-1">Active profile</p>
          <p className="text-2xl font-bold">default</p>
          <p className="text-xs text-muted-foreground mt-1">all servers</p>
        </div>
      </div>

      {/* Server breakdown */}
      <div className="rounded-lg border border-border/50 p-6 mb-8">
        <h2 className="text-sm font-semibold mb-4">Token usage by server</h2>
        <div className="space-y-3">
          {serverData.map((server) => (
            <div key={server.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-mono text-sm">{server.name}</span>
                <span className="text-muted-foreground text-xs">
                  {server.tokens.toLocaleString()} tokens · {server.tools} tools
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${server.color} transition-all`}
                  style={{ width: `${(server.tokens / maxTokens) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile comparison */}
      <div className="rounded-lg border border-border/50 p-6 mb-8">
        <h2 className="text-sm font-semibold mb-4">Profile comparison</h2>
        <div className="space-y-3">
          {profiles.map((p) => (
            <div key={p.name} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium min-w-20">{p.name}</span>
                <span className="text-xs text-muted-foreground">
                  {p.tokens.toLocaleString()} tokens
                </span>
              </div>
              <span className={`text-xs font-medium ${p.savings ? "text-green-600" : "text-muted-foreground"}`}>
                {p.savings ? `−${p.savings}%` : "baseline"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div className="rounded-lg border border-border/50 p-6">
        <h2 className="text-sm font-semibold mb-2">Quick start</h2>
        <p className="text-xs text-muted-foreground mb-3">
          Run the CLI to analyze your own MCP config and populate this dashboard.
        </p>
        <pre className="text-xs bg-secondary p-3 rounded-lg overflow-x-auto">
          <code>{`npx contextopt analyze
npx contextopt profile -l
npx contextopt start --profile coding`}</code>
        </pre>
      </div>
    </div>
  );
}
