const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
];

const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

/** Formats an ISO date as a short relative string, e.g. "hace 3 días". */
export function formatRelativeDate(isoDate: string): string {
  const seconds = (Date.now() - new Date(isoDate).getTime()) / 1000;

  for (const [unit, secondsInUnit] of UNITS) {
    if (seconds >= secondsInUnit) {
      return formatter.format(-Math.floor(seconds / secondsInUnit), unit);
    }
  }

  return formatter.format(0, 'minute');
}
