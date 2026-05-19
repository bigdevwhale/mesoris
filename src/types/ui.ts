export type Mode = 'kids' | 'adults'
export type Theme = 'dark' | 'light'

import type { RouteLocationRaw } from 'vue-router'

export interface NavLink {
  label: string
  to: RouteLocationRaw
  icon: string
}
