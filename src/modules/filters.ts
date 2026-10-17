/**
 * Filter state and the matching itself.
 *
 * Filters live only in Home's URL hash: `q`, `status` (a comma list of states)
 * and `rt`. The text matching is gtfs-zone-web-common's, so a query finds the same feeds
 * here as in the editor's and the viewer's pickers.
 */

import { FeedMatcher } from 'gtfs-zone-web-common/gtfs/feed-search';
import type { Feed, State } from '../data/artifacts';
import { STATES, hasRealtime } from '../data/artifacts';

export interface Filters {
  q: string;
  /** States to show; empty shows every state. */
  status: State[];
  /** Only feeds with at least one realtime role. */
  rt: boolean;
}

function parseStatus(value: string | null): State[] {
  const parts = value ? value.split(',') : [];
  return STATES.filter((state) => parts.includes(state));
}

/** Filters from a hash. */
export function readFilters(hash: string): Filters {
  const params = new URLSearchParams(hash);
  return {
    q: params.get('q') ?? '',
    status: parseStatus(params.get('status')),
    rt: params.get('rt') === '1',
  };
}

/** The hash half the filters own. */
export function filterParams(filters: Filters): Record<string, string> {
  const params: Record<string, string> = {};
  if (filters.q) {
    params.q = filters.q;
  }
  if (filters.status.length > 0) {
    params.status = filters.status.join(',');
  }
  if (filters.rt) {
    params.rt = '1';
  }
  return params;
}

export function sameFilters(a: Filters, b: Filters): boolean {
  return (
    a.q === b.q && a.rt === b.rt && a.status.join(',') === b.status.join(',')
  );
}

/** A point Home lists feeds by distance from: a picked place, never in the hash. */
export interface Near {
  name: string;
  lon: number;
  lat: number;
}

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance in km. */
function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/** Placed feeds nearest first, then the unplaced ones in their existing order. */
function byDistance(feeds: Feed[], near: Near): Feed[] {
  const placed: { feed: Feed; km: number }[] = [];
  const unplaced: Feed[] = [];
  for (const feed of feeds) {
    if (feed.lat === undefined || feed.lon === undefined) {
      unplaced.push(feed);
    } else {
      placed.push({
        feed,
        km: haversine(near.lat, near.lon, feed.lat, feed.lon),
      });
    }
  }
  placed.sort((a, b) => a.km - b.km);
  return [...placed.map(({ feed }) => feed), ...unplaced];
}

export class FeedFilter {
  private feeds: Feed[];
  private matcher: FeedMatcher;

  constructor(feeds: Feed[]) {
    this.feeds = feeds;
    this.matcher = new FeedMatcher(feeds);
  }

  /**
   * The feeds the filters let through: best text match first while searching,
   * else catalogue order; nearest first when there is a `near` point.
   */
  apply(filters: Filters, near: Near | null = null): Feed[] {
    const text = this.matcher.match(filters.q);
    const candidates = text ? text.map((i) => this.feeds[i]) : this.feeds;
    const states = new Set(filters.status);
    const kept = candidates.filter(
      (feed) =>
        (states.size === 0 || states.has(feed.state)) &&
        (!filters.rt || hasRealtime(feed))
    );
    return near ? byDistance(kept, near) : kept;
  }
}
