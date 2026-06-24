import { Command } from "commander";
import chalk from "chalk";
import {
  parseMCPConfig,
  estimateServerTokens,
  generateSavingsReport,
} from "../mcp/parser.js";
import { formatTokenCount, estimateCostUSD } from "../utils/token.js";
import { detectClientConfigs, findBestConfig } from "../utils/config.js";
import Conf from "conf";

const store = new Conf<{ active: string; profiles: Record<string, { servers: string[] }> }>({
  projectName: "contextopt",
});

function getProfileServers(): string[] | null {
  try {
    const active = store.get("active");
    const profiles = store.get("profiles");
    const profile = profiles?.[active];
    return profile?.servers?.length ? profile.servers : null;
  } catch {
    return null;
  }
}

export const analyzeCommand = new Command("analyze")
  .description("Analyze MCP configuration and estimate token usage")
  .option("-c, --config <path>", "Path to MCP config file")
  .option("--json", "Output as JSON")
  .option("--client <name>", "Specify AI client (claude, cursor, windsurf)")
  .action(async (options) => {
    try {
      const profileServers = getProfileServers();
      let configPath = options.config;

      if (!configPath) {
        if (options.client) {
          const configs = detectClientConfigs();
          const match = configs.find((c) => c.client === options.client);
          if (match?.exists) {
            configPath = match.path;
          } else {
            throw new Error(`Config not found for client "${options.client}"`);
          }
        } else {
          const best = findBestConfig();
          if (best) configPath = best.path;
        }
      }

      const config = parseMCPConfig(configPath);

      const servers = Object.entries(config.servers).map(
        ([name, serverConfig]) => ({
          name,
          command: serverConfig.command,
          args: serverConfig.args || [],
          tools: [],
        })
      );

      const filteredServers = profileServers
        ? servers.filter((s) => profileServers.includes(s.name))
        : servers;

      const report = generateSavingsReport(servers, 70);
      const filteredReport = filteredServers.length < servers.length
        ? generateSavingsReport(filteredServers, 70)
        : null;

      if (options.json) {
        console.log(JSON.stringify({ fullReport: report, filteredReport, activeProfile: profileServers ? store.get("active") : null }, null, 2));
        return;
      }

      console.log(chalk.bold("\n🔍 MCP Configuration Analysis\n"));

      const configs = detectClientConfigs();
      const foundConfigs = configs.filter((c) => c.exists);
      if (foundConfigs.length > 0) {
        console.log(chalk.dim("Detected clients:"));
        for (const c of foundConfigs) {
          const mark = configPath === c.path ? chalk.green("✓") : chalk.dim("○");
          console.log(`  ${mark} ${c.label} ${chalk.dim(c.path)}`);
        }
        console.log();
      }

      console.log(`${chalk.dim("Total servers:")} ${servers.length}`);

      for (const s of servers) {
        const isIncluded = !profileServers || profileServers.includes(s.name);
        const prefix = isIncluded ? chalk.green("•") : chalk.dim("•");
        const dimName = isIncluded ? s.name : chalk.dim(s.name);
        const est = estimateServerTokens({ ...s, tools: [] });
        console.log(`  ${prefix} ${dimName} ${chalk.dim(`(${s.command})`)} — ${formatTokenCount(est)} tokens`);
      }

      if (filteredReport) {
        const activeProfile = store.get("active");
        console.log(chalk.bold(`\n📊 Profile: ${chalk.cyan(activeProfile)}\n`));
        console.log(
          `  With profile: ${chalk.green(formatTokenCount(filteredReport.totalTokens))} tokens`
        );
        console.log(
          `   vs all:      ${chalk.red(formatTokenCount(report.totalTokens))} tokens`
        );
        console.log(
          `  Savings:      ${chalk.green(formatTokenCount(report.totalTokens - filteredReport.totalTokens))} tokens (${Math.round((1 - filteredReport.totalTokens / report.totalTokens) * 100)}% reduction)`
        );
      }

      console.log(chalk.bold("\n📊 Token Usage Estimate (all servers)\n"));
      console.log(
        `  Current:  ${chalk.red(formatTokenCount(report.totalTokens))} tokens`
      );
      console.log(
        `  Savings:  ${chalk.green(formatTokenCount(report.savedTokens))} tokens (70% est.)`
      );
      console.log(
        `  After:    ${chalk.green(formatTokenCount(report.remainingTokens))} tokens`
      );

      const costPerSession = estimateCostUSD(report.totalTokens);
      const costSaved = estimateCostUSD(report.savedTokens);
      console.log(chalk.bold("\n💰 Cost Estimate (per session)\n"));
      console.log(`  Current:  $${costPerSession.toFixed(4)}`);
      console.log(`  Savings:  $${costSaved.toFixed(4)}`);

      if (profileServers) {
        console.log(chalk.dim(`\nTip: Use --profile to switch profiles, or run \`contextopt profile -l\`\n`));
      } else {
        console.log(chalk.dim("\nTip: Run `contextopt profile -l` to see available profiles\n"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`✖ ${error.message}`));
      }
      process.exit(1);
    }
  });
