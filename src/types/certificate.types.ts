import type { ImageMetadata } from 'astro';

/** A certificate shown in the "Certificados" section. */
export interface CertificateData {
  /** Organization that issued the certificate. */
  issuer: string;
  title: string;
  description: string;
  /** Display name for the downloadable PDF. */
  pdfName: string;
  pdfSrc: string;
  pdfImage: string | ImageMetadata;
  imageAlt: string;
}
