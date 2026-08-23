import type { ActivityItem, ContributionCalendar, ContributionDay } from '../types/github.types';

// Build-time only, called from .astro frontmatter — never ships to the client, and every export here catches its own errors and returns null instead of throwing.

// Optional: set GITHUB_TOKEN (fine-grained, "Public Repositories read-only" scope) to raise the limit from 60/hour to 5000/hour — never sent to the third-party contributions host below.
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
    // "/public" excludes private activity regardless of token scope; per_page is 5x limit, just enough headroom to find that many mappable events.
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
