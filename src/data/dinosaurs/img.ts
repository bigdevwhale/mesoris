/**
 * img(slug) — build the standard image bundle paths for a dinosaur.
 *
 * The optional `previewGif` path is included for any slug that has a
 * matching GIF generated under `public/images/dinosaurs/<slug>/preview.gif`.
 * The card image URL is mirrored to `previewGif` so the DinoCardImage
 * component can fall back gracefully if the GIF is missing.
 */
export function img(slug: string): {
  hero: string
  card: string
  gallery: string[]
  video?: string
  previewGif?: string
} {
  return {
    hero: `/images/dinosaurs/${slug}/hero.webp`,
    card: `/images/dinosaurs/${slug}/card.webp`,
    gallery: [
      `/images/dinosaurs/${slug}/gallery-1.webp`,
      `/images/dinosaurs/${slug}/gallery-2.webp`,
    ],
    video: undefined,
    previewGif: `/images/dinosaurs/${slug}/preview.gif`,
  }
}