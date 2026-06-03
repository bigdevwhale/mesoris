<script setup lang="ts">
import { computed } from 'vue'
import type { Color, PieceType } from '@/logic/chess-engine'

const props = withDefaults(defineProps<{
  type: PieceType
  color: Color
  size?: number | string
}>(), {
  size: 48,
})

// Dinosaur-themed chess piece SVGs.
// Each piece is a stylized silhouette in a single color with a thin contrasting outline.
// Design intent: instantly recognizable as a chess piece (crown, horn, tower, etc.)
// while clearly evoking the chosen dinosaur.

const lightColor = '#f4ecd8'   // sandstone / fossil
const darkColor = '#1f2937'    // volcanic rock
const lightOutline = '#3d2f1a' // dark contour
const darkOutline = '#d4a43a'  // amber contour (brand color)
const goldAccent = '#d4a43a'

const fill = computed(() => props.color === 'w' ? lightColor : darkColor)
const outline = computed(() => props.color === 'w' ? lightOutline : darkOutline)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    class="select-none"
    aria-hidden="true"
  >
    <!-- ═══ KING: T-Rex with crown ═══ -->
    <g v-if="type === 'k'">
      <!-- Crown -->
      <path
        d="M 22 6 L 26 12 L 30 4 L 32 10 L 34 4 L 38 12 L 42 6 L 42 14 L 22 14 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Crown gems -->
      <circle cx="26" cy="10" r="1" :fill="goldAccent" />
      <circle cx="32" cy="8" r="1" :fill="goldAccent" />
      <circle cx="38" cy="10" r="1" :fill="goldAccent" />
      <!-- T-Rex head -->
      <path
        d="M 16 18 L 16 26 L 18 28 L 20 32 L 22 30 L 24 32 L 32 32 L 40 30 L 48 26 L 48 20 L 44 18 L 36 16 L 26 16 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Tiny arms -->
      <path d="M 20 30 L 18 36 L 20 36" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M 24 32 L 22 38 L 24 38" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <!-- Eye -->
      <circle cx="40" cy="23" r="1.3" :fill="goldAccent" />
      <circle cx="40.3" cy="22.7" r="0.5" fill="#0a0a0a" />
      <!-- Teeth -->
      <path d="M 44 27 L 45 29 L 46 27 L 47 29 L 48 27" :stroke="outline" stroke-width="0.6" fill="none" />
      <!-- Body / base -->
      <path
        d="M 14 36 L 14 52 L 50 52 L 50 36 L 44 36 L 44 32 L 20 32 L 20 36 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Tail -->
      <path d="M 14 38 L 8 44 L 8 48 L 14 46" :fill="fill" :stroke="outline" stroke-width="1.4" stroke-linejoin="round" />
      <!-- Legs -->
      <rect x="18" y="52" width="6" height="6" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <rect x="28" y="52" width="6" height="6" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <rect x="40" y="52" width="6" height="6" :fill="fill" :stroke="outline" stroke-width="1.4" />
    </g>

    <!-- ═══ QUEEN: Triceratops (3 horns = crown) ═══ -->
    <g v-else-if="type === 'q'">
      <!-- Horns (3 of them) -->
      <path d="M 22 14 L 20 4 L 24 12 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M 32 12 L 32 2 L 36 12 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M 40 14 L 44 4 L 42 12 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <!-- Frill (back of head) -->
      <path
        d="M 18 16 L 14 22 L 16 28 L 24 30 L 28 28 L 36 28 L 42 30 L 48 28 L 50 22 L 46 16 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Head/face -->
      <path
        d="M 24 28 L 24 38 L 28 40 L 36 40 L 40 38 L 40 28 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Beak -->
      <path d="M 28 38 L 32 44 L 36 38" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <!-- Eyes -->
      <circle cx="29" cy="32" r="1.2" :fill="goldAccent" />
      <circle cx="35" cy="32" r="1.2" :fill="goldAccent" />
      <!-- Body / base -->
      <path
        d="M 12 42 L 12 56 L 52 56 L 52 42 L 44 42 L 44 40 L 20 40 L 20 42 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Legs -->
      <rect x="16" y="56" width="6" height="4" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <rect x="28" y="56" width="6" height="4" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <rect x="42" y="56" width="6" height="4" :fill="fill" :stroke="outline" stroke-width="1.4" />
    </g>

    <!-- ═══ ROOK: Brachiosaurus (tall, vertical) ═══ -->
    <g v-else-if="type === 'r'">
      <!-- Long neck -->
      <path
        d="M 28 4 L 32 4 L 32 24 L 28 24 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Tiny head at top -->
      <ellipse cx="30" cy="6" rx="5" ry="3" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <!-- Body / tower base -->
      <path
        d="M 16 24 L 16 38 L 22 38 L 22 32 L 38 32 L 38 38 L 48 38 L 48 24 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Battlements (rook top — adds chess feel) -->
      <rect x="16" y="20" width="4" height="6" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <rect x="22" y="20" width="4" height="6" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <rect x="34" y="20" width="4" height="6" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <rect x="40" y="20" width="4" height="6" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <rect x="46" y="20" width="4" height="6" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <!-- Tower mid line -->
      <line x1="16" y1="44" x2="48" y2="44" :stroke="outline" stroke-width="1" />
      <!-- Base -->
      <path
        d="M 12 50 L 12 56 L 52 56 L 52 50 L 48 50 L 48 46 L 16 46 L 16 50 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </g>

    <!-- ═══ BISHOP: Stegosaurus (plates on back) ═══ -->
    <g v-else-if="type === 'b'">
      <!-- Plates (along back) -->
      <path d="M 22 8 L 26 4 L 28 12 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M 30 6 L 34 2 L 36 10 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <path d="M 38 6 L 42 2 L 44 10 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <!-- Head -->
      <ellipse cx="30" cy="14" rx="6" ry="5" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <circle cx="30" cy="13" r="1.2" :fill="goldAccent" />
      <!-- Neck -->
      <path d="M 26 18 L 26 24 L 34 24 L 34 18 Z" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <!-- Body -->
      <path
        d="M 14 24 L 14 42 L 46 42 L 46 24 L 38 24 L 38 20 L 22 20 L 22 24 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Tail with club -->
      <path d="M 14 28 L 6 36 L 6 42 L 12 40 L 14 36" :fill="fill" :stroke="outline" stroke-width="1.4" stroke-linejoin="round" />
      <circle cx="6" cy="40" r="3" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <!-- Base -->
      <path
        d="M 10 42 L 10 56 L 50 56 L 50 42 L 44 42 L 44 48 L 16 48 L 16 42 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </g>

    <!-- ═══ KNIGHT: Velociraptor (in pounce pose, with feather) ═══ -->
    <g v-else-if="type === 'n'">
      <!-- Feather crest -->
      <path
        d="M 32 6 L 28 10 L 32 12 L 36 10 L 40 6 L 36 8 L 32 4 Z"
        :fill="goldAccent"
        :stroke="outline"
        stroke-width="0.8"
        stroke-linejoin="round"
      />
      <!-- Curved neck/body in pounce pose -->
      <path
        d="M 18 44 L 16 36 L 18 28 L 22 20 L 28 14 L 34 10 L 40 12 L 44 18 L 46 24 L 44 30 L 40 34 L 38 40 L 40 44 L 46 44 L 48 48 L 46 50 L 40 50 L 38 46 L 30 46 L 26 50 L 22 50 L 20 46 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
      <!-- Head detail -->
      <circle cx="40" cy="18" r="1.2" :fill="goldAccent" />
      <path d="M 44 22 L 48 22 L 50 20" :stroke="outline" stroke-width="1" fill="none" />
      <!-- Claw on tail -->
      <path d="M 18 30 L 14 26 L 16 32 Z" :fill="fill" :stroke="outline" stroke-width="1.2" stroke-linejoin="round" />
      <!-- Base -->
      <path
        d="M 10 50 L 10 56 L 54 56 L 54 50 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </g>

    <!-- ═══ PAWN: Compsognathus (small, simple) ═══ -->
    <g v-else>
      <!-- Tiny head with crest -->
      <circle cx="32" cy="20" r="6" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <!-- Crest line -->
      <path d="M 28 18 L 30 14 L 32 17 L 34 14 L 36 18" :stroke="outline" stroke-width="1" fill="none" />
      <!-- Eye -->
      <circle cx="34" cy="20" r="1" :fill="goldAccent" />
      <!-- Neck -->
      <rect x="29" y="24" width="6" height="4" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <!-- Body (round belly) -->
      <ellipse cx="32" cy="36" rx="10" ry="8" :fill="fill" :stroke="outline" stroke-width="1.4" />
      <!-- Tail -->
      <path d="M 22 38 L 14 44 L 14 48 L 20 44" :fill="fill" :stroke="outline" stroke-width="1.4" stroke-linejoin="round" />
      <!-- Legs -->
      <rect x="24" y="44" width="4" height="8" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <rect x="36" y="44" width="4" height="8" :fill="fill" :stroke="outline" stroke-width="1.2" />
      <!-- Base -->
      <path
        d="M 16 52 L 14 56 L 50 56 L 48 52 Z"
        :fill="fill"
        :stroke="outline"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </g>
  </svg>
</template>
