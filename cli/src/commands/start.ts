import { Command } from "commander";
import chalk from "chalk";
import { startProxy, startHttpProxy } from "../proxy/server.js";

export const startCommand = new Command("start")
  .description("Start the MCP context optimizer proxy")
  .option("-p, --port <port>", "HTTP port (only used with --http)", "3001")
  .option("--profile <name>", "Configuration profile to use")
  .option("-c, --config <path>", "Path to MCP config file")
  .option("--http", "Start in HTTP mode instead of stdio")
  .action(async (options) => {
    try {
      console.error(chalk.bold("\n🚀 ContextOpt Proxy\n"));
      console.error(`  ${chalk.cyan("Mode:")}    ${options.http ? "HTTP" : "stdio"}`);
      console.error(`  ${chalk.cyan("Profile:")} ${options.profile || "default"}`);
      if (options.config) {
        console.error(`  ${chalk.cyan("Config:")}  ${options.config}`);
      }

      if (options.http) {
        console.error(chalk.dim(`\n   Starting HTTP proxy on port ${options.port}...\n`));
        await startHttpProxy({
          configPath: options.config,
          profileName: options.profile,
          port: parseInt(options.port, 10),
        });
      } else {
        console.error(chalk.dim("\n   Starting proxy — waiting for MCP client connection...\n"));
        await startProxy({
          configPath: options.config,
          profileName: options.profile,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`✖ ${error.message}`));
      }
      process.exit(1);
    }
  });
