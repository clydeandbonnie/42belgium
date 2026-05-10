#!/usr/bin/env node
/**
 * Scaffold cluster JSON files (27 of them: 9 themes × 3 langs) from the
 * lexical matrix data, pre-filled with:
 *   - deterministic values (slug from themes.ts, primaryQuery + cluster names
 *     and keywords from matrix, suggested lpAngle, suggested CTA from matrix)
 *   - empty stats array (filled per-language by the copywriter)
 *   - schemaOrg.course skeleton with provider/url
 *   - "TODO: …" placeholders wherever copy is required
 *
 * The opportunity/* files are NOT touched — opportunity/en is fully written
 * and validated, opportunity/fr & opportunity/nl already have their own
 * meta+hero+clusters that should not be overwritten.
 *
 * Also stubs _common/{fr,nl}.json with placeholders for the 5 shared sections
 * (afterForty, whatYouBuild, realStories, howToApply, openDays) so the
 * structure is in place when the copywriter starts.
 *
 * Usage:
 *   node scripts/scaffold-clusters.mjs           # safe: skip files that exist
 *   node scripts/scaffold-clusters.mjs --force   # overwrite every file
 *
 * Run after sync-matrix.py.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MATRIX_PATH = path.join(ROOT, "src", "data", "matrix.json");
const CONTENT_DIR = path.join(ROOT, "src", "content");
const THEMES_PATH = path.join(ROOT, "src", "lib", "themes.ts");

const FORCE = process.argv.includes("--force");

// Themes whose copy/cluster files we always preserve. opportunity is the
// reference page, painstakingly tuned by the team.
const SKIP_THEMES = new Set(["opportunity"]);

// ─── Read themes.ts to get slugs (avoids re-importing TS in Node) ───
function loadSlugs() {
  const src = fs.readFileSync(THEMES_PATH, "utf-8");
  // themeSlugs is a deeply nested const object; cheap regex parse is enough.
  const m = src.match(/themeSlugs[^=]*=\s*({[\s\S]*?});\s*\n\nexport function/);
  if (!m) throw new Error("Could not find themeSlugs in themes.ts");
  // Convert TS object literal to JSON. Quote unquoted keys, drop trailing commas.
  let body = m[1]
    .replace(/(\w+):/g, '"$1":')
    .replace(/,(\s*[}\]])/g, "$1");
  return JSON.parse(body);
}

const slugs = loadSlugs();
const matrix = JSON.parse(fs.readFileSync(MATRIX_PATH, "utf-8")).entries;

const SITE_URL = "https://42belgium.be";

const STATS_BY_LANG = {
  en: [
    { value: "98%", label: "of advanced grads secure a job" },
    { value: "100%", label: "Free - no tuition" },
    { value: "42", label: "Campuses worldwide" },
    { value: "0", label: "Prerequisites" },
  ],
  fr: [
    { value: "98%", label: "des diplômés du cursus avancé décrochent un job" },
    { value: "100%", label: "Gratuit - aucune frais" },
    { value: "42", label: "Campus dans le monde" },
    { value: "0", label: "Prérequis" },
  ],
  nl: [
    { value: "98%", label: "van de gevorderde afgestudeerden vindt een baan" },
    { value: "100%", label: "Gratis - geen lesgeld" },
    { value: "42", label: "Campussen wereldwijd" },
    { value: "0", label: "Vereisten" },
  ],
};

function buildClusterFile(theme, lang, entry) {
  const slug = slugs[theme][lang];
  const stats = STATS_BY_LANG[lang];

  const clusters = entry.clusters.map((c) => ({
    name: c.name,
    heading: `TODO: H2 reformulating "${c.name}" in copywriting (briefing §4.6)`,
    body: `TODO: 100-150 words integrating ALL keywords below naturally — ${c.keywords.join(", ")}`,
    keywords: c.keywords,
  }));

  // Converting keywords for meta — keep just the bare strings (the matrix
  // entry stores objects with {keyword, raw}). Dedup case-insensitively.
  const seen = new Set();
  const convertingKeywords = [];
  for (const k of entry.convertingKeywords) {
    const kw = k.keyword.toLowerCase();
    if (seen.has(kw)) continue;
    seen.add(kw);
    convertingKeywords.push(k.keyword);
  }

  return {
    _comment: `Scaffolded from matrix.json. Replace every "TODO: …" before merging. See HOW_TO_EDIT.md and lexical matrix v3.`,
    _matrixAnalyse: entry.analyse,
    meta: {
      title: `TODO: 50-60 chars, includes Primary Query "${entry.primaryQuery.split("/")[0].trim()}" + "| 42 Belgium"`,
      description: `TODO: 140-160 chars, integrates 1-2 keywords from cluster 1 (${entry.clusters[0]?.keywords.slice(0, 2).join(", ") || ""})`,
      slug,
      primaryQuery: entry.primaryQuery,
      convertingKeywords,
      lpAngle: entry.lpAngleSuggested,
    },
    hero: {
      headline: `TODO: H1 must contain Primary Query "${entry.primaryQuery.split("/")[0].trim()}" literally (briefing §4.4)`,
      subheadline: `TODO: subline = LP Angle (matrix says "${entry.lpAngleSuggested === "bold" ? entry.lpAngleBold : entry.lpAngleClassic}")`,
      reassurance: "TODO: optional microcopy, e.g. '100% free · No degree required · Brussels & Antwerp'",
      cta: entry.cta,
    },
    clusters,
    faq: [
      { question: "TODO: question 1 (cluster-specific or general)", answer: "TODO: answer" },
      { question: "TODO: question 2", answer: "TODO: answer" },
      { question: "TODO: question 3", answer: "TODO: answer" },
    ],
    stats,
    ctaFinal: {
      title: "TODO: closing headline",
      description: "TODO: closing pitch (1-2 sentences)",
      cta: entry.cta,
    },
    schemaOrg: {
      course: {
        name: `TODO: short course name (e.g. "42 Belgium - ${theme}")`,
        description: "TODO: course description for rich snippet (1-2 sentences)",
        provider: "42 Belgium",
        url: `${SITE_URL}/${lang}/${slug}`,
        courseMode: "blended",
        educationalLevel: "beginner",
      },
    },
  };
}

function buildCommonStub(lang) {
  const todoText =
    lang === "fr"
      ? "À remplir : sections partagées par toutes les LPs FR (afterForty, whatYouBuild, realStories, howToApply, openDays). Voir _common/en.json comme référence de structure."
      : "In te vullen: gedeelde secties voor alle NL LPs (afterForty, whatYouBuild, realStories, howToApply, openDays). Zie _common/en.json als referentie voor de structuur.";
  return {
    _comment: todoText,
    afterForty: {
      heading: "TODO",
      description: "TODO",
      stat: { value: "98%", label: "TODO" },
      careers: [
        { icon: "fa-solid fa-code", label: "TODO" },
        { icon: "fa-solid fa-chart-line", label: "TODO" },
        { icon: "fa-solid fa-shield-halved", label: "TODO" },
        { icon: "fa-solid fa-server", label: "TODO" },
        { icon: "fa-solid fa-mobile-screen", label: "TODO" },
        { icon: "fa-solid fa-rocket", label: "TODO" },
      ],
      communityNote: "TODO",
    },
    whatYouBuild: {
      heading: "TODO",
      intro: "TODO",
      phases: [
        {
          number: "01",
          title: "TODO",
          duration: "TODO",
          icon: "fa-solid fa-code",
          description: "TODO",
          items: ["TODO"],
        },
        {
          number: "02",
          title: "TODO",
          duration: "TODO",
          icon: "fa-solid fa-briefcase",
          description: "TODO",
          items: ["TODO"],
        },
        {
          number: "03",
          title: "TODO",
          duration: "TODO",
          icon: "fa-solid fa-layer-group",
          description: "TODO",
          items: ["TODO"],
          flexibility: ["TODO"],
          globalMobility: "TODO",
        },
        {
          number: "04",
          title: "TODO",
          duration: "TODO",
          icon: "fa-solid fa-rocket",
          description: "TODO",
          items: ["TODO"],
        },
      ],
      plusNote: "TODO",
    },
    realStories: {
      heading: "TODO",
      description: "TODO",
      videos: [
        { name: "Kevin", subtitle: "TODO", youtubeId: "OO_dbpwed3s" },
        { name: "Morgane", subtitle: "TODO", youtubeId: "DGQnrVNZRZ0" },
        { name: "Sam", subtitle: "TODO", youtubeId: "sDcqpzBtjtM" },
      ],
    },
    howToApply: {
      heading: "TODO",
      steps: [
        { number: "01", title: "TODO", description: "TODO" },
        { number: "02", title: "TODO", description: "TODO" },
        { number: "03", title: "TODO", description: "TODO" },
        { number: "04", title: "TODO", description: "TODO" },
      ],
      ctaLabel: "TODO",
      microcopy: "TODO",
    },
    openDays: {
      heading: "TODO",
      intro: "TODO",
      campuses: [
        {
          name: "Brussels",
          address: "Canterssteen 12",
          subHeading: "TODO",
          description: "TODO",
          image: "/assets/gallery/OpenDaysBrussels.png",
        },
        {
          name: "Antwerp",
          address: "Mediaplein 1",
          subHeading: "TODO",
          description: "TODO",
          image: "/assets/gallery/42Belgium-Antwerp1.png",
        },
      ],
      ctaLabel: "TODO",
      ctaHref: "https://www.eventbrite.com/cc/open-days-42-belgium-2935099",
    },
  };
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

let written = 0;
let skipped = 0;

// ─── 1. Cluster files ───
for (const [key, entry] of Object.entries(matrix)) {
  const { theme, lang } = entry;
  if (SKIP_THEMES.has(theme)) {
    console.log(`  skip  ${key} (theme in SKIP_THEMES)`);
    skipped++;
    continue;
  }
  const filePath = path.join(CONTENT_DIR, theme, `${lang}.json`);
  if (fs.existsSync(filePath) && !FORCE) {
    // Check if it's still a stub (PLACEHOLDER cluster). If yes, scaffold over.
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const isStub =
      existing.clusters?.length === 1 &&
      existing.clusters[0].name === "PLACEHOLDER";
    if (!isStub) {
      console.log(`  skip  ${key} (already scaffolded; --force to overwrite)`);
      skipped++;
      continue;
    }
  }
  const data = buildClusterFile(theme, lang, entry);
  writeJson(filePath, data);
  console.log(`  write ${path.relative(ROOT, filePath)}`);
  written++;
}

// ─── 2. _common stubs for FR / NL ───
for (const lang of ["fr", "nl"]) {
  const filePath = path.join(CONTENT_DIR, "_common", `${lang}.json`);
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
    : null;
  // Treat the file as a stub if it has only the _comment key (the original
  // empty placeholder we created earlier).
  const isStub = existing && Object.keys(existing).every((k) => k.startsWith("_"));
  if (existing && !isStub && !FORCE) {
    console.log(`  skip  _common/${lang}.json (already scaffolded)`);
    skipped++;
    continue;
  }
  writeJson(filePath, buildCommonStub(lang));
  console.log(`  write ${path.relative(ROOT, filePath)}`);
  written++;
}

console.log(`\nDone. ${written} written, ${skipped} skipped.\n`);
