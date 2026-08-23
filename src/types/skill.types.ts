/** A single skill/tool icon shown in the "Habilidades" grid. */
export interface SkillData {
  name: string;
  /** Raw inline SVG markup for the skill's icon. */
  icon: string;
}

/** A themed group of skills (e.g. "DevOps", "RPA / Automatización"). */
export interface SkillGroupData {
  title: string;
  skills: SkillData[];
}
