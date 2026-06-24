# ContextOpt — MCP Context Optimizer

Reduce AI agent token waste by **60–90%**. ContextOpt sits between your AI coding agent (Claude Code, Cursor, Windsurf) and its MCP servers, intelligently filtering tools so only relevant ones consume context.

## Problem

Every MCP server you add brings 10–30 tools into the agent's context. With 5 servers, that's 100+ tool definitions loaded into every prompt → wasted tokens, slower responses, higher costs.

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

## Installation

```bash
# Run directly (no install needed)
npx contextopt analyze

# Or install globally
npm install -g contextopt
```

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

## Roadmap

- [x] CLI: analyze, profile, start commands
- [x] Profile system with persistent storage
- [x] Proxy engine with lazy tool discovery
- [ ] Dashboard with token analytics
- [ ] HTTP transport for remote connections
- [ ] Usage analytics and recommendations

## Tech Stack

| Component | Technology |
|-----------|------------|
| CLI | TypeScript + Commander.js |
| Runtime | Node.js + MCP SDK |
| Storage | conf (JSON-based) |
| Analytics | Built-in token calculator |

## License

MIT
