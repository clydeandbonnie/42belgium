#!/usr/bin/env python3
"""
Sync the Lexical Matrix v3 (XLSX, in Google Drive) into a JSON file the rest
of the toolchain can read (validator, scaffolder, future dashboard).

Source of truth stays the XLSX. Re-run this script whenever Clyde & Bonnie's
strategy team updates the matrix.

Usage:
    python3 scripts/sync-matrix.py [--xlsx PATH] [--out PATH]

Defaults:
    --xlsx  ~/Library/CloudStorage/.../260415_42Belgium_LexicalMatrix_v3.xlsx
    --out   src/data/matrix.json

The output JSON is keyed by "<theme>-<lang>" (lowercase theme, e.g.
"opportunity-en", "cyber-fr"). Each entry has the briefing v2 fields:
primaryQuery, profile, clusters[], lpAngleClassic, lpAngleBold, cta,
convertingKeywords[], patternBKeywords[], analyse.

The cluster sub-structure preserves cluster name + keyword list. Per-keyword
metrics from the matrix (clicks, CTR, CVR, conv) are kept as the raw line
under `convertingKeywords[].raw` for reference; the bare keyword sits in
`convertingKeywords[].keyword`.
"""

import argparse
import json
import os
import re
import sys
import zipfile
from pathlib import Path
from typing import Dict, List, Optional
import xml.etree.ElementTree as ET

DEFAULT_XLSX = Path(
    os.path.expanduser(
        "~/Library/CloudStorage/GoogleDrive-charlotte@clydeandbonnie.be/"
        "Shared drives/Clyde and Bonnie/1. Clyde&Bonnie/PROJETS/42 BELGIUM/"
        "CAMPAIGN/CAMPAIGN JAN26 - SoMe/Landing Pages/"
        "260415_42Belgium_LexicalMatrix_v3.xlsx"
    )
)
DEFAULT_OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "matrix.json"

