/**
 * Procedural pixel-art tileset + player + dino sprites for Dino Quest.
 * 16×16 GBA-style. Drawn once into offscreen canvases, then drawImage()'d.
 * Palette inspired by Pokémon Ruby/Sapphire (Hoenn region).
 */
import type { Direction, TileType } from './dino-quest-types'

// ---------------------------------------------------------------------------
// Palette (GBA-style: base + light + dark + accent)
// ---------------------------------------------------------------------------

const PAL = {
  // Grass
  grassA: '#5dbe5a',
  grassB: '#4ea84a',
  grassC: '#3a8a3a',
  grassD: '#2a7a3a',
  // Tall grass
  tallA: '#1e5c2a',
  tallB: '#2d6e3a',
  tallC: '#0e4c1a',
  // Water
  waterA: '#3a8ee6',
  waterB: '#1e62b8',
  waterC: '#5298ee',
  // Tree
  treeA: '#2a8a3a',
  treeB: '#1e6a2a',
  treeC: '#5dbe5a',
  treeTrunk: '#5c3a1a',
  treeTrunkB: '#3e2a14',
  // Sand
  sandA: '#e8c878',
  sandB: '#c8a458',
  sandC: '#f0d888',
  // Rock
  rockA: '#7a7a7a',
  rockB: '#5a5a5a',
  rockC: '#9a9a9a',
  // Lava
  lavaA: '#d4382a',
  lavaB: '#e85d2c',
  lavaC: '#a82818',
  lavaD: '#f08030',
  // Path
  pathA: '#c8a878',
  pathB: '#a08058',
  // Camp
  campA: '#3a8a3a',
  campB: '#e8d440',
  campC: '#2a6a2a',
  // Ruins
  ruinA: '#9a8a6a',
  ruinB: '#6a5a3a',
  ruinC: '#baaa8a',
  // Nest
  nestA: '#5c3a1a',
  nestB: '#e8d440',
  nestC: '#a06030',
  // Volcano
  volcA: '#3a2a2a',
  volcB: '#d4382a',
  // Shop
  shopA: '#d4a43a', // gold awning
  shopB: '#8a6a1a', // dark wood
  shopC: '#f8d878', // light gold
  shopD: '#c4382d', // red awning stripe
  // Trainer
  trainerA: '#9a3acc', // purple robe
  trainerB: '#5a1a8a', // dark purple
  trainerC: '#f0e8d0', // skin
  trainerFlag: '#c4382d', // red flag
  // UI
  uiBorder: '#383030',
  uiBorderL: '#706060',
  uiFace: '#f0e8d0',
  uiFaceS: '#a09080',
  // Player
  skin: '#f0c898',
  skinB: '#c89868',
  hairA: '#5a2a1a',
  hairB: '#3a1a0a',
  shirtA: '#3a8ed8',
  shirtB: '#1e62a8',
  pants: '#2a2a4a',
  shoe: '#1a1a2a',
  // Wild dino (generic)
  dinoA: '#5dbe5a',
  dinoB: '#2a7a3a',
  dinoC: '#3a8a3a',
  dinoEye: '#1a1a1a',
  dinoBelly: '#c8e890',
} as const

// ---------------------------------------------------------------------------
// Tile drawing
// ---------------------------------------------------------------------------

type PixelDrawer = (x: number, y: number, color: string) => void

function makeDrawer(ctx: CanvasRenderingContext2D, s = 1) {
  const px = (x: number, y: number, color: string) => {
    ctx.fillStyle = color
    ctx.fillRect(x * s, y * s, s, s)
  }
  return px
}

/** Draw a 16×16 grass tile. */
function drawGrass(ctx: CanvasRenderingContext2D, seed: number, s = 1): void {
  const p = makeDrawer(ctx, s)
  p(0, 0, PAL.grassA)
  p(1, 0, PAL.grassB)
  p(2, 0, PAL.grassA)
  // Sprinkle darker and lighter grass blades
  for (let i = 0; i < 16; i++) {
    const x = (seed + i * 3) & 15
    const y = ((seed * 7) + i * 5) & 15
    const c = (seed + i) & 3
    const col = c === 0 ? PAL.grassB : c === 1 ? PAL.grassC : c === 2 ? PAL.grassA : PAL.grassC
    p(x, y, col)
  }
  // Edge darken
  p(0, 15, PAL.grassD)
  p(15, 0, PAL.grassD)
}

