"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const serverData = [
  { name: "filesystem", tokens: 3750, tools: 15 },
  { name: "github", tokens: 6250, tools: 25 },
  { name: "playwright", tokens: 7500, tools: 30 },
  { name: "sequential-thinking", tokens: 750, tools: 3 },
  { name: "memory", tokens: 1250, tools: 5 },
];

const totalTokens = serverData.reduce((a, b) => a + b.tokens, 0);
const savedTokens = Math.round(totalTokens * 0.7);
const costPerSession = (totalTokens * 3) / 1000000;
const dailyCost = (costPerSession * 50).toFixed(2);
const weeklyCost = (costPerSession * 250).toFixed(2);

const profiles = [
  { name: "default", tokens: 19500, savings: null },
  { name: "coding", tokens: 10000, savings: 49 },
  { name: "debugging", tokens: 8750, savings: 55 },
  { name: "research", tokens: 2000, savings: 90 },
];

const formatTokens = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}`;

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* KPI row */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-8">
        {[
          { label: "Total tokens", value: formatTokens(totalTokens), sub: `${serverData.length} servers`, color: "" },
          { label: "Saved", value: formatTokens(savedTokens), sub: "70% per session", color: "text-green-600 dark:text-green-400" },
          { label: "Cost / session", value: `$${costPerSession.toFixed(3)}`, sub: "Claude Sonnet", color: "text-orange-500 dark:text-orange-400" },
          { label: "Active profile", value: "default", sub: "all servers", color: "" },
        ].map((k) => (
          <div key={k.label} className="rounded-lg border border-border/50 p-4">
            <p className="text-xs text-muted-foreground mb-0.5">{k.label}</p>
            <p className={`text-xl font-bold ${k.color}`}>{k.value}</p>
            <p className={`text-[11px] mt-0.5 ${k.color || "text-muted-foreground"}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart + Servers side by side */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-sm font-semibold mb-4">Token usage by server</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={serverData} margin={{ top: 0, right: 0, left: -12, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={formatTokens}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: unknown) => [`${(value as number).toLocaleString()} tokens`, "Usage"]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              />
              <Bar dataKey="tokens" fill="#0a7c5e" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-sm font-semibold mb-4">Profiles</p>
          <div className="space-y-2">
            {profiles.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm min-w-20">{p.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTokens(p.tokens)}
                  </span>
                </div>
                <span
                  className={`text-xs font-medium tabular-nums ${
                    p.savings
                      ? "text-green-600 dark:text-green-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {p.savings ? `−${p.savings}%` : "baseline"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost projection */}
      <div className="rounded-lg border border-border/50 p-5 mb-8">
        <p className="text-sm font-semibold mb-3">Projected savings</p>
        <div className="grid gap-3 grid-cols-3">
          {[
            { label: "Daily (50 sessions)", value: `$${dailyCost}` },
            { label: "Weekly (250 sessions)", value: `$${weeklyCost}` },
            { label: "Monthly (1K sessions)", value: `$${(Number(weeklyCost) * 4).toFixed(2)}` },
          ].map((c) => (
            <div key={c.label} className="text-center">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{c.value}</p>
              <p className="text-[11px] text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <details className="rounded-lg border border-border/50 p-4 group">
        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none">
          CLI commands
        </summary>
        <pre className="text-xs bg-secondary p-3 rounded-lg mt-3 overflow-x-auto">
          <code>{`npx contextopt analyze
npx contextopt profile -l
npx contextopt start --profile coding`}</code>
        </pre>
      </details>
    </div>
  );
}
