import type { ImageMetadata } from 'astro';

/** A project shown in "Proyectos" — either in the rotating showcase (featured: true) or the plain list below. */
export interface ProjectCardData {
  title: string;
  description: string;
  image: string | ImageMetadata;
  imageAlt: string;
  githubLink: string;
  blogLink: string;
  featured?: boolean;
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
  blogLink: string;
}
