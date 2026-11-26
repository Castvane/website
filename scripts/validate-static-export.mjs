import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const output = join(process.cwd(), "out");
const requiredFiles = [
  "index.html",
  "about/index.html",
  "roadmap/index.html",
  "community/index.html",
  "security/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  ".well-known/security.txt",
  "_headers",
];

for (const file of requiredFiles) {
  await stat(join(output, file));
}

async function validateDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const name = relative(output, path).replaceAll("\\", "/");

    if (entry.isDirectory()) {
      await validateDirectory(path);
      continue;
    }

    if (!name.endsWith(".html")) continue;
    const html = await readFile(path, "utf8");
    const executableScripts = [...html.matchAll(/<script\b([^>]*)>/gi)].filter(
      ([, attributes]) => !/\btype=["']application\/ld\+json["']/i.test(attributes),
    );
    assert.equal(executableScripts.length, 0, `${name} must not include executable scripts`);
    assert.doesNotMatch(
      html,
      /<link\b[^>]*\bas=["']script["']/i,
      `${name} must not preload scripts`,
    );
    assert.doesNotMatch(
      html,
      /(?:src|href)=["'][^"']+\.m?js(?:[?#][^"']*)?["']/i,
      `${name} must not reference JavaScript assets`,
    );
  }
}

await validateDirectory(output);
const securityTxt = await readFile(join(output, ".well-known/security.txt"), "utf8");
for (const field of ["Contact:", "Expires:", "Canonical:", "Preferred-Languages:"]) {
  assert.ok(securityTxt.includes(`${field} `), `security.txt must include ${field}`);
}
const expires = securityTxt.match(/^Expires: (.+)$/m)?.[1];
assert.ok(
  expires && Date.parse(expires) > Date.now(),
  "security.txt expiration must be in the future",
);

process.stdout.write(
  "Static export includes all public routes, SEO files, headers, and no executable JavaScript.\n",
);
