import { describe, it, expect } from "vitest";
import { calculateTokenCost, formatTokenCount, estimateCostUSD } from "./token.js";

describe("calculateTokenCost", () => {
  it("calculates claude tokens", () => {
    const result = calculateTokenCost("hello world", "claude");
    expect(result).toBe(9);
  });

  it("returns at least 1 token", () => {
    const result = calculateTokenCost("", "claude");
    expect(result).toBe(1);
  });
});

describe("formatTokenCount", () => {
  it("formats thousands", () => {
    expect(formatTokenCount(1500)).toBe("1.5K");
  });

  it("formats millions", () => {
    expect(formatTokenCount(1500000)).toBe("1.5M");
  });

  it("formats small numbers", () => {
    expect(formatTokenCount(750)).toBe("750");
  });
});

describe("estimateCostUSD", () => {
  it("estimates claude-sonnet cost", () => {
    const cost = estimateCostUSD(1000000, "claude-sonnet");
    expect(cost).toBe(3.0);
  });

  it("estimates claude-haiku cost", () => {
    const cost = estimateCostUSD(1000000, "claude-haiku");
    expect(cost).toBe(0.25);
  });
});
