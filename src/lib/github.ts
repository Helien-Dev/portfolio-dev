import type { ActivityItem, ContributionCalendar, ContributionDay } from '../types/github.types';

/**
 * Fetches a GitHub user's public data at build time only (this module is
 * imported from `.astro` frontmatter, never shipped to the client) — the
 * site stays fully static, no runtime calls from the visitor's browser.
 *
 * Both endpoints work unauthenticated, so a transient outage or rate limit
 * shouldn't take down the whole build: every export here catches its own
 * errors and returns `null` instead of throwing, and the section that
 * renders them skips gracefully when data is missing.
 *
 * The official GitHub API caps unauthenticated requests at 60/hour per IP —
 * easy to hit if the site gets rebuilt/deployed repeatedly in a short
 * window. Setting a `GITHUB_TOKEN` env var at build time raises that to
 * 5000/hour. It's read server-side only via `import.meta.env` — never
 * bundled into client-side code — and is entirely optional.
 *
 * Security notes, if you do set GITHUB_TOKEN:
 * - Use a fine-grained personal access token scoped to
 *   "Public Repositories (read-only)" — NOT a classic token with `repo`
 *   scope. A public-only token can't read private data even if it leaked.
 * - `getRecentActivity` calls the `/users/{username}/events/public`
 *   endpoint specifically (note the `/public`) — GitHub filters this to
 *   public activity only, regardless of the calling token's scope, so
 *   private repo/org events never appear in the response even with a
 *   broader token.
 * - The token is only ever attached to `api.github.com` requests. The
 *   contributions endpoint below is a different (third-party) host and
 *   never receives it — only the public username is sent there.
 */
const githubAuthHeaders = import.meta.env.GITHUB_TOKEN
  ? { Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}` }
  : undefined;

const EVENT_DESCRIPTIONS: Record<string, (event: GithubEvent) => string | null> = {
  PushEvent: (event) => {
    const commitCount = event.payload.commits?.length ?? 0;
    const label = commitCount === 1 ? 'commit' : 'commits';
    return commitCount > 0 ? `Hizo push de ${commitCount} ${label} a` : 'Hizo push a';
  },
  CreateEvent: (event) => {
    switch (event.payload.ref_type) {
      case 'repository':
        return 'Creó el repositorio';
      case 'branch':
        return 'Creó una rama en';
      case 'tag':
        return 'Creó un tag en';
      default:
        return 'Creó algo en';
    }
  },
  PullRequestEvent: (event) => {
    const action = event.payload.action === 'opened' ? 'Abrió' : 'Actualizó';
    return `${action} un pull request en`;
  },
  IssuesEvent: (event) => {
    const action = event.payload.action === 'opened' ? 'Abrió' : 'Actualizó';
    return `${action} un issue en`;
  },
  WatchEvent: () => 'Marcó con estrella',
  ForkEvent: () => 'Hizo fork de',
  PublicEvent: () => 'Hizo público el repositorio',
  ReleaseEvent: () => 'Publicó un release en',
};

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: unknown[];
    ref_type?: string;
    action?: string;
  };
  created_at: string;
}

/** Recent public activity (pushes, PRs, issues, stars, ...), newest first. */
export async function getRecentActivity(username: string, limit = 3): Promise<ActivityItem[] | null> {
  try {
    // per_page stays modest (~5x the display limit) — enough headroom to
    // find `limit` mappable events even if recent activity is a mix of
    // types we don't render, without pulling more than needed.
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=${limit * 5}`,
      { headers: githubAuthHeaders },
    );
    if (!res.ok) throw new Error(`GitHub events API responded ${res.status}`);

    const events = (await res.json()) as GithubEvent[];
    const items: ActivityItem[] = [];

    for (const event of events) {
      const describe = EVENT_DESCRIPTIONS[event.type];
      if (!describe) continue;

      const description = describe(event);
      if (!description) continue;

      items.push({
        id: event.id,
        description,
        repoName: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        date: event.created_at,
      });

      if (items.length >= limit) break;
    }

    return items;
  } catch (error) {
    console.warn(`[github.ts] Failed to fetch recent activity for ${username}:`, error);
    return null;
  }
}

interface RawContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

/** Last year of contributions, grouped into Sunday-first weeks for the heatmap grid. */
export async function getContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) throw new Error(`Contributions API responded ${res.status}`);

    const data = (await res.json()) as RawContributionsResponse;
    const days = data.contributions;
    if (!days?.length) return null;

    // Pad the front so the first week starts on Sunday, matching GitHub's own calendar.
    const firstWeekday = new Date(days[0].date).getUTCDay();
    const padding: ContributionDay[] = Array.from({ length: firstWeekday }, (_, i) => ({
      date: `pad-${i}`,
      count: 0,
      level: 0,
    }));
    const padded = [...padding, ...days];

    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7));
    }

    return {
      totalLastYear: data.total.lastYear ?? 0,
      weeks,
    };
  } catch (error) {
    console.warn(`[github.ts] Failed to fetch contribution calendar for ${username}:`, error);
    return null;
  }
}
