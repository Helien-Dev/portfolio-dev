import type { ProjectCardData } from '../types/project.types';
import pythonOrganizerImage from '../assets/images/python-organizer.png';

export const projects: ProjectCardData[] = [
  {
    title: 'Honey Bun Shop - Tienda',
    description:
      'Honey Bun Shop 🍯🐝 – Un ecommerce desarrollado en Python con Django que destaca por su diseño intuitivo y una experiencia de usuario optimizada (UX/UI).',
    image:
      'https://res.cloudinary.com/dhbzt4qjn/image/upload/v1731085048/dbkrbhbzinztfpp0fzao.png',
    imageAlt: 'Honey Bun Shop - Tienda',
    githubLink: 'https://github.com/Helien-Dev/Honey-Bun-Django.git',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
    featured: true,
  },
  {
    title: 'Python Organizer',
    description:
      'Python Organizer Script | Script diseñado para organizar archivos en una carpeta según sus extensiones. Los archivos se mueven automáticamente a carpetas basadas en su tipo.',
    image: pythonOrganizerImage,
    imageAlt: 'Python Organizer',
    githubLink: 'https://github.com/Helien-Dev/Python-Organizer.git',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
    featured: true,
  },
  {
    title: 'projects-wip',
    description: 'Aplicación web construida con Astro que lista un conjunto de repositorios filtrados por ciertos parámetros.',
    image: pythonOrganizerImage,
    imageAlt: '-',
    githubLink: 'https://github.com/Helien-Dev/projects-wip',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
  },
  {
    title: 'self-runnner',
    description: 'Despliegue y evaluación comparativa de self-hosted runners de CI/CD sobre Proxmox y runners efímeros.',
    image: pythonOrganizerImage,
    imageAlt: '-',
    githubLink: 'https://github.com/Helien-Dev/self-runner',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
  },
  {
    title: 'ascii-photo',
    description: 'Herramienta en Python que transforma imágenes en representaciones ASCII para terminal.',
    image: pythonOrganizerImage,
    imageAlt: '-',
    githubLink: 'https://github.com/Helien-Dev/ascii-photo',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
  },
  {
    title: 'auto-cloudflared',
    description: 'https://github.com/Helien-Dev/auto-cloudflared',
    image: pythonOrganizerImage,
    imageAlt: '-',
    githubLink: 'https://github.com/Helien-Dev/auto-cloudflared',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
  },
  {
    title: 'auto-rdp',
    description: 'https://github.com/Helien-Dev/auto-rdp',
    image: pythonOrganizerImage,
    imageAlt: '-',
    githubLink: 'https://github.com/Helien-Dev/auto-rdp',
    blogLink: 'https://portfolio-blog.alvaroavila.dev/',
  },
];
