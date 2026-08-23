import type { CertificateData } from '../types/certificate.types';
import powerBiBasicoImage from '../assets/images/certificate-power-bi-basico.png';
import powerBiAvanzadoImage from '../assets/images/certificate-power-bi-avanzado.png';

export const certificates: CertificateData[] = [
  {
    issuer: 'Netzun',
    title: 'Power Bi Basico',
    description: 'Manejo basico de la herramienta Power Bi.',
    pdfName: 'Power Bi Basico',
    pdfSrc: '/pdf/certificate-power-bi-basico.pdf',
    pdfImage: powerBiBasicoImage,
    imageAlt: 'Certificado Imagen',
  },
  {
    issuer: 'Netzun',
    title: 'Power Bi Avanzado',
    description:
      'Manejo intermedio-Avanzado de la herramienta Power Bi, uso de todas las herramientas y visualizacion avanzada de datos',
    pdfName: 'Power Bi avanzado',
    pdfSrc: '/pdf/certificate-power-bi-avanzado.pdf',
    pdfImage: powerBiAvanzadoImage,
    imageAlt: 'Certificado Imagen',
  },
];
