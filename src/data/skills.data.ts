import type { SkillGroupData } from '../types/skill.types';

export const skillGroups: SkillGroupData[] = [
  {
    title: 'RPA',
    skills: [
      {name: 'Bash'},
      { name: 'Python' },
      { name: 'Playwright' },
      { name: 'Patchright' },
      { name: 'Pywinauto' },
    ],
  },
  {
    title: 'DevOps',
    skills: [
      { name: 'Docker' },
      { name: 'Proxmox' },
      { name: 'CI/CD' },
      { name: 'Linux (Ubuntu Server)' },
    ],
  },
  {
    title: 'Fullstack',
    skills: [
      { name: 'Astro' },
      { name: 'TypeScript' },
      { name: 'Javascript' },
      { name: 'Html' },
      { name: 'Css' },
      { name: 'TailwindCss' },
      { name: 'FastAPI' },
      { name: 'Mysql' },
      { name: 'Postgres' },
    ],
  },
];
