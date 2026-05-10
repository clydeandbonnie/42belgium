# Editing landing-page content

This guide is for the 42 Belgium team. It explains how to edit the copy of any
landing page through GitHub, without touching code.

---

## TL;DR

1. Find the file you want to edit (see the map below).
2. Click the pencil icon in GitHub to open the web editor.
3. Change the text inside the quotes.
4. Click "Commit changes" → "Create a new branch and start a pull request".
5. Wait for the green check (the validator runs automatically). If it's red,
   read the error message — it tells you what to fix.
6. When green, ask Clyde & Bonnie to merge.

That's it. The site updates within a few minutes after merge.

---

## Where the content lives

Every page is one JSON file under `src/content/`. The path is
`<theme>/<language>.json`. There are 10 themes × 3 languages = 30 page files.

| Theme | What it's for | Folder |
| --- | --- | --- |
| Opportunity | IT career change / no tech background | `opportunity/` |
| IT General | Coding bootcamp / general IT | `itgen/` |
| Cybersecurity | Cybersecurity specialisation | `cyber/` |
| AI Engineering | AI / ML engineering | `aiengineering/` |
| Data Science | Data Science / ML | `scienceeng/` |
| Data Analyst / BI | Power BI, SQL, Tableau | `analystbi/` |
| Python | Python programming | `python/` |
| Web Fullstack | Fullstack web dev | `webfullstack/` |
| Infrastructure | DevOps / Sysadmin | `infra/` |
| Generative AI | Prompt engineering / LLMs | `genai/` |

Each folder has three files: `en.json`, `fr.json`, `nl.json`.

**Example:** to edit the French Cybersecurity page, open
`src/content/cyber/fr.json`.

### Shared sections (the program description, open days, FAQ-shaped layouts…)

Five sections of every landing page describe the **42 Belgium program in
general** — they're the same regardless of which SEO theme the page targets:

- `afterForty` — the "Life after 42" outcomes block
- `whatYouBuild` — the four-phase program timeline
- `realStories` — the YouTube testimonials
- `howToApply` — the 4-step path
- `openDays` — the Brussels & Antwerp campus visits

These live in `src/content/_common/<language>.json` (one file per language),
**not** in each theme folder.

> **Why this matters:** if you fix a typo in `_common/fr.json#openDays.intro`,
> the fix appears on **all 10 French landing pages** at once. Don't duplicate
> these sections inside theme folders unless you want a theme-specific override.

### Overriding a shared section for one theme

If for one specific page you want a different version of, say, `afterForty`
(maybe with a cybersecurity-specific stat), just add the `afterForty` key to
that theme's JSON file. The theme file always wins over `_common`.

---

## What you can safely change

- **Any text** inside double quotes: `"heading": "Free tech training that gets you hired."`
- **Any list item**: `"bullets": ["…", "…"]`
- **Any link**: `"ctaHref": "https://…"`

## What to leave alone (unless you know what you're doing)

- The **field names** (the part before the `:`). E.g. don't change `"heading"`
  to `"titre"` — the code looks for those exact names.
- The **structure** (curly braces `{ }`, square brackets `[ ]`, commas).
- Anything inside `"meta"` — these drive SEO and are tuned to Google Ads data.
  If you need to retune SEO, talk to Clyde & Bonnie.

---

## Common pitfalls

### Apostrophes from Word / Notion break things

When you copy-paste from Word, Notion, or Google Docs, apostrophes get
auto-converted to "smart" curly versions (`’`) instead of plain ones (`'`).
This **breaks JSON parsing** if it lands inside a string that uses double
quotes for a possessive.

**Use straight apostrophes only**: `'` (the one on your keyboard, next to the
Enter key on AZERTY).

The validator will warn you if it spots smart quotes — look for
`smart quote(s) found` in the GitHub PR check.

### Don't forget commas

JSON requires a comma after every item in a list, **except the last one**.

Wrong:
```json
"bullets": [
  "First item"
  "Second item"
]
```

Right:
```json
"bullets": [
  "First item",
  "Second item"
]
```

### Special characters inside strings

If your text contains a double quote `"`, escape it with a backslash:
`"He said \"hello\""`. The same goes for backslashes themselves: `\\`.

For everything else (accents, em-dashes —, ellipses …, etc.), JSON handles
them natively. No escaping needed.

### Newlines in the headline

To force a line break inside the H1, write `\n` (a literal backslash followed
by `n`). Example:
```json
"headline": "Free tech training.\nReally free."
```

renders as:
> Free tech training.
> Really free.

---

## What the validator checks

After every commit on a PR, an automated validator runs through the briefing
v2 checklist for the page you edited. Common errors:

| Message | What to do |
| --- | --- |
| `meta.title is X chars (target 50–60)` | Shorten or lengthen the title. Includes `\| 42 Belgium`. |
| `meta.description is X chars (target 140–160)` | Same logic for the meta description. |
| `H1 contains none of the Primary Query tokens` | Your `hero.headline` must include the Primary Query word(s). |
| `missing converting keywords: …` | Each keyword in `meta.convertingKeywords` must appear at least once anywhere in the page body. |
| `body has X words (target 600–1000)` | Add or trim copy until you're in the band. |
| `Primary Query density X% (min 1% / max 2%)` | The Primary Query should appear ~6–12 times for 600 words. |
| `first 100 words missing Primary Query` | The combined hero + first cluster body must contain the Primary Query in its first 100 words. |
| `image not found in public/` | The image path you wrote doesn't match a real file. Check spelling, case. |
| `image > 200 KB` | Compress the image (try [squoosh.app](https://squoosh.app)) before uploading. |
| `smart quote(s) found` | You pasted from Word/Notion. Replace `’` with `'`. |

Errors block the PR; warnings don't but should be fixed before merge.

---

## Editing in GitHub web — step by step

1. Open the file (e.g. `src/content/cyber/fr.json`).
2. Click the **pencil icon** in the top-right of the file viewer.
3. Make your changes in the editor. The line numbers help navigate.
4. Scroll to the bottom of the page.
5. Under "Commit changes", choose **"Create a new branch for this commit and
   start a pull request"**. Give the branch a name like
   `cyber-fr-update-headline`.
6. Click "Propose changes".
7. On the next page, give the PR a title (e.g. *"Update Cybersecurity FR
   headline"*) and click "Create pull request".
8. Wait ~30 seconds for the green/red check to appear.
9. If green, ping Clyde & Bonnie or merge yourself.
10. If red, click "Details" next to the failed check to read the validator
    output, fix the file (the pencil icon works on the PR branch too), and
    commit again.

---

## Status of each page

The dashboard at `https://42belgium.vercel.app/<lang>` shows every page with
a status pill: **Draft / Ready for review / Approved**. To change a status,
edit `src/content/_status.json` and commit.

---

## Need help

Anything unclear or going wrong → ping Nicolas (Clyde & Bonnie). Don't merge a
red PR unless you know what you're overriding.
