/** A monochrome icon drawn as a single SVG `<path>` in a 24x24 viewBox. */
export interface SkillIconData {
  /** The `d` attribute of the icon's path. */
  path: string;
  /** Pass 'evenodd' when the icon has cut-out holes that render wrong under the default nonzero fill rule. */
  fillRule?: 'evenodd';
}

/** A single skill/tool name shown inside a role's dropdown in the "Habilidades" section. */
export interface SkillData {
  name: string;
  icon: SkillIconData;
}

/** A role/dropdown grouping related skills (e.g. "DevOps", "RPA / Automatización"). */
export interface SkillGroupData {
  title: string;
  skills: SkillData[];
}
