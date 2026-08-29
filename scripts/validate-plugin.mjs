#!/usr/bin/env node
// Zero-dependency validator for the legal-contract-review Claude Code plugin.
// Checks manifest JSON, skill structure/frontmatter, and command frontmatter.
// Exits non-zero if any error is found so CI fails the build.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function readJSON(rel) {
  const p = join(root, rel);
  if (!existsSync(p)) { err(`Missing file: ${rel}`); return null; }
  try { return JSON.parse(readFileSync(p, "utf8")); }
  catch (e) { err(`Invalid JSON in ${rel}: ${e.message}`); return null; }
}

// Parse a very small subset of YAML frontmatter: leading `key: value` lines
// between the first two `---` fences. Sufficient for SKILL.md / command files.
function parseFrontmatter(rel) {
  const p = join(root, rel);
  const text = readFileSync(p, "utf8").replace(/^﻿/, "");
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = text.slice(3, end).trim();
  const out = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return out;
}

// 1) plugin.json
const plugin = readJSON(".claude-plugin/plugin.json");
if (plugin) {
  for (const f of ["name", "version", "description"]) {
    if (!plugin[f]) err(`plugin.json missing required field: ${f}`);
  }
  if (plugin.name && !/^[a-z0-9-]+$/.test(plugin.name))
    err(`plugin.json name should be kebab-case: "${plugin.name}"`);
  if (plugin.version && !/^\d+\.\d+\.\d+/.test(plugin.version))
    warn(`plugin.json version is not semver-like: "${plugin.version}"`);
}

// 2) marketplace.json
const market = readJSON(".claude-plugin/marketplace.json");
if (market) {
  if (!market.name) err("marketplace.json missing required field: name");
  if (!Array.isArray(market.plugins) || market.plugins.length === 0)
    err("marketplace.json must list at least one plugin in `plugins`");
  else for (const [i, p] of market.plugins.entries()) {
    if (!p.name) err(`marketplace.json plugins[${i}] missing name`);
    if (!p.source) err(`marketplace.json plugins[${i}] missing source`);
  }
  if (plugin && market.plugins?.some((p) => p.name) &&
      !market.plugins.some((p) => p.name === plugin.name))
    warn(`No marketplace entry matches plugin.json name "${plugin.name}"`);
}

// 3) skills/*/SKILL.md
const skillsDir = join(root, "skills");
let skillCount = 0;
if (existsSync(skillsDir)) {
  for (const d of readdirSync(skillsDir)) {
    const dir = join(skillsDir, d);
    if (!statSync(dir).isDirectory()) continue;
    skillCount++;
    const rel = `skills/${d}/SKILL.md`;
    if (!existsSync(join(root, rel))) { err(`Skill "${d}" missing ${rel}`); continue; }
    const fm = parseFrontmatter(rel);
    if (!fm) { err(`${rel} has no YAML frontmatter`); continue; }
    if (!fm.name) err(`${rel} frontmatter missing "name"`);
    else if (fm.name !== d) err(`${rel} name "${fm.name}" must match folder "${d}"`);
    if (!fm.description) err(`${rel} frontmatter missing "description"`);
    else if (fm.description.length < 20)
      warn(`${rel} description is very short — descriptions drive skill routing`);
  }
}
if (skillCount === 0) warn("No skills found under skills/");

// 4) commands/*.md
const cmdDir = join(root, "commands");
if (existsSync(cmdDir)) {
  for (const f of readdirSync(cmdDir)) {
    if (!f.endsWith(".md")) continue;
    const rel = `commands/${f}`;
    const fm = parseFrontmatter(rel);
    if (!fm) { err(`${rel} has no YAML frontmatter`); continue; }
    if (!fm.description) err(`${rel} frontmatter missing "description"`);
  }
}

// Report
console.log(`Checked plugin "${plugin?.name ?? "?"}" — ${skillCount} skill(s).`);
for (const w of warnings) console.log(`::warning::${w}`);
if (errors.length) {
  for (const e of errors) console.log(`::error::${e}`);
  console.error(`\nFAILED with ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`\nOK — ${warnings.length} warning(s), no errors.`);
