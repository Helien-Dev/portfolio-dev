/** Props shared by the simple external-link buttons (GitHub, Daily, Web). */
export interface LinkButtonProps {
  href: string;
}

/** Props for the file-download button (certificates, CV, etc.). */
export interface DownloadButtonProps {
  /** URL of the file to download. */
  href: string;
  /** Visible button text. */
  label: string;
  /** Filename suggested to the browser via the `download` attribute. */
  fileName: string;
}
