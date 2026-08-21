#!/usr/bin/env node
/**
 * Nitro's Vercel output traces PGLite JS but often drops pglite.data / .wasm.
 * Copy them into the serverless function so PGLite can boot without DATABASE_URL.
 */
import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const dests = [
  join(root, ".vercel/output/functions/__server.func/_libs"),
  join(root, ".vercel/output/functions/__server.func"),
];
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

let copied = 0;
for (const dest of dests) {
  if (!existsSync(dest)) continue;
  for (const name of files) {
    const from = join(srcDir, name);
    if (!existsSync(from)) continue;
    copyFileSync(from, join(dest, name));
    copied += 1;
    console.log(`[pglite] copied ${name} -> ${dest}`);
  }
}
if (!copied) {
  console.log("[pglite] no Vercel function output yet — skip");
}
