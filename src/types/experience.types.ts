/** A single role shown in the "Experiencia" timeline. */
export interface ExperienceData {
  company: string;
  role: string;
  period: string;
  /** True for the role currently being worked (shows an "Actual" badge). */
  current?: boolean;
  highlights: string[];
}
