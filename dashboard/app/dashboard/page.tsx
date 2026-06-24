const serverData = [
  { name: "filesystem", tokens: 3750, tools: 15, bar: "w-3/4" },
  { name: "github", tokens: 6250, tools: 25, bar: "w-full" },
  { name: "playwright", tokens: 7500, tools: 30, bar: "w-full" },
  { name: "sequential-thinking", tokens: 750, tools: 3, bar: "w-1/6" },
  { name: "memory", tokens: 1250, tools: 5, bar: "w-1/5" },
];

const maxTokens = 7500;

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

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-10">
        {[
          { label: "Total tokens", value: "19.5K", sub: "5 servers", color: "" },
          { label: "Saved tokens", value: "13.7K", sub: "70% reduction", color: "text-green-600 dark:text-green-400" },
          { label: "Cost saved", value: "$0.04", sub: "per session", color: "text-orange-500 dark:text-orange-400" },
          { label: "Active profile", value: "default", sub: "all servers", color: "" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-border/50 p-5">
            <p className="text-xs text-muted-foreground mb-1">{k.label}</p>
            <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
            <p className={`text-xs mt-1 ${k.color || "text-muted-foreground"}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-border/50 p-6 mb-8">
        <h2 className="text-sm font-semibold mb-4">Token usage by server</h2>
        <div className="space-y-4">
          {serverData.map((s) => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-mono text-sm">{s.name}</span>
                <span className="text-muted-foreground text-xs">
                  {s.tokens.toLocaleString()} tokens · {s.tools} tools
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500 dark:bg-green-400 transition-all"
                  style={{ width: `${(s.tokens / maxTokens) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border/50 p-6 mb-8">
        <h2 className="text-sm font-semibold mb-4">Profile comparison</h2>
        <div className="space-y-1">
          {profiles.map((p) => (
            <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium min-w-20">{p.name}</span>
                <span className="text-xs text-muted-foreground">
                  {p.tokens.toLocaleString()} tokens
                </span>
              </div>
              <span className={`text-xs font-medium ${p.savings ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                {p.savings ? `−${p.savings}%` : "baseline"}
              </span>
            </div>
          ))}
        </div>
      </div>

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
