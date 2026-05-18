export function img(slug: string): { hero: string; card: string; gallery: string[] } {
  return {
    hero: `/images/dinosaurs/${slug}/hero.webp`,
    card: `/images/dinosaurs/${slug}/card.webp`,
    gallery: [
      `/images/dinosaurs/${slug}/gallery-1.webp`,
      `/images/dinosaurs/${slug}/gallery-2.webp`,
    ],
  }
}
