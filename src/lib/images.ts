import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Resolves a card image (local or remote) through Astro's build-time image
 * pipeline. Centralized here so every card requests its image the same way
 * instead of each one calling `getImage` directly.
 *
 * Pass `height` only when the image must fill an exact box (it forces a
 * crop to that aspect ratio, e.g. `object-fit: cover` thumbnails). Omit it
 * to just cap the width and let the image's natural aspect ratio decide the
 * height — the safe default for anything shown at (close to) full size.
 */
export async function getCardImage(
  src: string | ImageMetadata,
  width: number,
  height?: number,
) {
  return getImage(height ? { src, width, height } : { src, width });
}
