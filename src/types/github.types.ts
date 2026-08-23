/** One day in the contribution heatmap. `level` is GitHub's own 0-4 intensity bucket. */
export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Contribution calendar data for the last year, grouped into weeks for the heatmap grid. */
export interface ContributionCalendar {
  totalLastYear: number;
  /** Each entry is one week (Sunday-first), so the grid can render column by column. */
  weeks: ContributionDay[][];
}

/** One entry in the "recent activity" feed, already normalized to plain text. */
export interface ActivityItem {
  id: string;
  /** Human-readable description, e.g. "Hizo push a portfolio-dev". */
  description: string;
  repoName: string;
  repoUrl: string;
  date: string;
}
