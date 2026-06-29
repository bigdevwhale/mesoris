/**
 * Deterministic PRNG (mulberry32) + value-noise utilities.
 * Shared across game engines (Dino Quest, Meteor Run, etc).
 */

/** Mulberry32 — fast 32-bit PRNG, deterministic from seed. */
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0
  return () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/** Generate a random integer in [lo, hi] (inclusive). */
export function intInRange(rng: () => number, lo: number, hi: number): number {
  return lo + Math.floor(rng() * (hi - lo + 1))
}

/** Fisher–Yates shuffle of a copy of `arr`, using the given rng. */
export function shuffleSeeded<T>(arr: readonly T[], rng: () => number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Pick one item by weighted random. Items and weights must be same length. */
export function pickWeighted<T>(items: readonly T[], weights: readonly number[], rng: () => number): T {
  if (items.length === 0) throw new Error('pickWeighted: empty items')
  const total = weights.reduce((s, w) => s + Math.max(0, w), 0)
  if (total <= 0) return items[Math.floor(rng() * items.length)]
  let roll = rng() * total
  for (let i = 0; i < items.length; i++) {
    roll -= Math.max(0, weights[i])
    if (roll <= 0) return items[i]
  }
  return items[items.length - 1]
}

// ---------------------------------------------------------------------------
// Value noise (2D, fBm). No external dependencies. Deterministic from seed.
// ---------------------------------------------------------------------------

/** Build a 256-entry permutation table from an rng — classic value-noise input. */
function buildPerm(rng: () => number): Uint8Array {
  const p = new Uint8Array(512)
  const base = new Uint8Array(256)
  for (let i = 0; i < 256; i++) base[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[base[i], base[j]] = [base[j], base[i]]
  }
  for (let i = 0; i < 512; i++) p[i] = base[i & 255]
  return p
}

function fade(t: number): number {
  // smoothstep: 6t^5 - 15t^4 + 10t^3
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function hash2(perm: Uint8Array, ix: number, iy: number): number {
  return perm[(ix + perm[iy & 255]) & 255] / 255
}

/**
 * 2D value noise in [0, 1] — deterministic from seed.
 * Octaves: fractal-Brownian-motion layers; higher = more detail.
 * Scale: tile frequency (smaller = smoother/zoomed-out).
 */
export function valueNoise2D(seed: number): (x: number, y: number, octaves?: number, scale?: number) => number {
  const rng = mulberry32(seed)
  const perm = buildPerm(rng)

  return (x: number, y: number, octaves = 3, scale = 0.06): number => {
    let amp = 1
    let freq = scale
    let sum = 0
    let norm = 0
    for (let o = 0; o < octaves; o++) {
      const xf = x * freq
      const yf = y * freq
      const ix = Math.floor(xf)
      const iy = Math.floor(yf)
      const tx = fade(xf - ix)
      const ty = fade(yf - iy)
      const v00 = hash2(perm, ix, iy)
      const v10 = hash2(perm, ix + 1, iy)
      const v01 = hash2(perm, ix, iy + 1)
      const v11 = hash2(perm, ix + 1, iy + 1)
      const a = lerp(v00, v10, tx)
      const b = lerp(v01, v11, tx)
      const n = lerp(a, b, ty)
      sum += n * amp
      norm += amp
      amp *= 0.5
      freq *= 2
    }
    return sum / norm
  }
}
