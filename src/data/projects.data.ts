import type { ProjectCardData } from '../types/project.types';
import pythonOrganizerImage from '../assets/images/python-organizer.png';

export const projects: ProjectCardData[] = [
  {
    title: 'Python Organizer',
    description:
      'Python Organizer Script | Script diseñado para organizar archivos en una carpeta según sus extensiones. Los archivos se mueven automáticamente a carpetas basadas en su tipo.',
    image: pythonOrganizerImage,
    imageAlt: 'Python Organizer',
    githubLink: 'https://github.com/Helien-Dev/Python-Organizer.git',
    dailyLink: 'https://cbb20e34.daily-portfolio.pages.dev/',
  },
  {
    title: 'Honey Bun Shop - Tienda',
    description:
      'Honey Bun Shop 🍯🐝 – Un ecommerce desarrollado en Python con Django que destaca por su diseño intuitivo y una experiencia de usuario optimizada (UX/UI).',
    image:
      'https://res.cloudinary.com/dhbzt4qjn/image/upload/v1731085048/dbkrbhbzinztfpp0fzao.png',
    imageAlt: 'Honey Bun Shop - Tienda',
    githubLink: 'https://github.com/Helien-Dev/Honey-Bun-Django.git',
    dailyLink: 'https://dailydev.lat/posts/HoneyBunShop/',
  },
];