NS = {"main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def read_shared_strings(zf: zipfile.ZipFile) -> List[str]:
    try:
        with zf.open("xl/sharedStrings.xml") as f:
            tree = ET.parse(f)
    except KeyError:
        return []
    out: List[str] = []
    for si in tree.getroot().findall("main:si", NS):
        # Concatenate every <t> child (handles rich-text runs split across <r>).
        text = "".join(t.text or "" for t in si.iter(f"{{{NS['main']}}}t"))
        out.append(text)
    return out


def col_index(ref: str) -> int:
    """Convert XLSX cell ref ('A1', 'B2', 'AA10', …) to 0-based column index.
    Empty cells are omitted from the XML, so we cannot rely on positional order
    of <c> children — we must align by column letter."""
    letters = re.match(r"([A-Z]+)", ref or "").group(1)
    n = 0
    for ch in letters:
        n = n * 26 + (ord(ch) - ord("A") + 1)
    return n - 1


def read_rows(zf: zipfile.ZipFile, shared: List[str]) -> List[List[str]]:
    """Return rows as fixed-width arrays of 13 strings (cols A..M). Missing
    cells (omitted from XML) become empty strings, so [0]=A, [1]=B, [12]=M."""
    with zf.open("xl/worksheets/sheet1.xml") as f:
        tree = ET.parse(f)
    rows: List[List[str]] = []
    for row in tree.getroot().iter(f"{{{NS['main']}}}row"):
        cells: List[str] = [""] * 13
        for c in row.findall("main:c", NS):
            idx = col_index(c.get("r", "A1"))
            if idx >= 13:
                continue
            t_attr = c.get("t")
            v = c.find("main:v", NS)
            if v is None:
                istr = c.find("main:is", NS)
                if istr is not None:
                    cells[idx] = "".join(x.text or "" for x in istr.iter(f"{{{NS['main']}}}t"))
            elif t_attr == "s":
                si = int(v.text)
                cells[idx] = shared[si] if si < len(shared) else ""
            else:
                cells[idx] = v.text or ""
        rows.append(cells)
    return rows


def parse_cluster_cell(cell: str) -> Optional[dict]:
    """A cluster cell starts with the UPPERCASE cluster name (line 1), then a
    pipe-separated keyword list (line 2+). Empty cells map to None."""
    if not cell or not cell.strip():
        return None
    lines = [ln.strip() for ln in cell.split("\n") if ln.strip()]
    if not lines:
        return None
    name = lines[0]
    keywords: List[str] = []
    for ln in lines[1:]:
        for kw in ln.split("|"):
            kw = kw.strip()
            if kw:
                keywords.append(kw)
    return {"name": name, "keywords": keywords}


# Each line of the converting / no-conv cells looks like:
#   "remote jobs | 880 clk | CTR:16.4% | CVR:6.7% | 58.8 conv"
# We keep the raw line for reference and split out the bare keyword (the part
# before the first " | ").
KW_LINE_RE = re.compile(r"^(?P<kw>[^|]+?)\s*\|\s*.+$")


def parse_kw_list_cell(cell: str) -> List[dict]:
    if not cell or not cell.strip():
        return []
    out: List[dict] = []
    for line in cell.split("\n"):
        line = line.strip()
        if not line:
            continue
        m = KW_LINE_RE.match(line)
        if m:
            out.append({"keyword": m.group("kw").strip(), "raw": line})
        else:
            # No metrics, just the bare keyword.
            out.append({"keyword": line, "raw": line})
    return out


# Briefing v2 §00: which themes use the Bold / Story angle. The rest default to
# Classic. Surfaced here so the scaffolder can pre-fill `lpAngle` per LP.
BOLD_THEMES = {"opportunity", "genai"}


def lp_angle(theme: str) -> str:
    return "bold" if theme.lower() in BOLD_THEMES else "classic"


def canonical_theme(label: str) -> str:
    """Map a matrix Theme cell ('AIEngineering', 'Opportunity', …) to the
    folder/code identifier used in src/lib/themes.ts."""
    label = label.strip()
    aliases = {
        "AIEngineering": "aiengineering",
        "AnalystBI": "analystbi",
        "ScienceEng": "scienceeng",
        "WebFullstack": "webfullstack",
        "ITGen": "itgen",
        "Infra": "infra",
        "GenAI": "genai",
        "Cyber": "cyber",
        "Python": "python",
        "Opportunity": "opportunity",
    }
    return aliases.get(label, label.lower())


def build_matrix(rows: List[List[str]]) -> Dict:
    """Walk the rows. The first non-header row begins with a theme label.
    Subsequent rows for the same theme reuse the theme (cell may be empty)."""
    matrix: Dict = {}
    current_theme: Optional[str] = None

    # Skip the first 4 header rows (title, subtitle, segment header, column
    # labels). The exact layout: row 0 = title, 1 = subtitle, 2 = segment
    # banner, 3 = column headers.
    data_rows = rows[4:]

    for row in data_rows:
        # Pad to at least 13 cols.
        row = row + [""] * (13 - len(row))
        theme_cell, lang_cell = row[0].strip(), row[1].strip()
        if theme_cell:
            current_theme = canonical_theme(theme_cell)
        if not current_theme or not lang_cell:
            continue
        lang = lang_cell.lower()
        if lang not in ("fr", "en", "nl"):
            continue

        clusters = []
        for ci in (4, 5, 6):
            cl = parse_cluster_cell(row[ci])
            if cl:
                clusters.append(cl)

        entry = {
            "theme": current_theme,
            "lang": lang,
            "primaryQuery": row[2].strip(),
            "profile": row[3].strip(),
            "clusters": clusters,
            "lpAngleClassic": row[7].strip(),
            "lpAngleBold": row[8].strip(),
            "cta": row[9].strip(),
            "convertingKeywords": parse_kw_list_cell(row[10]),
            "patternBKeywords": parse_kw_list_cell(row[11]),
            "analyse": row[12].strip(),
            "lpAngleSuggested": lp_angle(current_theme),
        }
        matrix[f"{current_theme}-{lang}"] = entry

    return matrix


def main() -> int:
    p = argparse.ArgumentParser(description="Sync Lexical Matrix v3 XLSX → JSON.")
    p.add_argument("--xlsx", type=Path, default=DEFAULT_XLSX)
    p.add_argument("--out", type=Path, default=DEFAULT_OUT)
    args = p.parse_args()

    if not args.xlsx.exists():
        print(f"error: XLSX not found at {args.xlsx}", file=sys.stderr)
        return 1

    with zipfile.ZipFile(args.xlsx) as zf:
        shared = read_shared_strings(zf)
        rows = read_rows(zf, shared)

    matrix = build_matrix(rows)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    with args.out.open("w", encoding="utf-8") as f:
        json.dump(
            {
                "_source": str(args.xlsx.name),
                "_generatedBy": "scripts/sync-matrix.py",
                "_count": len(matrix),
                "entries": matrix,
            },
            f,
            ensure_ascii=False,
            indent=2,
        )

    print(f"Wrote {len(matrix)} entries to {args.out.relative_to(Path.cwd())}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