function drawTallGrass(ctx: CanvasRenderingContext2D, frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  // Base grass
  p(0, 0, PAL.grassA)
  for (let x = 0; x < 16; x++) {
    for (let y = 8; y < 16; y++) {
      const c = ((x * 7) + y * 3) & 3
      p(x, y, c === 0 ? PAL.grassB : c === 1 ? PAL.grassC : PAL.grassA)
    }
  }
  // Tall blades
  const blades: [number, number, string][] = [
    [1, 5, PAL.tallA],
    [3, 4, PAL.tallB],
    [5, 6, PAL.tallA],
    [6, 3, PAL.tallC],
    [8, 5, PAL.tallA],
    [10, 4, PAL.tallB],
    [12, 6, PAL.tallA],
    [14, 5, PAL.tallC],
    [2, 7, PAL.tallB],
    [9, 3, PAL.tallA],
    [13, 7, PAL.tallB],
  ]
  for (const [x, y, c] of blades) {
    const o = frame & 1
    p(x, y - o, c)
    p(x, y + 1 - o, c)
  }
}

function drawWater(ctx: CanvasRenderingContext2D, frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  p(0, 0, PAL.waterA)
  p(0, 0, PAL.waterA)
  // Wave highlights
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const w = (x + y * 2 + frame) & 7
      p(x, y, w === 0 ? PAL.waterC : w === 4 ? PAL.waterB : PAL.waterA)
    }
  }
  // Foam line
  p(0, 8 + (frame & 1), PAL.waterC)
  p(15, 11 + (frame & 1), PAL.waterC)
}

function drawTree(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  // Ground
  p(0, 14, PAL.grassA)
  p(0, 15, PAL.grassA)
  // Trunk
  for (let y = 11; y < 15; y++) {
    p(7, y, PAL.treeTrunk)
    p(8, y, PAL.treeTrunkB)
  }
  // Canopy (circle)
  for (let y = 0; y < 12; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5
      const dy = y - 5
      const d = dx * dx + dy * dy
      if (d < 18) {
        const shade = (x + y) & 1
        p(x, y, shade ? PAL.treeA : PAL.treeB)
        // Light spot
        if (dx * dx + (dy + 2) * (dy + 2) < 6) p(x, y, PAL.treeC)
      } else if (d < 26) {
        p(x, y, PAL.treeA)
      }
    }
  }
}

function drawSand(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const n = (x * 3 + y * 5) & 3
      p(x, y, n === 0 ? PAL.sandA : n === 1 ? PAL.sandC : n === 2 ? PAL.sandA : PAL.sandB)
    }
  }
}

function drawRock(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5
      const dy = y - 9
      const d = dx * dx + dy * dy
      if (d < 22) {
        const shade = (x + y) & 1
        p(x, y, shade ? PAL.rockA : PAL.rockC)
        if (d < 6) p(x, y, PAL.rockC)
        if (d > 18) p(x, y, PAL.rockB)
      } else {
        p(x, y, PAL.grassA)
      }
    }
  }
  // Base
  for (let x = 4; x < 12; x++) p(x, 13, PAL.rockB)
  for (let x = 3; x < 13; x++) p(x, 14, PAL.rockB)
}

function drawLava(ctx: CanvasRenderingContext2D, frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const w = (x + y * 3 + frame * 2) & 3
      p(x, y, w === 0 ? PAL.lavaA : w === 1 ? PAL.lavaB : w === 2 ? PAL.lavaC : PAL.lavaD)
    }
  }
}

function drawPath(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const n = (x * 5 + y * 3) & 3
      p(x, y, n === 0 ? PAL.pathB : PAL.pathA)
    }
  }
}

function drawCamp(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  // Grass base
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Tent
  p(6, 7, PAL.campB)
  p(7, 6, PAL.campB)
  p(8, 6, PAL.campB)
  p(9, 7, PAL.campB)
  p(7, 8, PAL.campB)
  p(8, 8, PAL.campB)
  p(6, 9, PAL.campB)
  p(9, 9, PAL.campB)
  p(5, 10, PAL.campB)
  p(10, 10, PAL.campB)
  // Fire
  p(13, 12, PAL.lavaA)
  p(14, 11, PAL.lavaB)
  p(13, 11, PAL.lavaD)
  p(12, 12, PAL.lavaB)
  // Pole
  p(4, 4, PAL.treeTrunk)
  p(4, 5, PAL.treeTrunk)
  // Flag
  p(5, 5, PAL.campB)
  p(5, 6, PAL.campB)
}

