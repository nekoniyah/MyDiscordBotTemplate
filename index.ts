import { Client, Partials } from "discord.js";
import fs from "fs";
import path from "path";
import "./db";
import "./models";
import "dotenv/config";

const eventPath = path.join(__dirname, "events");

const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
    "GuildMembers",
    "GuildPresences",
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.User,
    Partials.ThreadMember,
  ],
});

async function loadDirectoryEvents(directory: string = eventPath) {
  const eventFiles = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of eventFiles) {
    if (file.isDirectory()) {
      await loadDirectoryEvents(path.join(directory, file.name));
      return;
    }

    const { default: event } = await import(path.join(directory, file.name));
    client.on(
      file.name.replace(".ts", ""),
      async (...args) => await event(...args),
    );
  }
}

await loadDirectoryEvents();

client.login(process.env.TOKEN);
