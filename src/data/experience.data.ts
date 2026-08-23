import type { ExperienceData } from '../types/experience.types';

export const experience: ExperienceData[] = [
  {
    company: 'Smart Finance',
    role: 'Desarrollador RPA',
    period: 'Octubre 2025 - Actual',
    current: true,
    highlights: [
      'Migré procesos de facturación reduciendo el tiempo promedio de 10-15 min a 5-6 min por factura, mejorando drásticamente la productividad y estabilidad del proceso.',
      'Implementé Celery en un proyecto de automatización, reduciendo el tiempo de desarrollo por unidad de 4 min a 1.5 min.',
      'Desplegué y mantuve en producción 14 bots propios para distintas instituciones, asegurando estabilidad y concurrencia sin tiempos de inactividad.',
      'Desarrollé un dashboard de métricas para monitorear errores y desempeño de los bots en tiempo real.',
      'Construí APIs de prueba para entornos sandbox previos a producción.',
      'Trabajé de forma autónoma en la totalidad de los proyectos asignados.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Desarrollo Frontend & Automatización',
    period: '2 años previos a Smart Finance',
    highlights: [
      'Desarrollo de landing pages para distintos clientes.',
      'Automatizaciones puntuales de procesos para pequeños negocios.',
    ],
  },
];
