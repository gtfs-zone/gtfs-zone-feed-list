"""Copy the gtfs.zone catalog files from data.gtfs.zone into data/.

Reads https://data.gtfs.zone/manifest.json. When its run_id matches
data/manifest.json, nothing changes. Otherwise every file the manifest lists
(except status.json) is downloaded and checked against the manifest's bytes
and sha256; only when all match are they written, the manifest last, and the
stats section of README.md rendered again from them.

    python3 scripts/mirror.py            # mirror the latest run
    python3 scripts/mirror.py --readme   # re-render README.md from data/ only
"""

import hashlib
import json
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

BASE = "https://data.gtfs.zone/"
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
README = ROOT / "README.md"
# Per-URL check results: different on every run and large, so not mirrored.
SKIP = {"status.json"}
# Cloudflare answers 403 to urllib's default User-Agent.
USER_AGENT = "gtfs-zone-feed-list-mirror (+https://github.com/gtfs-zone/gtfs-zone-feed-list)"
START = "<!-- stats:start -->"
END = "<!-- stats:end -->"

CATALOG_NAMES = {
    "transitland": "Transitland Atlas",
    "mobilitydatabase": "Mobility Database",
    "ntd": "National Transit Database (FTA)",
    "gtfszone": "rt.gtfs.zone (its own feeds)",
}
STATE_ORDER = ["up", "partial", "down", "unknown"]


def fetch(name: str) -> bytes:
    request = urllib.request.Request(BASE + name, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=120) as response:
        return response.read()


def mirror() -> bool:
    manifest_bytes = fetch("manifest.json")
    manifest = json.loads(manifest_bytes)
    local = DATA / "manifest.json"
    if local.exists() and json.loads(local.read_bytes())["run_id"] == manifest["run_id"]:
        print(f"[mirror] run {manifest['run_id']} already mirrored")
        return False

    files: dict[str, bytes] = {}
    for name, meta in manifest["artifacts"].items():
        if name in SKIP:
            continue
        body = fetch(name)
        digest = hashlib.sha256(body).hexdigest()
        if len(body) != meta["bytes"] or digest != meta["sha256"]:
            raise SystemExit(
                f"[mirror] {name}: got {len(body)} bytes sha256 {digest}, manifest says "
                f"{meta['bytes']} bytes sha256 {meta['sha256']}; nothing written"
            )
        files[name] = body
        print(f"[mirror] {name}: {len(body)} bytes, sha256 ok")

    listed = set(files)
    for path in DATA.rglob("*"):
        rel = path.relative_to(DATA).as_posix()
        if path.is_file() and rel != "manifest.json" and rel not in listed:
            path.unlink()
            print(f"[mirror] {rel}: no longer in the manifest, removed")
    for name, body in files.items():
        target = DATA / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(body)
    local.write_bytes(manifest_bytes)
    print(f"[mirror] run {manifest['run_id']} ({manifest['generated_at']}) written")
    return True


def n(value: int) -> str:
    return f"{value:,}"


def pct(part: int, whole: int) -> str:
    return f"{part / whole:.0%}" if whole else "-"


def name(catalog: str) -> str:
    return CATALOG_NAMES.get(catalog, catalog)


def render_summary(summary: dict) -> list[str]:
    feeds = summary["feeds"]
    lines = [
        "| | |",
        "|---|---:|",
        f"| Catalog entries (one per listed URL) | {n(summary['total'])} |",
        f"| Feeds, after joining entries for the same feed | {n(feeds['total'])} |",
        f"| Feeds with realtime | {n(feeds['realtime'])} |",
        f"| Countries | {n(len(summary['by_country']))} |",
        "",
        "| Catalog | Entries |",
        "|---|---:|",
        *(
            f"| {name(c)} | {n(count)} |"
            for c, count in sorted(summary["by_catalog"].items(), key=lambda kv: -kv[1])
        ),
        "",
        "| Feed state | Feeds |",
        "|---|---:|",
        *(
            f"| {state} | {n(feeds['by_state'][state])} |"
            for state in [*STATE_ORDER, *sorted(set(feeds["by_state"]) - set(STATE_ORDER))]
            if state in feeds["by_state"]
        ),
        "",
        "| Schedule download | Feeds |",
        "|---|---:|",
        *(
            f"| {outcome} | {n(count)} |"
            for outcome, count in sorted(feeds["by_content"].items(), key=lambda kv: -kv[1])
        ),
    ]
    return lines


def render_source_stats(stats: dict) -> list[str]:
    catalogs = stats["catalogs"]
    dup = stats["duplication"]
    lines = [
        "",
        "### Overlap between catalogs",
        "",
        "Feeds with a schedule, by catalog, and how many no other catalog lists.",
        "",
        "| Catalog | Feeds | Only in this catalog |",
        "|---|---:|---:|",
        *(
            f"| {name(c)} | {n(s['scheduleFeeds'])} | {n(s['onlyHere'])}"
            f" ({pct(s['onlyHere'], s['scheduleFeeds'])}) |"
            for c, s in sorted(catalogs.items(), key=lambda kv: -kv[1]["scheduleFeeds"])
        ),
        "",
        "| Listed by | Feeds |",
        "|---|---:|",
        *(
            f"| {' + '.join(name(c) for c in combo['catalogs'])} | {n(combo['feeds'])} |"
            for combo in sorted(stats["combinations"], key=lambda c: -c["feeds"])
        ),
        "",
        "| Pair | Feeds in both | Schedule URLs in both | Identical zips in both |",
        "|---|---:|---:|---:|",
        *(
            f"| {name(p['catalogs'][0])} + {name(p['catalogs'][1])} | {n(p['feeds'])}"
            f" | {n(p['scheduleUrls'])} | {n(p['bodies'])} |"
            for p in sorted(stats["pairs"], key=lambda p: -p["feeds"])
        ),
        "",
        "### Duplication",
        "",
        f"{n(dup['multiEntry'])} of {n(dup['feeds'])} feeds join more than one"
        " catalog entry. Entries are joined when they share:",
        "",
        "| Evidence | Feeds |",
        "|---|---:|",
        *(f"| {evidence} | {n(count)} |" for evidence, count in dup["byEvidence"].items()),
    ]
    return lines


def render_stats() -> str:
    manifest = json.loads((DATA / "manifest.json").read_bytes())
    summary = json.loads((DATA / "summary.json").read_bytes())
    published = datetime.fromisoformat(manifest["generated_at"])
    lines = [
        f"From catalog run `{manifest['run_id']}`, published"
        f" {published:%Y-%m-%d %H:%M} UTC.",
        "",
        *render_summary(summary),
    ]
    if (DATA / "source-stats.json").exists():
        lines += render_source_stats(json.loads((DATA / "source-stats.json").read_bytes()))
    return "\n".join(lines)


def write_readme() -> None:
    text = README.read_text()
    head, rest = text.split(START, 1)
    _, tail = rest.split(END, 1)
    README.write_text(f"{head}{START}\n{render_stats()}\n{END}{tail}")
    print("[mirror] README.md stats rendered")


def main() -> None:
    if "--readme" in sys.argv[1:] or mirror():
        write_readme()


if __name__ == "__main__":
    main()