function drawRuins(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Two columns + lintel
  p(3, 6, PAL.ruinA)
  p(3, 7, PAL.ruinB)
  p(3, 8, PAL.ruinA)
  p(3, 9, PAL.ruinB)
  p(3, 10, PAL.ruinA)
  p(3, 11, PAL.ruinB)
  p(3, 12, PAL.ruinA)
  p(12, 6, PAL.ruinA)
  p(12, 7, PAL.ruinB)
  p(12, 8, PAL.ruinA)
  p(12, 9, PAL.ruinB)
  p(12, 10, PAL.ruinA)
  p(12, 11, PAL.ruinB)
  p(12, 12, PAL.ruinA)
  // Lintel
  for (let x = 3; x < 13; x++) p(x, 5, PAL.ruinC)
  for (let x = 3; x < 13; x++) p(x, 6, PAL.ruinA)
  // Base steps
  p(2, 13, PAL.ruinB)
  p(13, 13, PAL.ruinB)
}

function drawNest(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Nest ring
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5
      const dy = y - 8
      const d = dx * dx + dy * dy
      if (d > 14 && d < 28) p(x, y, PAL.nestA)
      if (d > 18 && d < 22) p(x, y, PAL.nestC)
    }
  }
  // Egg
  p(7, 6, PAL.nestB)
  p(8, 6, PAL.nestB)
  p(6, 7, PAL.nestB)
  p(9, 7, PAL.nestB)
  p(6, 8, PAL.nestB)
  p(9, 8, PAL.nestB)
  p(7, 9, PAL.nestB)
  p(8, 9, PAL.nestB)
  // Egg spot
  p(7, 7, PAL.uiFace)
  p(8, 8, PAL.uiFace)
}

function drawVolcano(ctx: CanvasRenderingContext2D, frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Cone
  for (let y = 4; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5
      const dy = y - 4
      // Cone shape
      const halfW = (y - 4) * 0.7 + 1
      if (Math.abs(dx) < halfW) {
        const shade = ((x + y) >> 1) & 1
        p(x, y, shade ? PAL.volcA : PAL.rockB)
      }
    }
  }
  // Crater glow
  p(7, 4, PAL.lavaB)
  p(8, 4, PAL.lavaB)
  p(7, 5, PAL.lavaA)
  p(8, 5, PAL.lavaA)
  p(6, 4, PAL.lavaD)
  p(9, 4, PAL.lavaD)
  // Lava drip
  if (frame & 1) p(7, 3, PAL.lavaD)
  if ((frame >> 1) & 1) p(9, 3, PAL.lavaD)
}

function drawShop(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  // Grass base
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Counter (wood) rows 10-13, cols 3-12
  for (let y = 10; y < 14; y++) for (let x = 3; x < 13; x++) p(x, y, PAL.shopB)
  // Counter top trim
  for (let x = 3; x < 13; x++) p(x, 9, PAL.shopA)
  // Striped awning: rows 3-4 alternating red/white, cols 2-13
  for (let x = 2; x < 14; x++) {
    const c = (x & 1) === 0 ? PAL.shopD : '#f8f8f8'
    p(x, 3, c)
    p(x, 4, c)
  }
  // Awning trim (gold)
  for (let x = 2; x < 14; x++) p(x, 5, PAL.shopA)
  // Two poles
  p(2, 5, PAL.shopB)
  p(2, 6, PAL.shopB)
  p(2, 7, PAL.shopB)
  p(2, 8, PAL.shopB)
  p(2, 9, PAL.shopB)
  p(13, 5, PAL.shopB)
  p(13, 6, PAL.shopB)
  p(13, 7, PAL.shopB)
  p(13, 8, PAL.shopB)
  p(13, 9, PAL.shopB)
  // Two coins on the counter
  p(6, 8, PAL.shopA)
  p(7, 8, PAL.shopA)
  p(8, 8, PAL.shopA)
  p(9, 8, PAL.shopA)
  p(6, 7, PAL.shopC)
  p(7, 7, PAL.shopC)
  p(8, 7, PAL.shopC)
  p(9, 7, PAL.shopC)
}

