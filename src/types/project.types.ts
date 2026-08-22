import type { ImageMetadata } from 'astro';

/** A regular project shown in the "Proyectos" grid. */
export interface ProjectCardData {
  title: string;
  description: string;
  image: string | ImageMetadata;
  imageAlt: string;
  githubLink: string;
  dailyLink: string;
}

/** A highlighted project shown in the "Proyectos destacados" section. */
export interface OutstandingProjectData {
  image: string | ImageMetadata;
  imageAlt: string;
  title: string;
  subtitle: string;
  description: string;
  difficultiesTitle: string;
  difficultiesDescription: string;
  youtubeLink: string;
  githubLink: string;
  webLink: string;
  dailyLink: string;
}
