import type { Dinosaur } from '@/types/dinosaur'

const modules = import.meta.glob('./*.ts', { eager: true })

// Auto-discover all dinosaur data files — just create a new .ts file in this directory.
// Excludes index.ts and img.ts.
export const dinosaurs: Dinosaur[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts') && !path.endsWith('img.ts'))
  .map(([, m]) => {
    const value = Object.values(m as Record<string, unknown>).find(
      (v): v is Dinosaur => v != null && typeof v === 'object' && 'id' in v,
    )
    return value
  })
  .filter((d): d is Dinosaur => d != null)

export const popularDinoIds = [
  'tyrannosaurus-rex',
  'triceratops',
  'velociraptor',
  'brachiosaurus',
  'spinosaurus',
  'stegosaurus',
  'ankylosaurus',
  'pteranodon',
]