function drawTrainer(ctx: CanvasRenderingContext2D, s = 1): void {
  const p = makeDrawer(ctx, s)
  // Grass base
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, PAL.grassA)
  // Stone pedestal rows 11-13, cols 4-11
  for (let y = 11; y < 14; y++) for (let x = 4; x < 12; x++) p(x, y, PAL.rockA)
  // Pedestal top highlight
  for (let x = 4; x < 12; x++) p(x, 10, PAL.rockC)
  // NPC head
  p(7, 2, PAL.trainerC)
  p(8, 2, PAL.trainerC)
  p(7, 3, PAL.trainerC)
  p(8, 3, PAL.trainerC)
  // Robe (body) rows 4-9
  for (let y = 4; y < 10; y++) for (let x = 6; x < 10; x++) p(x, y, PAL.trainerA)
  // Robe dark trim
  p(6, 4, PAL.trainerB)
  p(9, 4, PAL.trainerB)
  p(6, 9, PAL.trainerB)
  p(9, 9, PAL.trainerB)
  // Tiny red flag in left hand
  p(5, 5, PAL.trainerFlag)
  p(5, 6, PAL.trainerFlag)
  p(5, 7, PAL.trainerFlag)
  p(4, 6, PAL.trainerFlag)
  // Flag pole
  p(5, 4, PAL.shopB)
  p(5, 8, PAL.shopB)
}

// ---------------------------------------------------------------------------
// Player sprite (16×16, 4 dirs × 2 walk frames)
// ---------------------------------------------------------------------------

function drawPlayer(ctx: CanvasRenderingContext2D, dir: Direction, frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) p(x, y, 'transparent')

  // Clear transparent
  ctx.clearRect(0, 0, 16 * s, 16 * s)

  const legOffset = frame & 1
  // Hair
  p(5, 2, PAL.hairA)
  p(6, 2, PAL.hairA)
  p(9, 2, PAL.hairA)
  p(10, 2, PAL.hairA)
  p(5, 3, PAL.hairA)
  p(6, 3, PAL.hairB)
  p(7, 3, PAL.hairA)
  p(8, 3, PAL.hairA)
  p(9, 3, PAL.hairA)
  p(10, 3, PAL.hairA)
  p(5, 4, PAL.hairA)
  p(6, 4, PAL.hairB)
  p(7, 4, PAL.hairB)
  p(8, 4, PAL.hairB)
  p(9, 4, PAL.hairB)
  p(10, 4, PAL.hairA)

  // Face
  p(5, 5, PAL.skin)
  p(6, 5, PAL.skin)
  p(7, 5, PAL.skin)
  p(8, 5, PAL.skin)
  p(9, 5, PAL.skin)
  p(10, 5, PAL.skin)
  // Eyes
  if (dir === 'up') {
    p(6, 6, PAL.hairA)
    p(9, 6, PAL.hairA)
  } else {
    p(6, 6, PAL.dinoEye)
    p(9, 6, PAL.dinoEye)
  }
  p(5, 6, PAL.skin)
  p(7, 6, PAL.skin)
  p(8, 6, PAL.skin)
  p(10, 6, PAL.skin)
  p(5, 7, PAL.skin)
  p(6, 7, PAL.skin)
  p(7, 7, PAL.skinB)
  p(8, 7, PAL.skinB)
  p(9, 7, PAL.skin)
  p(10, 7, PAL.skin)
  p(5, 8, PAL.skinB)
  p(6, 8, PAL.skinB)
  p(7, 8, PAL.skinB)
  p(8, 8, PAL.skinB)
  p(9, 8, PAL.skinB)
  p(10, 8, PAL.skinB)

  // Neck shadow
  p(6, 9, PAL.skinB)
  p(7, 9, PAL.skinB)
  p(8, 9, PAL.skinB)
  p(9, 9, PAL.skinB)

  // Shirt
  p(4, 9, PAL.shirtA)
  p(5, 9, PAL.shirtA)
  p(6, 9, PAL.shirtA)
  p(7, 9, PAL.shirtA)
  p(8, 9, PAL.shirtA)
  p(9, 9, PAL.shirtA)
  p(10, 9, PAL.shirtA)
  p(11, 9, PAL.shirtA)
  p(4, 10, PAL.shirtA)
  p(5, 10, PAL.shirtB)
  p(6, 10, PAL.shirtA)
  p(7, 10, PAL.shirtA)
  p(8, 10, PAL.shirtA)
  p(9, 10, PAL.shirtA)
  p(10, 10, PAL.shirtB)
  p(11, 10, PAL.shirtA)
  p(4, 11, PAL.shirtA)
  p(5, 11, PAL.shirtA)
  p(6, 11, PAL.shirtB)
  p(7, 11, PAL.shirtA)
  p(8, 11, PAL.shirtA)
  p(9, 11, PAL.shirtB)
  p(10, 11, PAL.shirtA)
  p(11, 11, PAL.shirtA)

  // Arms
  p(3, 10, PAL.skin)
  p(3, 11, PAL.skin)
  p(12, 10, PAL.skin)
  p(12, 11, PAL.skin)

  // Pants
  p(4, 12, PAL.pants)
  p(5, 12, PAL.pants)
  p(6, 12, PAL.pants)
  p(7, 12, PAL.pants)
  p(8, 12, PAL.pants)
  p(9, 12, PAL.pants)
  p(10, 12, PAL.pants)
  p(11, 12, PAL.pants)

  // Legs (walking frame swap)
  p(5, 13, PAL.pants)
  p(6, 13, PAL.pants)
  p(9, 13, PAL.pants)
  p(10, 13, PAL.pants)
  if (legOffset === 0) {
    p(5, 14, PAL.pants)
    p(6, 14, PAL.pants)
    p(9, 14, PAL.pants)
    p(10, 14, PAL.pants)
  } else {
    p(5, 14, PAL.pants)
    p(9, 14, PAL.pants)
  }

  // Shoes
  p(4, 15, PAL.shoe)
  p(5, 15, PAL.shoe)
  p(6, 15, PAL.shoe)
  p(9, 15, PAL.shoe)
  p(10, 15, PAL.shoe)
  p(11, 15, PAL.shoe)
}

