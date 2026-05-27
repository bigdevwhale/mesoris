const modules = import.meta.glob<{ default: unknown }>('./*.ts', { eager: true })

const translations: Record<string, unknown> = {}

for (const [path, mod] of Object.entries(modules)) {
  const id = path.replace('./', '').replace('.ts', '')
  if (id !== 'index') {
    translations[id] = mod.default
  }
}

export default translations
