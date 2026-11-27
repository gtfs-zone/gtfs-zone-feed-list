# gtfs.zone feed list

Every public GTFS and GTFS Realtime feed listed by the feed catalogs below, in
one place, as plain JSON. This repository is a read-only mirror of the catalog
files published at <https://data.gtfs.zone/>, updated automatically.

## What this is, and what it is not

- **An index of aggregators, not another aggregator.** It works like a
  browser's root store, which lists certificate authorities without being
  one. No feed is curated, added or ranked here: every GTFS and GTFS Realtime
  entry with a URL in each catalog is included as that catalog publishes it.
  The one exception is `gtfszone`, the few feeds rt.gtfs.zone serves itself.
- **An unopinionated superset.** Entries that describe the same feed are
  joined into one, by fixed rules only (a shared URL, identical schedule data,
  a catalog's own link between a realtime feed and its schedule; the full list
  is in the catalog's
  [architecture notes](https://github.com/gtfs-zone/gtfs-zone-feed-catalog/blob/main/docs/architecture.md#logical-feeds)),
  never by name matching. Every feed keeps its `members`: the catalog and id
  of each entry behind it. Nothing is dropped for being down, outdated or
  duplicated; those are reported, not filtered.
- **A mirror.** The files in `data/` are byte-for-byte copies of the CDN files,
  each checked against the sha256 in `data/manifest.json` before it is
  committed. The data is built by
  [gtfs-zone-feed-catalog](https://github.com/gtfs-zone/gtfs-zone-feed-catalog);
  this repository holds no other code than the mirror script.

## Sources

| Catalog | License |
|---|---|
| [Transitland Atlas](https://github.com/transitland/transitland-atlas) | CC-BY-4.0 |
| [Mobility Database](https://mobilitydatabase.org) | CC0-1.0 |
| [National Transit Database (FTA)](https://data.transportation.gov/d/2u7n-ub22) | Public Domain U.S. Government |
| rt.gtfs.zone (its own feeds) | |

Know another catalog of GTFS feeds that should be included? Open an issue,
here or in
[gtfs-zone-feed-catalog](https://github.com/gtfs-zone/gtfs-zone-feed-catalog/issues).

## Stats

Rendered from `data/` by the mirror on every update.

<!-- stats:start -->
From catalog run `694752af-11b9-440c-ba81-033970a9b6ae`, published 2026-11-27 12:15 UTC.

| | |
|---|---:|
| Catalog entries (one per listed URL) | 12,811 |
| Feeds, after joining entries for the same feed | 6,416 |
| Feeds with realtime | 1,131 |
| Countries | 96 |

| Catalog | Entries |
|---|---:|
| Mobility Database | 6,701 |
| Transitland Atlas | 4,845 |
| National Transit Database (FTA) | 1,243 |
| rt.gtfs.zone (its own feeds) | 22 |

| Feed state | Feeds |
|---|---:|
| up | 4,663 |
| partial | 105 |
| down | 1,455 |
| unknown | 193 |

| Schedule download | Feeds |
|---|---:|
| ok | 4,634 |
| not_zip | 119 |
| missing_files | 24 |
| http_error | 19 |
| parse_error | 9 |
| timeout | 5 |
| empty | 1 |

### Overlap between catalogs

Feeds with a schedule, by catalog, and how many no other catalog lists.

| Catalog | Feeds | Only in this catalog |
|---|---:|---:|
| Mobility Database | 4,516 | 2,276 (50%) |
| Transitland Atlas | 3,835 | 1,236 (32%) |
| National Transit Database (FTA) | 1,187 | 157 (13%) |
| rt.gtfs.zone (its own feeds) | 11 | 7 (64%) |

| Listed by | Feeds |
|---|---:|
| Mobility Database | 2,276 |
| Mobility Database + Transitland Atlas | 1,613 |
| Transitland Atlas | 1,236 |
| Mobility Database + National Transit Database (FTA) + Transitland Atlas | 577 |
| National Transit Database (FTA) + Transitland Atlas | 405 |
| National Transit Database (FTA) | 157 |
| Mobility Database + National Transit Database (FTA) | 46 |
| rt.gtfs.zone (its own feeds) | 7 |
| rt.gtfs.zone (its own feeds) + Mobility Database + National Transit Database (FTA) + Transitland Atlas | 2 |
| rt.gtfs.zone (its own feeds) + Mobility Database + Transitland Atlas | 2 |

| Pair | Feeds in both | Schedule URLs in both | Identical zips in both |
|---|---:|---:|---:|
| Mobility Database + Transitland Atlas | 2,194 | 1,401 | 2,107 |
| National Transit Database (FTA) + Transitland Atlas | 984 | 904 | 947 |
| Mobility Database + National Transit Database (FTA) | 625 | 552 | 587 |
| rt.gtfs.zone (its own feeds) + Mobility Database | 4 | 3 | 4 |
| rt.gtfs.zone (its own feeds) + Transitland Atlas | 4 | 3 | 4 |
| rt.gtfs.zone (its own feeds) + National Transit Database (FTA) | 2 | 2 | 2 |

### Duplication

2,967 of 6,416 feeds join more than one catalog entry. Entries are joined when they share:

| Evidence | Feeds |
|---|---:|
| cleanedHash | 2,568 |
| realtimeSibling | 253 |
| reference | 1,025 |
| sha256 | 2,579 |
| url | 1,948 |
<!-- stats:end -->

## When and how it is updated

1. **Daily at 09:00 UTC** the gtfs.zone catalog pipeline reads every catalog,
   checks every URL and downloads every schedule zip once. It publishes to
   data.gtfs.zone when it finishes, usually about an hour later, and writes
   `manifest.json` last.
2. **Every hour at :17 UTC** the [Mirror workflow](.github/workflows/mirror.yml)
   runs [`scripts/mirror.py`](scripts/mirror.py). If `manifest.json` names a
   run this repository does not have yet, it downloads each file, checks its
   size and sha256 against the manifest, writes `data/` and the stats above,
   and commits as `chore(data): catalog run <run_id>`. Any mismatch fails the
   run and nothing is committed; the next hour tries again.

GitHub can start scheduled workflows some minutes late. The mirror only reads
the public CDN: nothing on the gtfs.zone side can write to this repository.

## Files

| File | What it holds |
|---|---|
| `data/manifest.json` | Run id, publish time, attribution, and the bytes and sha256 of every file |
| `data/feeds.json` | One entry per feed: name, place, URLs, state, schedule facts, `members` |
| `data/sources.json` | Every catalog entry as the catalog lists it, with its check result |
| `data/search.json` | A compact form of `feeds.json` for search boxes |
| `data/summary.json` | The counts behind the stats above |
| `data/snapshots/index.json` | Index of the daily status snapshots on data.gtfs.zone |

`status.json` (every URL's latest check) changes on every run and is not
mirrored; read it from <https://data.gtfs.zone/status.json>.

To check a file yourself:

```sh
sha256sum data/feeds.json
python3 -c "import json; print(json.load(open('data/manifest.json'))['artifacts']['feeds.json'])"
```

## License

The data in `data/` comes from the catalogs above under their licenses
(Transitland Atlas requires attribution), as listed in
`data/manifest.json` `attribution`. Each feed belongs to its publisher and is
licensed on the publisher's terms. The mirror script is AGPL-3.0
(`LICENSE.txt`).
