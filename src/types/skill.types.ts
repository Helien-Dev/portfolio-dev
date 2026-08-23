/** A single skill/tool name shown inside a role's dropdown in the "Habilidades" section. */
export interface SkillData {
  name: string;
}

/** A role/dropdown grouping related skills (e.g. "DevOps", "RPA / Automatización"). */
export interface SkillGroupData {
  title: string;
  skills: SkillData[];
}
