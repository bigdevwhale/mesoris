/**
 * Trainer rosters for the 3 fixed trainer POIs placed by `placePois`.
 *
 * Each trainer has 3 dinos. Currently only `party[0]` is actually fought
 * (see `startBattle`); the other two are shown as a "team preview" in
 * `TrainerIntro.vue`. Multi-dino rotation is deferred to Phase 12.
 *
 * Level ranges (tier):
 *  - normal:    4-5   (early-game)
 *  - legendary: 10-12 (mid-game)
 *  - boss:      20-25 (late-game)
 */
export type TrainerId = 'normal' | 'legendary' | 'boss'

export interface TrainerDinoEntry {
  /** matches `Dinosaur.id` */
  id: string
  level: number
}

export interface TrainerRosterEntry {
  id: TrainerId
  /** i18n key under `games.dinoQuest.trainer.*Name` */
  displayNameKey: string
  /** short label shown as a sprite-icon placeholder */
  spriteIcon: string
  party: TrainerDinoEntry[]
}

export const trainerRosters: Record<TrainerId, TrainerRosterEntry> = {
  normal: {
    id: 'normal',
    spriteIcon: '🌿',
    displayNameKey: 'games.dinoQuest.trainer.normalName',
    party: [
      { id: 'compsognathus', level: 4 },
      { id: 'velociraptor', level: 5 },
      { id: 'coelophysis', level: 5 },
    ],
  },
  legendary: {
    id: 'legendary',
    spriteIcon: '🥷',
    displayNameKey: 'games.dinoQuest.trainer.legendaryName',
    party: [
      { id: 'deinonychus', level: 10 },
      { id: 'dilophosaurus', level: 12 },
      { id: 'utahraptor', level: 12 },
    ],
  },
  boss: {
    id: 'boss',
    spriteIcon: '👑',
    displayNameKey: 'games.dinoQuest.trainer.bossName',
    party: [
      { id: 'allosaurus', level: 20 },
      { id: 'ceratosaurus', level: 22 },
      { id: 'spinosaurus', level: 25 },
    ],
  },
}
