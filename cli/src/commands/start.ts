import { Command } from "commander";
import chalk from "chalk";
import { startProxy } from "../proxy/server.js";

export const startCommand = new Command("start")
  .description("Start the MCP context optimizer proxy")
  .option("-p, --port <port>", "Proxy port (reserved for HTTP mode)", "3001")
  .option("--profile <name>", "Configuration profile to use")
  .option("-c, --config <path>", "Path to MCP config file")
  .action(async (options) => {
    try {
      console.error(chalk.bold("\n🚀 ContextOpt Proxy\n"));
      console.error(`  ${chalk.cyan("Profile:")} ${options.profile || "default"}`);
      if (options.config) {
        console.error(`  ${chalk.cyan("Config:")}  ${options.config}`);
      }
      console.error(chalk.dim("\n   Starting proxy — waiting for MCP client connection...\n"));

      await startProxy({
        configPath: options.config,
        profileName: options.profile,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`✖ ${error.message}`));
      }
      process.exit(1);
    }
  });
