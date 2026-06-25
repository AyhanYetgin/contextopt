"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

interface ServerInfo {
  name: string;
  command: string;
  estimatedTokens: number;
}

interface AnalysisResult {
  servers: ServerInfo[];
  totalTokens: number;
  savedTokens: number;
  remainingTokens: number;
  serverBreakdown: { name: string; current: number; saved: number }[];
}

const formatTokens = (v: number) =>
  v >= 1000 ? `${(v / 1000).toFixed(1)}K` : `${v}`;

const profiles = [
  { name: "default", savings: null },
  { name: "coding", savings: 49 },
  { name: "debugging", savings: 55 },
  { name: "research", savings: 90 },
];

const SAMPLE_CONFIG = `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-filesystem"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/github"]
    }
  }
}`;

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const isPro = (user?.publicMetadata?.plan as string) === "pro";

  const [configInput, setConfigInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("contextopt_config");
    if (saved) {
      try {
        setConfigInput(saved);
        const config = JSON.parse(saved);
        analyzeConfig(config);
      } catch {
        localStorage.removeItem("contextopt_config");
      }
    }
  }, []);

  async function analyzeConfig(config: unknown) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalyze() {
    localStorage.setItem("contextopt_config", configInput);
    const config = JSON.parse(configInput);
    await analyzeConfig(config);
  }

  function handleReset() {
    setResult(null);
    setConfigInput("");
    setError("");
    localStorage.removeItem("contextopt_config");
  }

  if (!isLoaded) return null;

  if (!result) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Analyze your MCP config
          </h1>
          <p className="text-muted-foreground text-sm">
            See which MCP servers cost you the most tokens and how much you can save.
          </p>
        </div>

        <div className="rounded-lg border border-border/50 p-5 mb-6">
          <p className="text-sm font-semibold mb-3">How to get your config</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-0.5 shrink-0">1.</span>
              <div>
                <p className="font-medium">Open your MCP settings file</p>
                <div className="mt-2 space-y-1.5">
                  <code className="block text-xs bg-secondary px-2 py-1 rounded font-mono break-all">~/.claude/settings.json</code>
                  <code className="block text-xs bg-secondary px-2 py-1 rounded font-mono break-all">~/.cursor/mcp.json</code>
                  <code className="block text-xs bg-secondary px-2 py-1 rounded font-mono break-all">~/.windsurf/mcp_config.json</code>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-0.5 shrink-0">2.</span>
              <p>Copy the entire file content (Ctrl+A, Ctrl+C)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs font-mono text-green-600 dark:text-green-400 mt-0.5 shrink-0">3.</span>
              <p>Paste it below — or upload the file directly</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-dashed border-border/50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <textarea
                value={configInput}
                onChange={(e) => setConfigInput(e.target.value)}
                placeholder={SAMPLE_CONFIG}
                rows={10}
                className="w-full bg-transparent border border-border/50 rounded-lg p-4 text-sm font-mono focus:outline-none focus:border-green-500 transition-colors resize-y"
              />
              <label className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer mt-2">
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                Upload file instead
                <input
                  type="file"
                  accept=".json,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      setConfigInput(reader.result as string);
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-2">{error}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-muted-foreground">
              Supports Claude Code, Cursor, and Windsurf configs
            </p>
            <button
              onClick={handleAnalyze}
              disabled={loading || !configInput.trim()}
              className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-5 text-sm font-medium text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Analyzing…" : "Analyze"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalTokens = result.totalTokens;
  const savedTokens = result.savedTokens;
  const costPerSession = (totalTokens * 3) / 1000000;
  const dailyCost = (costPerSession * 50).toFixed(2);
  const weeklyCost = (costPerSession * 250).toFixed(2);

  const chartData = result.serverBreakdown.map((s) => ({
    name: s.name,
    tokens: s.current,
    saved: s.saved,
  }));

  const profileData = profiles.map((p) => {
    if (p.name === "default") {
      return { name: p.name, tokens: totalTokens, savings: null };
    }
    const savingsPct = p.savings! / 100;
    return {
      name: p.name,
      tokens: Math.round(totalTokens * (1 - savingsPct)),
      savings: p.savings,
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Config bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
        <div className="text-xs text-muted-foreground">
          Analyzing <span className="font-semibold text-foreground">{result.servers.length}</span> servers
          <span className="mx-2">·</span>
          {result.servers.map((s) => s.name).join(", ")}
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          Change config →
        </button>
      </div>

      {/* KPI row */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-8">
        {[
          { label: "Total tokens", value: formatTokens(totalTokens), sub: `${result.servers.length} servers`, color: "" },
          { label: "Saved", value: formatTokens(savedTokens), sub: "70% per session", color: "text-green-600 dark:text-green-400" },
          { label: "Cost / session", value: `$${costPerSession.toFixed(3)}`, sub: "Claude Sonnet", color: "text-orange-500 dark:text-orange-400" },
          {
            label: "Your Plan",
            value: isPro ? "Pro" : "Free",
            sub: isPro ? "active" : "upgrade →",
            color: isPro ? "text-green-600 dark:text-green-400" : "",
            link: !isPro ? "/pro" : undefined,
          },
        ].map((k) => {
          const Wrapper = k.link ? "a" : "div";
          const linkProps = k.link ? { href: k.link } : {};
          return (
            <Wrapper key={k.label} {...linkProps} className={`rounded-lg border border-border/50 p-4 ${k.link ? "hover:border-green-500 transition-colors cursor-pointer" : ""}`}>
              <p className="text-xs text-muted-foreground mb-0.5">{k.label}</p>
              <p className={`text-xl font-bold ${k.color || ""}`}>{k.value}</p>
              <p className={`text-[11px] mt-0.5 ${k.color || "text-muted-foreground"}`}>{k.sub}</p>
            </Wrapper>
          );
        })}
      </div>

      {/* Chart + Servers side by side */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border/50 p-5">
          <p className="text-sm font-semibold mb-4">Token usage by server</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: -12, bottom: 0 }}>
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
            {profileData.map((p) => (
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

      {/* Server details */}
      <div className="rounded-lg border border-border/50 p-5 mb-8">
        <p className="text-sm font-semibold mb-3">Server details</p>
        <div className="space-y-2">
          {result.servers.map((s) => (
            <div key={s.name} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-sm truncate">{s.name}</span>
                <span className="text-xs text-muted-foreground truncate font-mono">{s.command}</span>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums ml-4 shrink-0">
                {formatTokens(s.estimatedTokens)} tokens
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CLI commands */}
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
