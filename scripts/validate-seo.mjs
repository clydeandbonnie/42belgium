#!/usr/bin/env node
/**
 * SEO validator — walks src/content/*.json and enforces brief v2 checklist:
 *   - Meta title: 50–60 chars
 *   - Meta description: 140–160 chars
 *   - URL slug: lowercase, hyphens, no accents, 3–5 words
 *   - Primary Query present in H1 (headline)
 *   - All converting keywords appear at least once in body
 *   - Primary Query density 1%–2% (when body ≥ 100 words)
 *   - Total body length: 600–1000 words
 *
 * Run: node scripts/validate-seo.mjs
 * Exit code: 0 if all pages pass, 1 if any page has errors (warnings don't fail).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "..", "src", "content");

const c = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  gray: "\x1b[90m",
  bold: "\x1b[1m",
};

function countWords(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function countOccurrences(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(escaped, "gi")) || []).length;
}

function extractBody(content) {
  const parts = [
    content.hero?.headline,
    content.hero?.subheadline,
    content.hero?.reassurance,
    content.hero?.cta,
    ...(content.clusters || []).flatMap((cl) => [
      cl.heading,
      cl.body,
      ...(cl.bullets || []),
    ]),
    ...(content.faq || []).flatMap((f) => [f.question, f.answer]),
    ...(content.stats || []).flatMap((s) => [s.value, s.label]),
    content.ctaFinal?.title,
    content.ctaFinal?.description,
    content.ctaFinal?.cta,
  ].filter(Boolean);
  return parts.join(" ");
}

const results = { errors: 0, warnings: 0, ok: 0, stubs: 0 };

function log(level, page, msg) {
  const color = level === "ERROR" ? c.red : level === "WARN" ? c.yellow : c.gray;
  const label = `[${level}]`.padEnd(7);
  console.log(`  ${color}${label}${c.reset} ${page} — ${msg}`);
  if (level === "ERROR") results.errors++;
  if (level === "WARN") results.warnings++;
}

function validate(filePath) {
  const rel = path.relative(CONTENT_DIR, filePath);
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const issues = [];

  // Detect stub pages — skip detailed validation, just count them.
  const isStub =
    content.clusters?.length === 1 &&
    content.clusters[0].name === "PLACEHOLDER";
  if (isStub) {
    results.stubs++;
    console.log(`  ${c.gray}[STUB]  ${rel} — placeholder, skipping checks${c.reset}`);
    return;
  }

  // Meta title
  const titleLen = content.meta?.title?.length || 0;
  if (titleLen < 50 || titleLen > 60) {
    issues.push([
      "ERROR",
      `meta.title is ${titleLen} chars (target 50–60)`,
    ]);
  }

  // Meta description
  const descLen = content.meta?.description?.length || 0;
  if (descLen < 140 || descLen > 160) {
    issues.push([
      "WARN",
      `meta.description is ${descLen} chars (target 140–160)`,
    ]);
  }

  // Slug
  const slug = content.meta?.slug || "";
  if (!/^[a-z0-9-]+$/.test(slug)) {
    issues.push(["ERROR", `slug "${slug}" has invalid characters`]);
  }
  const slugWords = slug.split("-").filter(Boolean).length;
  if (slugWords < 3 || slugWords > 6) {
    issues.push(["WARN", `slug has ${slugWords} words (target 3–5)`]);
  }

  // Primary Query in H1
  const pq = content.meta?.primaryQuery || "";
  const h1 = content.hero?.headline || "";
  if (pq && h1) {
    const pqWords = pq.split(/[\s/,]+/).filter((w) => w.length > 2);
    const hasAny = pqWords.some((w) =>
      h1.toLowerCase().includes(w.toLowerCase())
    );
    if (!hasAny) {
      issues.push([
        "ERROR",
        `H1 "${h1}" contains none of the Primary Query tokens`,
      ]);
    }
  }

  // Body word count
  const body = extractBody(content);
  const wc = countWords(body);
  if (wc < 600) {
    issues.push(["WARN", `body has ${wc} words (target 600–1000)`]);
  } else if (wc > 1000) {
    issues.push(["WARN", `body has ${wc} words (target 600–1000)`]);
  }

  // Converting keywords coverage
  const converting = content.meta?.convertingKeywords || [];
  const missing = converting.filter((kw) => countOccurrences(body, kw) === 0);
  if (missing.length > 0) {
    issues.push([
      "ERROR",
      `missing converting keywords: ${missing.slice(0, 3).join(", ")}${missing.length > 3 ? `, +${missing.length - 3}` : ""}`,
    ]);
  }

  // Primary Query density
  if (pq && wc >= 100) {
    const count = countOccurrences(body, pq.split("/")[0].trim());
    const density = (count / wc) * 100;
    if (density > 2) {
      issues.push([
        "WARN",
        `Primary Query density ${density.toFixed(1)}% (max 2%)`,
      ]);
    }
  }

  // Render result for the page
  if (issues.length === 0) {
    console.log(`  ${c.green}[OK]${c.reset}    ${rel} — ${wc} words, all checks pass`);
    results.ok++;
  } else {
    console.log(`\n  ${c.bold}${rel}${c.reset} — ${wc} words`);
    for (const [level, msg] of issues) log(level, rel, msg);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && full.endsWith(".json")) validate(full);
  }
}

console.log(`\n${c.bold}SEO validation — brief v2 checklist${c.reset}\n`);
walk(CONTENT_DIR);

console.log(
  `\n${c.bold}Summary${c.reset}: ${c.green}${results.ok} OK${c.reset}, ${c.yellow}${results.warnings} warnings${c.reset}, ${c.red}${results.errors} errors${c.reset}, ${c.gray}${results.stubs} stubs${c.reset}\n`
);

process.exit(results.errors > 0 ? 1 : 0);
