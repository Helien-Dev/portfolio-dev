import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Resolves a card image (local or remote) through Astro's build-time image
 * pipeline at a fixed size. Centralized here so every card requests its
 * image the same way instead of each one calling `getImage` directly.
 */
export async function getCardImage(
  src: string | ImageMetadata,
  width: number,
  height: number,
) {
  return getImage({ src, width, height });
}
