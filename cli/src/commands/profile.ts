import { Command } from "commander";
import chalk from "chalk";
import Conf from "conf";

interface Profile {
  servers: string[];
}

interface ProfilesStore {
  active: string;
  profiles: Record<string, Profile>;
}

const store = new Conf<ProfilesStore>({
  projectName: "contextopt",
  defaults: {
    active: "default",
    profiles: {
      default: { servers: [] },
      coding: { servers: ["github", "filesystem"] },
      debugging: { servers: ["playwright", "memory"] },
      research: { servers: ["sequential-thinking", "memory"] },
    },
  },
});

function listProfiles(): void {
  const active = store.get("active");
  const profiles = store.get("profiles");

  console.log(chalk.bold("\n📋 Available Profiles\n"));
  for (const [name, profile] of Object.entries(profiles)) {
    const isActive = name === active;
    const prefix = isActive ? chalk.green("▶") : chalk.dim("•");
    const nameDisplay = isActive ? chalk.cyan(`${name} ${chalk.dim("(active)")}`) : chalk.dim(name);
    const servers =
      profile.servers.length > 0
        ? profile.servers.join(", ")
        : chalk.dim("all servers");
    console.log(`  ${prefix} ${nameDisplay} → ${servers}`);
  }
  console.log();
}

function setActive(name: string): void {
  const profiles = store.get("profiles");
  if (!profiles[name]) {
    console.error(chalk.red(`✖ Profile "${name}" not found`));
    process.exit(1);
  }
  store.set("active", name);
  console.log(chalk.green(`\n✓ Switched to profile "${name}"\n`));
}

function createProfile(name: string, servers?: string[]): void {
  const profiles = store.get("profiles");
  if (profiles[name]) {
    console.error(chalk.red(`✖ Profile "${name}" already exists`));
    process.exit(1);
  }
  profiles[name] = { servers: servers || [] };
  store.set("profiles", profiles);
  console.log(chalk.green(`\n✓ Profile "${name}" created\n`));
}

function deleteProfile(name: string): void {
  if (name === "default") {
    console.error(chalk.red("✖ Cannot delete the default profile"));
    process.exit(1);
  }
  const profiles = store.get("profiles");
  if (!profiles[name]) {
    console.error(chalk.red(`✖ Profile "${name}" not found`));
    process.exit(1);
  }
  delete profiles[name];
  store.set("profiles", profiles);
  if (store.get("active") === name) {
    store.set("active", "default");
  }
  console.log(chalk.green(`\n✓ Profile "${name}" deleted\n`));
}

export const profileCommand = new Command("profile")
  .description("Manage configuration profiles")
  .option("-l, --list", "List all profiles")
  .option("-s, --set <name>", "Set active profile")
  .option("-c, --create <name>", "Create a new profile")
  .option("-d, --delete <name>", "Delete a profile")
  .option("--servers <servers>", "Comma-separated server list (for create)")
  .action((options) => {
    if (options.list) {
      listProfiles();
    } else if (options.create) {
      const servers = options.servers
        ? options.servers.split(",").map((s: string) => s.trim())
        : undefined;
      createProfile(options.create, servers);
    } else if (options.set) {
      setActive(options.set);
    } else if (options.delete) {
      deleteProfile(options.delete);
    } else {
      const active = store.get("active");
      console.log(chalk.bold("\n📋 Active Profile: ") + chalk.cyan(`${active}\n`));
    }
  });
