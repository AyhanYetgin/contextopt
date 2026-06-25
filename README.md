# ContextOpt — MCP Context Optimizer

<p align="center">
  <b>Reduce AI agent token waste by 60–90%</b>
  <br>
  <a href="https://contextopt.vercel.app">🚀 Live Demo</a>
  ·
  <a href="https://www.npmjs.com/package/contextopt">📦 npm</a>
  ·
  <a href="https://github.com/AyhanYetgin/contextopt">🐙 GitHub</a>
</p>

<p align="center">
  <a href="https://contextopt.vercel.app"><img src="https://img.shields.io/badge/demo-live-green?style=flat&logo=vercel" alt="Vercel"></a>
  <a href="https://www.npmjs.com/package/contextopt"><img src="https://img.shields.io/npm/v/contextopt" alt="npm"></a>
  <a href="https://github.com/AyhanYetgin/contextopt/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AyhanYetgin/contextopt" alt="MIT"></a>
  <img src="https://img.shields.io/github/last-commit/AyhanYetgin/contextopt" alt="last commit">
</p>

---

ContextOpt sits between your AI coding agent (Claude Code, Cursor, Windsurf) and its MCP servers, intelligently filtering tools so only relevant ones consume context.

## Problem

Every MCP server you add brings 10–30 tools into the agent's context. With 5 servers, that's **100+ tool definitions** loaded into every prompt → wasted tokens, slower responses, higher costs.

## Solution

ContextOpt is a **smart proxy** that:

- **Profile-based filtering** — Only expose tools relevant to your current task
  - `coding` → github, filesystem
  - `debugging` → playwright, memory
  - `research` → sequential-thinking, memory
- **Lazy loading** — Only start servers when their tools are first needed
- **Token analytics** — See exactly how many tokens each server costs

## Quick Start

```bash
# Analyze your MCP config
npx contextopt analyze

# Use a profile
npx contextopt profile -s coding

# Start the proxy (connects to your AI agent via stdio)
npx contextopt start --profile coding
```

## Web Dashboard

Upload your MCP config and see live token analysis:

```
https://contextopt.vercel.app
```

- Paste your `~/.claude/settings.json` or upload the file
- See token usage per server with live charts
- Compare profiles and calculate savings
- Upgrade to Pro for HTTP proxy and advanced analytics

## Installation

```bash
# Run directly (no install needed)
npx contextopt analyze

# Or install globally
npm install -g contextopt
```

## Commands

### Analyze

```bash
npx contextopt analyze
```

Shows a breakdown of all MCP servers, estimated token usage, and cost per session.

### Profiles

```bash
# List profiles
npx contextopt profile -l

# Switch profile
npx contextopt profile -s coding

# Create custom profile
npx contextopt profile -c myprofile --servers "github,filesystem"
```

### Proxy

```bash
npx contextopt start --profile coding
```

Starts an MCP proxy that:
1. Connects to the servers in your active profile
2. Discovers their tools
3. Exposes a filtered tool list to your AI agent

## How It Works

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

## Built-in Profiles

| Profile | Servers | Use Case |
|---------|---------|----------|
| `default` | All | Full access |
| `coding` | github, filesystem | Active development |
| `debugging` | playwright, memory | Bug hunting |
| `research` | sequential-thinking, memory | Exploration |

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | CLI analyze, profile management, stdio proxy, basic token estimation |
| Pro | $20/mo | Everything in Free + HTTP proxy, advanced analytics, profile comparison, priority support |

## Tech Stack

| Component | Technology |
|-----------|------------|
| CLI | TypeScript + Commander.js |
| Dashboard | Next.js + shadcn/ui + Recharts |
| Runtime | Node.js + MCP SDK |
| Auth | Clerk (GitHub OAuth) |
| Payments | Lemon Squeezy |
| Storage | conf (JSON-based) + Clerk metadata |

## License

MIT
