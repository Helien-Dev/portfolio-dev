import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Pass `height` only to force a crop to that box (e.g. object-fit: cover); omit it to keep the natural aspect ratio.
export async function getCardImage(
  src: string | ImageMetadata,
  width: number,
  height?: number,
) {
  return getImage(height ? { src, width, height } : { src, width });
}
