import type { CertificateData } from '../types/certificate.types';

export const certificates: CertificateData[] = [
  {
    issuer: 'Netzun',
    title: 'Power Bi Basico',
    description: 'Manejo basico de la herramienta Power Bi.',
    pdfName: 'Power Bi Basico',
    pdfSrc: '/pdf/certificate-3.pdf',
    pdfImage: '/images/certificate-3.png',
    imageAlt: 'Certificado Imagen',
  },
  {
    issuer: 'Netzun',
    title: 'Power Bi Avanzado',
    description:
      'Manejo intermedio-Avanzado de la herramienta Power Bi, uso de todas las herramientas y visualizacion avanzada de datos',
    pdfName: 'Power Bi avanzado',
    pdfSrc: '/pdf/certificate-2.pdf',
    pdfImage: '/images/certificate-2.png',
    imageAlt: 'Certificado Imagen',
  },
];
