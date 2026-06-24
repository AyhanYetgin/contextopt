export function calculateTokenCost(
  text: string,
  model: "claude" | "gpt" = "claude"
): number {
  const multiplier = model === "claude" ? 0.75 : 0.5;
  return Math.max(Math.ceil(text.length * multiplier), 1);
}

export function formatTokenCount(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(1)}M`;
  if (tokens >= 1000) return `${(tokens / 1000).toFixed(1)}K`;
  return `${tokens}`;
}

export function estimateCostUSD(
  tokens: number,
  model: "claude-sonnet" | "claude-haiku" | "gpt-4o" = "claude-sonnet"
): number {
  const rates: Record<string, number> = {
    "claude-sonnet": 3.0 / 1000000,
    "claude-haiku": 0.25 / 1000000,
    "gpt-4o": 2.5 / 1000000,
  };
  return tokens * rates[model];
}
