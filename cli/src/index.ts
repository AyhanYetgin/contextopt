#!/usr/bin/env node

import { Command } from "commander";
import { analyzeCommand } from "./commands/analyze.js";
import { startCommand } from "./commands/start.js";
import { profileCommand } from "./commands/profile.js";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(__dirname, "..", "package.json"), "utf-8")
);

const program = new Command();

program
  .name("contextopt")
  .description("MCP Context Optimizer - Reduce AI agent token waste")
  .version(pkg.version);

program.addCommand(analyzeCommand);
program.addCommand(startCommand);
program.addCommand(profileCommand);

program.parse(process.argv);
