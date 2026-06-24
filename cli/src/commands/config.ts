import { Command } from "commander";
import chalk from "chalk";
import { getProToken, setProToken, clearProToken } from "../utils/pro.js";

export const configCommand = new Command("config")
  .description("Manage CLI configuration")
  .addCommand(
    new Command("set")
      .description("Set a configuration value")
      .addCommand(
        new Command("token")
          .description("Set your Pro API token")
          .argument("<token>", "API token from dashboard")
          .action((token: string) => {
            setProToken(token);
            console.log(chalk.green("\n✓ Token saved\n"));
          })
      )
  )
  .addCommand(
    new Command("show")
      .description("Show current configuration")
      .action(() => {
        const token = getProToken();
        console.log(chalk.bold("\n📋 CLI Configuration\n"));
        if (token) {
          const masked = token.slice(0, 8) + "…" + token.slice(-4);
          console.log(`  Pro Token: ${chalk.cyan(masked)}`);
        } else {
          console.log(`  Pro Token: ${chalk.dim("not set")}`);
        }
        console.log();
      })
  )
  .addCommand(
    new Command("clear")
      .description("Clear a configuration value")
      .addCommand(
        new Command("token")
          .description("Remove your Pro API token")
          .action(() => {
            clearProToken();
            console.log(chalk.green("\n✓ Token removed\n"));
          })
      )
  );