// ---------------------------------------------------------------------------
// Wild dino overworld sprite (simplified, color varies)
// ---------------------------------------------------------------------------

export function drawWildDino(ctx: CanvasRenderingContext2D, size: 'small' | 'medium' | 'large' | 'gigantic' = 'small', frame = 0, s = 1): void {
  const p = makeDrawer(ctx, s)
  ctx.clearRect(0, 0, 16 * s, 16 * s)
  // Use a simple bipedal/quadruped silhouette
  // Body
  p(5, 8, PAL.dinoA)
  p(6, 8, PAL.dinoA)
  p(7, 8, PAL.dinoA)
  p(8, 8, PAL.dinoA)
  p(9, 8, PAL.dinoA)
  p(10, 8, PAL.dinoA)
  // Head
  p(11, 6, PAL.dinoA)
  p(12, 6, PAL.dinoA)
  p(11, 7, PAL.dinoA)
  p(12, 7, PAL.dinoB)
  // Tail
  p(4, 9, PAL.dinoB)
  p(3, 10, PAL.dinoB)
  p(2, 11, PAL.dinoB)
  // Belly
  p(6, 9, PAL.dinoBelly)
  p(7, 9, PAL.dinoBelly)
  p(8, 9, PAL.dinoBelly)
  p(9, 9, PAL.dinoBelly)
  // Legs
  if (size === 'large' || size === 'gigantic') {
    p(5, 11, PAL.dinoC)
    p(6, 11, PAL.dinoC)
    p(8, 11, PAL.dinoC)
    p(9, 11, PAL.dinoC)
  } else {
    p(5, 10, PAL.dinoC)
    p(6, 10, PAL.dinoC)
    p(8, 10, PAL.dinoC)
    p(9, 10, PAL.dinoC)
  }
  // Eye
  p(12, 6, PAL.dinoEye)
  // Mouth
  p(13, 7, PAL.dinoB)
  // Walk frame
  if (frame & 1) {
    p(5, 12, PAL.dinoB)
    p(9, 12, PAL.dinoB)
  } else {
    p(4, 12, PAL.dinoB)
    p(10, 12, PAL.dinoB)
  }
}

// ---------------------------------------------------------------------------
// Sprite cache
// ---------------------------------------------------------------------------

export interface SpriteCache {
  tiles: Record<TileType, HTMLCanvasElement> // single frame
  tilesAnimated: Record<'tall-grass' | 'water' | 'lava' | 'volcano', HTMLCanvasElement[]>
  player: Record<Direction, HTMLCanvasElement[]> // 2 walk frames per dir
  wildDino: HTMLCanvasElement[]
  scale: number
}

