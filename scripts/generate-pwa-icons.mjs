import sharp from 'sharp'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const svgContent = readFileSync(join(root, 'public', 'favicon.svg'), 'utf-8')

// Create a square SVG with padding and dark background
function wrapSvg(size) {
  const padding = Math.round(size * 0.15)
  const inner = size - padding * 2
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="#0f180f"/>
      <svg x="${padding}" y="${padding}" width="${inner}" height="${inner}" viewBox="0 0 48 46">
        ${svgContent.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
      </svg>
    </svg>
  `)
}

const sizes = [192, 512]

for (const size of sizes) {
  await sharp(wrapSvg(size))
    .png()
    .toFile(join(root, 'public', `pwa-${size}x${size}.png`))
  console.log(`✓ Generated pwa-${size}x${size}.png`)
}
