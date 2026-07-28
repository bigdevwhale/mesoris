/**
 * Shop catalog. Each entry has an `itemId` and a `priceCoins` cost.
 * Pricing rationale:
 *  - potion (25 HP)        →  5 coins (cheapest; 1 wild ≈ 5+level)
 *  - super-potion (60 HP)  → 15 coins
 *  - revive (full HP)      → 25 coins (endgame emergency)
 *  - ball (1x catch)       →  8 coins
 *  - great-ball (1.5x)     → 20 coins
 */
import type { ItemId } from '@/logic/dino-quest-types'

export interface ShopEntry {
  itemId: ItemId
  priceCoins: number
}

export const shopCatalog: ShopEntry[] = [
  { itemId: 'potion', priceCoins: 5 },
  { itemId: 'super-potion', priceCoins: 15 },
  { itemId: 'revive', priceCoins: 25 },
  { itemId: 'ball', priceCoins: 8 },
  { itemId: 'great-ball', priceCoins: 20 },
]
