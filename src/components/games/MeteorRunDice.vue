<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  isRolling: boolean
  diceCount?: 1 | 2
  size?: 'sm' | 'md' | 'lg'
}>(), {
  diceCount: 1,
  size: 'md',
})

const rotation = ref({ x: 0, y: 0 })
let rollTimer: ReturnType<typeof setInterval> | null = null

watch(
  () => props.isRolling,
  (rolling) => {
    if (rolling) {
      // Animate random rotation while rolling
      rollTimer = setInterval(() => {
        rotation.value = {
          x: rotation.value.x + 360 + (Math.random() - 0.5) * 180,
          y: rotation.value.y + 360 + (Math.random() - 0.5) * 180,
        }
      }, 80)
    } else {
      if (rollTimer) {
        clearInterval(rollTimer)
        rollTimer = null
      }
      // Snap to face showing `value`
      rotation.value = getRotationForFace(props.value)
    }
  },
)

// If `value` changes after we stopped rolling (the engine writes the final
// number right after the spin), snap the cube again to the new face.
watch(
  () => props.value,
  (val) => {
    if (!props.isRolling && val > 0) {
      rotation.value = getRotationForFace(val)
    }
  },
)

function getRotationForFace(face: number) {
  // Map 1..6 to rotation that shows the right dots
  // Standard die: opposite faces sum to 7
  // 1 opposite 6, 2 opposite 5, 3 opposite 4
  // Faces: 1 (front), 6 (back), 2 (right), 5 (left), 3 (top), 4 (bottom)
  switch (face) {
    case 1: return { x: 0, y: 0 }
    case 6: return { x: 0, y: 180 }
    case 2: return { x: 0, y: -90 }
    case 5: return { x: 0, y: 90 }
    case 3: return { x: -90, y: 0 }
    case 4: return { x: 90, y: 0 }
    default: return { x: 0, y: 0 }
  }
}

const sizePx = computed(() => {
  const map = { sm: 56, md: 72, lg: 96 }
  return map[props.size]
})

function dots(face: number) {
  // 3x3 grid of positions; 1 = center, 2 = corners diagonal, etc.
  const positions: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  }
  return positions[face] ?? []
}
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <div
      v-for="n in diceCount"
      :key="n"
      class="relative"
      :style="{
        width: `${sizePx}px`,
        height: `${sizePx}px`,
        perspective: '400px',
      }"
    >
      <div
        class="relative w-full h-full transition-transform duration-500"
        :style="{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transitionDuration: isRolling ? '80ms' : '500ms',
        }"
      >
        <!-- 6 faces, each absolute positioned and rotated into a cube -->
        <div
          v-for="face in 6"
          :key="face"
          class="absolute inset-0 rounded-[var(--radius-md)] bg-gradient-to-br from-amber-50 to-amber-100 dark:from-stone-100 dark:to-stone-300 border-2 border-amber-700/40 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.25)] flex items-center justify-center"
          :style="{
            transform: face === 1 ? 'translateZ(' + (sizePx / 2) + 'px)' :
                       face === 6 ? 'rotateY(180deg) translateZ(' + (sizePx / 2) + 'px)' :
                       face === 2 ? 'rotateY(90deg) translateZ(' + (sizePx / 2) + 'px)' :
                       face === 5 ? 'rotateY(-90deg) translateZ(' + (sizePx / 2) + 'px)' :
                       face === 3 ? 'rotateX(90deg) translateZ(' + (sizePx / 2) + 'px)' :
                       'rotateX(-90deg) translateZ(' + (sizePx / 2) + 'px)',
            backfaceVisibility: 'hidden',
          }"
        >
          <div
            class="w-full h-full p-[14%] grid grid-cols-3 grid-rows-3 gap-[8%]"
          >
            <div
              v-for="i in 9"
              :key="i"
              class="rounded-full bg-stone-900"
              :class="dots(face).includes(i - 1) ? 'opacity-100' : 'opacity-0'"
              :style="{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 1px rgba(0,0,0,0.3)' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