function makeTileCanvas(size: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = 16 * size
  c.height = 16 * size
  return c
}

export function buildSpriteCache(scale = 1): SpriteCache {
  const tiles: Record<TileType, HTMLCanvasElement> = {} as any
  const tilesAnimated: Record<'tall-grass' | 'water' | 'lava' | 'volcano', HTMLCanvasElement[]> = {} as any

  const drawAt = (canvas: HTMLCanvasElement, draw: (ctx: CanvasRenderingContext2D) => void, frame = 0) => {
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = false
    draw(ctx)
  }

  // Static tiles
  const grass = makeTileCanvas(scale)
  drawAt(grass, (ctx) => drawGrass(ctx, 1, scale))
  tiles.grass = grass
  tiles.sand = makeTileCanvas(scale)
  drawAt(tiles.sand, (ctx) => drawSand(ctx, scale))
  tiles.tree = makeTileCanvas(scale)
  drawAt(tiles.tree, (ctx) => drawTree(ctx, scale))
  tiles.rock = makeTileCanvas(scale)
  drawAt(tiles.rock, (ctx) => drawRock(ctx, scale))
  tiles.path = makeTileCanvas(scale)
  drawAt(tiles.path, (ctx) => drawPath(ctx, scale))
  tiles.camp = makeTileCanvas(scale)
  drawAt(tiles.camp, (ctx) => drawCamp(ctx, scale))
  tiles.ruins = makeTileCanvas(scale)
  drawAt(tiles.ruins, (ctx) => drawRuins(ctx, scale))
  tiles.nest = makeTileCanvas(scale)
  drawAt(tiles.nest, (ctx) => drawNest(ctx, scale))
  tiles.shop = makeTileCanvas(scale)
  drawAt(tiles.shop, (ctx) => drawShop(ctx, scale))
  tiles.trainer = makeTileCanvas(scale)
  drawAt(tiles.trainer, (ctx) => drawTrainer(ctx, scale))

  // Animated tiles
  tilesAnimated['tall-grass'] = [0, 1].map((f) => {
    const c = makeTileCanvas(scale)
    drawAt(c, (ctx) => drawTallGrass(ctx, f, scale))
    return c
  })
  tilesAnimated.water = [0, 1, 2, 3].map((f) => {
    const c = makeTileCanvas(scale)
    drawAt(c, (ctx) => drawWater(ctx, f, scale))
    return c
  })
  tilesAnimated.lava = [0, 1, 2, 3].map((f) => {
    const c = makeTileCanvas(scale)
    drawAt(c, (ctx) => drawLava(ctx, f, scale))
    return c
  })
  tilesAnimated.volcano = [0, 1, 2, 3].map((f) => {
    const c = makeTileCanvas(scale)
    drawAt(c, (ctx) => drawVolcano(ctx, f, scale))
    return c
  })

  // Map static tile names to their first frame for non-animated draw helpers
  tiles['tall-grass'] = tilesAnimated['tall-grass'][0]
  tiles.water = tilesAnimated.water[0]
  tiles.lava = tilesAnimated.lava[0]
  tiles.volcano = tilesAnimated.volcano[0]

  // Player
  const player = {
    up: [],
    down: [],
    left: [],
    right: [],
  } as Record<Direction, HTMLCanvasElement[]>
  const dirs: Direction[] = ['up', 'down', 'left', 'right']
  for (const dir of dirs) {
    player[dir] = [0, 1].map(() => {
      const c = makeTileCanvas(scale)
      drawAt(c, (ctx) => drawPlayer(ctx, dir, 0, scale))
      return c
    })
  }

  // Wild dino
  const wildDino = [0, 1].map(() => {
    const c = makeTileCanvas(scale)
    drawAt(c, (ctx) => drawWildDino(ctx, 'small', 0, scale))
    return c
  })

  return { tiles, tilesAnimated, player, wildDino, scale }
}

// ---------------------------------------------------------------------------
// HiDPI canvas helper
// ---------------------------------------------------------------------------

export function setupHiDPI(canvas: HTMLCanvasElement, cssW: number, cssH: number): CanvasRenderingContext2D {
  const dpr = (typeof window !== 'undefined' && window.devicePixelRatio) || 1
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)
  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}
