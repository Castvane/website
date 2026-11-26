import { readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const output = join(process.cwd(), "out");

async function processDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(directory, entry.name);
    const name = relative(output, path).replaceAll("\\", "/");

    if (entry.isDirectory()) {
      await processDirectory(path);
      continue;
    }

    const file = await stat(path);
    if (!file.isFile()) continue;

    if (name.startsWith("_next/static/chunks/") && name.endsWith(".js")) {
      await unlink(path);
      continue;
    }

    if (name.endsWith(".txt") && name !== "robots.txt" && name !== ".well-known/security.txt") {
      await unlink(path);
      continue;
    }

    if (!name.endsWith(".html")) continue;

    const html = await readFile(path, "utf8");
    const withoutExecutableScripts = html.replace(
      /<script\b(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
      "",
    );
    const withoutScriptPreloads = withoutExecutableScripts.replace(
      /<link\b(?=[^>]*\brel=["'](?:preload|modulepreload)["'])(?=[^>]*\b(?:as=["']script["']|href=["'][^"']+\.m?js(?:[?#][^"']*)?["']))[^>]*\/?\s*>/gi,
      "",
    );

    if (withoutScriptPreloads !== html) {
      await writeFile(path, withoutScriptPreloads);
    }
  }
}

await processDirectory(output);
