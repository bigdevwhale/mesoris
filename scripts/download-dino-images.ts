/**
 * Dev-time CLI tool: downloads dinosaur images from dinosaurpictures.org,
 * converts to WebP, and saves to local assets.
 *
 * Usage: npx tsx scripts/download-dino-images.ts
 *
 * Two modes:
 *   - If image-urls.csv exists with URLs, use CSV mode (fast, reliable)
 *   - Otherwise, scrape each dinosaur page (slower, discovery-based)
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import * as crypto from 'node:crypto'

const BASE_URL = 'https://dinosaurpictures.org'
const CDN_BASE = 'https://images.dinosaurpictures.org'
const ASSETS_DIR = path.resolve(import.meta.dirname, '..', 'public', 'images', 'dinosaurs')
const CSV_PATH = path.resolve(import.meta.dirname, 'image-urls.csv')

// ── Dinosaur list with genus names for URL construction ─────────────────
interface DinoEntry {
  slug: string
  genusName: string
  primaryUrl?: string
  secondaryUrl?: string
}

const DINOSAURS: DinoEntry[] = [
  { slug: 'tyrannosaurus-rex', genusName: 'Tyrannosaurus' },
  { slug: 'triceratops', genusName: 'Triceratops',
    primaryUrl: 'https://images.dinosaurpictures.org/Triceratops/Triceratops_932bd8e6.jpg',
    secondaryUrl: 'https://images.dinosaurpictures.org/Triceratops/Triceratops_41a51641.jpg' },
  { slug: 'velociraptor', genusName: 'Velociraptor',
    primaryUrl: 'https://images.dinosaurpictures.org/Velociraptor/Velociraptor_41a51641.jpg',
    secondaryUrl: 'https://images.dinosaurpictures.org/Velociraptor/Velociraptor_56afc6a9.jpg' },
  { slug: 'brachiosaurus', genusName: 'Brachiosaurus',
    primaryUrl: 'https://images.dinosaurpictures.org/Brachiosaurus/Brachiosaurus_c9eb8de4.jpg',
    secondaryUrl: 'https://images.dinosaurpictures.org/Brachiosaurus/Brachiosaurus_8bd6c400.jpg' },
  { slug: 'stegosaurus', genusName: 'Stegosaurus',
    primaryUrl: 'https://images.dinosaurpictures.org/Stegosaurus/Stegosaurus_42a22ae9.jpg',
    secondaryUrl: 'https://images.dinosaurpictures.org/Stegosaurus/Stegosaurus_ed1f343c.jpg' },
  { slug: 'spinosaurus', genusName: 'Spinosaurus',
    primaryUrl: 'https://images.dinosaurpictures.org/Spinosaurus/Spinosaurus_8b26fbe0.jpg',
    secondaryUrl: 'https://images.dinosaurpictures.org/Spinosaurus/Spinosaurus_4b37536b.jpg' },
  { slug: 'ankylosaurus', genusName: 'Ankylosaurus' },
  { slug: 'parasaurolophus', genusName: 'Parasaurolophus' },
  { slug: 'diplodocus', genusName: 'Diplodocus' },
  { slug: 'allosaurus', genusName: 'Allosaurus' },
  { slug: 'pteranodon', genusName: 'Pteranodon' },
  { slug: 'mosasaurus', genusName: 'Mosasaurus' },
  { slug: 'carnotaurus', genusName: 'Carnotaurus' },
  { slug: 'giganotosaurus', genusName: 'Giganotosaurus' },
  { slug: 'deinonychus', genusName: 'Deinonychus' },
  { slug: 'ceratosaurus', genusName: 'Ceratosaurus' },
  { slug: 'baryonyx', genusName: 'Baryonyx' },
  { slug: 'compsognathus', genusName: 'Compsognathus' },
  { slug: 'coelophysis', genusName: 'Coelophysis' },
  { slug: 'megalosaurus', genusName: 'Megalosaurus' },
  { slug: 'daspletosaurus', genusName: 'Daspletosaurus' },
  { slug: 'apatosaurus', genusName: 'Apatosaurus' },
  { slug: 'iguanodon', genusName: 'Iguanodon' },
  { slug: 'pachycephalosaurus', genusName: 'Pachycephalosaurus' },
  { slug: 'corythosaurus', genusName: 'Corythosaurus' },
  { slug: 'edmontosaurus', genusName: 'Edmontosaurus' },
  { slug: 'maiasaura', genusName: 'Maiasaura' },
  { slug: 'protoceratops', genusName: 'Protoceratops' },
  { slug: 'euoplocephalus', genusName: 'Euoplocephalus' },
  { slug: 'plateosaurus', genusName: 'Plateosaurus' },
  { slug: 'styracosaurus', genusName: 'Styracosaurus' },
  { slug: 'therizinosaurus', genusName: 'Therizinosaurus' },
  { slug: 'lambeosaurus', genusName: 'Lambeosaurus' },
  { slug: 'pachyrhinosaurus', genusName: 'Pachyrhinosaurus' },
  { slug: 'oviraptor', genusName: 'Oviraptor' },
  { slug: 'troodon', genusName: 'Troodon' },
  { slug: 'gallimimus', genusName: 'Gallimimus' },
  { slug: 'ornithomimus', genusName: 'Ornithomimus' },
  { slug: 'struthiomimus', genusName: 'Struthiomimus' },
  { slug: 'quetzalcoatlus', genusName: 'Quetzalcoatlus' },
  { slug: 'pterodactylus', genusName: 'Pterodactylus' },
  { slug: 'dimorphodon', genusName: 'Dimorphodon' },
  { slug: 'rhamphorhynchus', genusName: 'Rhamphorhynchus' },
  { slug: 'plesiosaurus', genusName: 'Plesiosaurus' },
  { slug: 'ichthyosaurus', genusName: 'Ichthyosaurus' },
  { slug: 'elasmosaurus', genusName: 'Elasmosaurus' },
  { slug: 'tylosaurus', genusName: 'Tylosaurus' },
  { slug: 'kronosaurus', genusName: 'Kronosaurus' },
  { slug: 'herrerasaurus', genusName: 'Herrerasaurus' },
  { slug: 'eoraptor', genusName: 'Eoraptor' },
]

// ── Helpers ─────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'DinoEncyclopedia DevTool/1.0 (educational project)' },
        signal: AbortSignal.timeout(15000),
      })
      if (res.ok) return res
      if (res.status === 404) throw new Error(`404 Not Found: ${url}`)
    } catch (e) {
      if (i === retries - 1) throw e
      await new Promise(r => setTimeout(r, 2000))
    }
  }
  throw new Error(`Failed after ${retries} retries: ${url}`)
}

// ── CSV mode: read pre-collected URLs ───────────────────────────────────

async function readCSV(): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>()
  if (!fs.existsSync(CSV_PATH)) return map

  const lines = fs.readFileSync(CSV_PATH, 'utf-8').split('\n').filter(Boolean)
  for (const line of lines.slice(1)) { // skip header
    const parts = line.split(',')
    const slug = parts[0]?.trim()
    const urls = parts.slice(2).map(u => u.trim()).filter(u => u.startsWith('http'))
    if (slug && urls.length > 0) map.set(slug, urls)
  }
  return map
}

// ── Scrape mode: extract images from dinosaur page ──────────────────────

async function scrapeImages(genusName: string): Promise<string[]> {
  const pageUrl = `${BASE_URL}/${genusName}-pictures`
  console.log(`  Scraping: ${pageUrl}`)
  try {
    const res = await fetchWithRetry(pageUrl)
    const html = await res.text()

    // Extract image URLs matching the CDN pattern
    const imgRegex = /https?:\/\/images\.dinosaurpictures\.org\/[^"'\s]+/gi
    const matches = [...new Set(html.match(imgRegex) ?? [])]
      .filter(u => !u.includes('/api/') && !u.includes('/map'))
      // Prefer AI-generated images (GenusName/GenusName_hash.jpg pattern)
      .sort((a, b) => {
        const aPrimary = a.includes(`/${genusName}/${genusName}_`)
        const bPrimary = b.includes(`/${genusName}/${genusName}_`)
        if (aPrimary && !bPrimary) return -1
        if (!aPrimary && bPrimary) return 1
        return 0
      })

    return matches.slice(0, 4) // hero + 2 gallery + spare
  } catch (e) {
    console.warn(`  Warning: ${(e as Error).message}`)
    return []
  }
}

// ── Download + convert ──────────────────────────────────────────────────

async function downloadAndConvert(
  url: string,
  outputPath: string,
  width: number,
  height: number,
  quality: number,
): Promise<boolean> {
  try {
    const res = await fetchWithRetry(url)
    const buffer = Buffer.from(await res.arrayBuffer())

    // If sharp is available, convert to WebP and resize
    try {
      const sharp = (await import('sharp')).default
      await sharp(buffer)
        .resize(width, height, { fit: 'cover', position: 'attention' })
        .webp({ quality })
        .toFile(outputPath)
    } catch {
      // Fallback: save original if sharp fails
      fs.writeFileSync(outputPath.replace('.webp', '.jpg'), buffer)
      console.warn(`  sharp unavailable, saved original: ${outputPath}`)
      return false
    }
    return true
  } catch (e) {
    console.warn(`  Download failed: ${url} — ${(e as Error).message}`)
    return false
  }
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Dinosaur Image Download Tool ===\n')
  console.log(`Target dir: ${ASSETS_DIR}`)
  ensureDir(ASSETS_DIR)

  // Check if sharp is available
  let hasSharp = false
  try { await import('sharp'); hasSharp = true } catch { /* will save originals */ }
  if (!hasSharp) console.warn('sharp not installed — images will be saved as original JPG.\n')

  // Load CSV for known URLs
  const csvUrls = await readCSV()
  const csvMode = csvUrls.size > 0
  if (csvMode) console.log(`CSV mode: ${csvUrls.size} dinosaurs with pre-collected URLs\n`)

  let successCount = 0
  let failCount = 0

  for (const dino of DINOSAURS) {
    const dir = path.join(ASSETS_DIR, dino.slug)
    ensureDir(dir)

    // Check if already downloaded
    const heroPath = path.join(dir, 'hero.webp')
    if (fs.existsSync(heroPath)) {
      console.log(`✓ ${dino.slug} (already exists)`)
      continue
    }

    console.log(`\n📥 ${dino.slug} (${dino.genusName})`)

    // Get URLs: from dino entry, CSV, or scrape
    let urls: string[] = []
    if (dino.primaryUrl) urls = [dino.primaryUrl, dino.secondaryUrl].filter(Boolean) as string[]
    if (urls.length === 0 && csvUrls.has(dino.slug)) urls = csvUrls.get(dino.slug)!
    if (urls.length === 0) urls = await scrapeImages(dino.genusName)

    if (urls.length === 0) {
      console.log(`  ⚠ No images found — skipping (DinoCardImage placeholder will be used)`)
      failCount++
      continue
    }

    // Download hero (first image)
    const heroOk = await downloadAndConvert(urls[0], path.join(dir, 'hero.webp'), 1200, 800, 80)
    if (heroOk) console.log('  ✓ hero.webp')

    // Download card (first image, smaller)
    const cardOk = await downloadAndConvert(urls[0], path.join(dir, 'card.webp'), 600, 400, 75)
    if (cardOk) console.log('  ✓ card.webp')

    // Download gallery images
    for (let g = 1; g <= Math.min(urls.length - 1, 2); g++) {
      const galOk = await downloadAndConvert(urls[g], path.join(dir, `gallery-${g}.webp`), 800, 600, 80)
      if (galOk) console.log(`  ✓ gallery-${g}.webp`)
    }

    successCount++

    // Be nice to the server
    await new Promise(r => setTimeout(r, 1500))
  }

  console.log(`\n=== Done ===`)
  console.log(`Success: ${successCount}, Failed/Skipped: ${failCount}`)
  console.log(`Images stored in: ${ASSETS_DIR}`)
  if (!hasSharp) console.log(`\nTip: Run 'npm install sharp' to enable WebP conversion.`)
}

main().catch(console.error)
