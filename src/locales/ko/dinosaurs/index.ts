const modules = import.meta.glob<{ default: Record<string, unknown> }>('./*.ts', { eager: true })

const translations: Record<string, unknown> = {}

for (const [p, m] of Object.entries(modules)) {
  if (p.endsWith('index.ts')) continue
  const key = p.replace('./', '').replace('.ts', '')
  translations[key] = m.default
}

export default translations
