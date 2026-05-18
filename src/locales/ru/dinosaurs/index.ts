// Auto-generated — all Russian dinosaur translations.
// Add a new .ts file here and it will be picked up automatically.

const modules = import.meta.glob<{ default: Record<string, unknown> }>('./*.ts', { eager: true })

const translations: Record<string, unknown> = {}

for (const [p, m] of Object.entries(modules)) {
  if (p.endsWith('index.ts')) continue
  const key = p.replace('./', '').replace('.ts', '')
  translations[key] = m.default
}

export default translations
