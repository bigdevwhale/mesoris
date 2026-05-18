// Splits the giant ru/encyclopedia.ts into per-dinosaur files under ru/dinosaurs/
const fs = require('fs')
const path = require('path')

const src = path.resolve(__dirname, '../src/locales/ru/encyclopedia.ts')
const outDir = path.resolve(__dirname, '../src/locales/ru/dinosaurs')

const content = fs.readFileSync(src, 'utf8')

// Strip the export default wrapper
let inner = content
  .replace(/^import[^;]*;\s*/m, '') // no imports in this file
  .replace(/^export default\s*\{\s*\n/, '')
  .replace(/\n\}\s*$/, '')
  .trimEnd()

// Split on the pattern: newline, two spaces, single quote (start of each dino key)
// Each section starts with: \n  'dino-id':
const sections = inner.split(/\n(?=  ')/)

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const entries = []

for (const section of sections) {
  const trimmed = section.trim()
  if (!trimmed) continue

  // Extract the dino ID — first quoted string
  const idMatch = trimmed.match(/^'([^']+)'/)
  if (!idMatch) {
    console.warn('Could not parse section:', trimmed.slice(0, 80))
    continue
  }

  const id = idMatch[1]
  const innerContent = trimmed.slice(idMatch[0].length + 1).trim() // : { ... },
  // Remove the leading ': ' and trailing ','
  const translationBody = innerContent.replace(/^:\s*/, '').replace(/,\s*$/, '')

  const filePath = path.join(outDir, `${id}.ts`)
  const fileContent = `export default ${translationBody}\n`

  fs.writeFileSync(filePath, fileContent, 'utf8')
  entries.push(id)
  console.log(`Created ${id}.ts`)
}

// Create index.ts that auto-imports all
const indexContent = `// Auto-generated — all Russian dinosaur translations.
// Add a new .ts file here and it will be picked up automatically.
const modules = import.meta.glob<Record<string, unknown>>('./*.ts', { eager: true })

const translations: Record<string, unknown> = {}

for (const [p, m] of Object.entries(modules)) {
  if (p.endsWith('index.ts')) continue
  // Each file exports default with the translation
  const data = (m as { default?: Record<string, unknown> }).default ?? m
  // Use filename as key
  const key = p.replace(/^\.\//, '').replace(/\.ts$/, '')
  translations[key] = data
}

export default translations
`

fs.writeFileSync(path.join(outDir, 'index.ts'), indexContent, 'utf8')
console.log(`\nCreated index.ts with ${entries.length} dinosaur translations`)
