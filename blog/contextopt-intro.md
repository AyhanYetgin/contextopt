---
title: "I Built an Open Source Tool to Cut Claude Code Token Waste by 70%"
published: false
description: "How ContextOpt reduces MCP tool bloat — from 100+ tool definitions per prompt to just the ones you need."
tags: claude, mcp, opensource, typescript, nextjs
cover_image: https://contextopt.vercel.app/og-image.png
series: false
---

If you use Claude Code (or Cursor, or Windsurf) with MCP servers, you've probably felt it: the prompts getting slower, the token counter creeping up, and your monthly bill growing.

Every MCP server you add brings 10–30 tool definitions into your agent's context. With 5 servers, that's **100+ tool schemas loaded into every single prompt**. Most of those tools aren't relevant to your current task, but you're paying for them anyway — in tokens, latency, and money.

I was spending about **$90/month** on Claude tokens, and a big chunk of that was just tool definitions I wasn't using.

So I built [ContextOpt](https://github.com/AyhanYetgin/contextopt).

## What is ContextOpt?

ContextOpt is a **smart proxy** that sits between your AI agent and its MCP servers. It filters tools by profile so only relevant ones consume context.

```
AI Agent (Claude Code)
       │
       ▼
┌─────────────────┐
│  ContextOpt      │  ← Filters tools by profile
│  Proxy Engine    │  ← Lazily starts servers
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
filesystem  github  ... (only active profile servers)
```

## The Problem

Here's a typical MCP config for Claude Code:

```json
{
  "mcpServers": {
    "filesystem": { "command": "npx", "args": ["-y", "@anthropic/mcp-filesystem"] },
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/github"] },
    "playwright": { "command": "npx", "args": ["-y", "@anthropic/mcp-playwright"] },
    "sequential-thinking": { "command": "npx", "args": ["-y", "@anthropic/mcp-sequential-thinking"] },
    "memory": { "command": "npx", "args": ["-y", "@anthropic/mcp-memory"] }
  }
}
```

That's **5 servers** → **~78 tool definitions** → **~19,500 tokens** per prompt. Every. Single. Message.

If you send 50 messages a day, that's nearly **1M tokens/month** just on tool definitions — about **$90/month** on Claude Sonnet.

## The Solution: Profile-Based Filtering

Instead of loading every tool all the time, ContextOpt groups servers into profiles:

| Profile | Servers Active | Tokens | Savings |
|---------|---------------|--------|---------|
| `default` (all) | 5 servers | ~19.5K | baseline |
| `coding` | filesystem, github | ~10K | 49% |
| `debugging` | playwright, memory | ~8.8K | 55% |
| `research` | sequential-thinking, memory | ~2K | 90% |

When you're coding, you don't need Playwright. When you're debugging, you don't need GitHub. Simple.

## How It Works

### 1. Analyze your current setup

```bash
npx contextopt analyze
```

This reads your MCP config (auto-detects Claude Code, Cursor, or Windsurf) and shows a breakdown of token usage per server, estimated cost, and potential savings.

### 2. Pick a profile

```bash
# List available profiles
npx contextopt profile -l

# Switch to coding profile
npx contextopt profile -s coding

# Create a custom profile
npx contextopt profile -c myprofile --servers "github,filesystem"
```

### 3. Start the proxy

```bash
npx contextopt start --profile coding
```

The proxy connects to only the servers in your active profile, discovers their tools, and exposes the filtered list to your AI agent. Servers you don't need are never started — saving both tokens and system resources.

### HTTP Mode (Pro)

For remote connections, you can run the proxy in HTTP mode:

```bash
npx contextopt start --http --port 3456
```

This uses [Streamable HTTP](https://spec.modelcontextprotocol.io/) transport, so any MCP-compatible client can connect.

## The Web Dashboard

You don't have to use the CLI if you prefer a visual interface. The [live dashboard](https://contextopt.vercel.app) lets you:

- Paste your MCP config and see instant token analysis
- Compare savings across profiles
- See per-server breakdown with charts
- Calculate your monthly savings

![Dashboard](https://contextopt.vercel.app)

## What I Learned Building This

This was my first time working with the [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk). A few things I learned:

**Server lifecycle management is tricky.** MCP servers are spawned as child processes, and you need to handle startup, keepalive, and graceful shutdown. The SDK handles most of this, but I had to build a wrapper around it for lazy loading.

**Token estimation is never exact.** I use a heuristic based on typical tool counts per server (filesystem ~15 tools, github ~25, etc.) and average tool schema size (~250 tokens/tool). It's close enough for planning, but actual usage varies.

**The proxy pattern is powerful.** By acting as a transparent proxy, ContextOpt works with any MCP client without modification. The agent connects to ContextOpt, and ContextOpt connects to the real servers. No config changes needed.

## Try It

```bash
npx contextopt analyze
```

No installation needed — `npx` handles everything.

- **GitHub:** [github.com/AyhanYetgin/contextopt](https://github.com/AyhanYetgin/contextopt)
- **Live Demo:** [contextopt.vercel.app](https://contextopt.vercel.app)
- **npm:** [npmjs.com/package/contextopt](https://www.npmjs.com/package/contextopt)

## Roadmap

- [x] CLI with analyze, profile, start commands
- [x] Profile system with persistent storage
- [x] Proxy engine with lazy tool discovery
- [x] Web dashboard with live token analytics
- [x] HTTP transport for remote connections
- [x] Pro subscription with Lemon Squeezy payments

Up next: usage analytics, team profiles, and a VS Code extension.

---

*ContextOpt is open source (MIT). If you find it useful, consider [sponsoring the project](https://contextopt.vercel.app/pro) or [starring it on GitHub](https://github.com/AyhanYetgin/contextopt).*
