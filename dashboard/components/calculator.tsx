"use client";

import { useState } from "react";

function calc(sessions: number, servers: number) {
  const tokensPerSession = servers * 10 * 250;
  const monthlyTokens = tokensPerSession * sessions * 30;
  const tokenCost = (monthlyTokens * 3) / 1_000_000;
  const savings = Math.round(tokenCost * 0.7);
  const netPro = savings - 19;
  const netTeam = savings - 49;
  return { tokenCost: Math.round(tokenCost), savings, netPro, netTeam };
}

export function Calculator() {
  const [sessions, setSessions] = useState(50);
  const [servers, setServers] = useState(5);

  const result = calc(sessions, servers);
  const net = result.netPro > 0 ? result.netPro : 0;

  return (
    <div className="rounded-lg border border-border/50 p-6 md:p-8 mt-8 max-w-2xl mx-auto">
      <h3 className="text-sm font-semibold mb-6 text-center">Calculate your savings</h3>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Sessions per day</span>
            <span className="font-semibold">{sessions}</span>
          </div>
          <input
            type="range"
            min={10}
            max={300}
            step={10}
            value={sessions}
            onChange={(e) => setSessions(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
            <span>10</span>
            <span>300</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">MCP servers</span>
            <span className="font-semibold">{servers}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={servers}
            onChange={(e) => setServers(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-3 mt-6">
        <div className="rounded-lg border border-border/50 p-4 text-center">
          <p className="text-[11px] text-muted-foreground mb-0.5">Token cost / mo</p>
          <p className="text-xl font-bold">${result.tokenCost}</p>
        </div>
        <div className="rounded-lg border border-green-500/50 dark:border-green-400/50 p-4 text-center">
          <p className="text-[11px] text-muted-foreground mb-0.5">You save</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">${result.savings}</p>
        </div>
        <div className={`rounded-lg border p-4 text-center ${net > 0 ? "border-green-500 dark:border-green-400" : "border-border/50"}`}>
          <p className="text-[11px] text-muted-foreground mb-0.5">Net profit</p>
          <p className={`text-xl font-bold ${net > 0 ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
            {net > 0 ? `+$${net}/mo` : "—"}
          </p>
        </div>
      </div>

      {net > 0 && (
        <div className="text-center mt-5">
          <p className="text-xs text-muted-foreground mb-2">
            After <span className="font-semibold text-foreground">${result.savings}</span> savings
            minus <span className="font-semibold text-green-600 dark:text-green-400">$19 Pro</span>
          </p>
          <a
            href="/pro"
            className="inline-flex h-10 items-center justify-center rounded-md bg-green-600 px-6 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            Upgrade to Pro — Save ${result.savings}/mo
          </a>
        </div>
      )}
    </div>
  );
}
