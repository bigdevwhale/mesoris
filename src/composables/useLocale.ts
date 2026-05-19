import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'

const LOCALE_PREFIX_RE = /^\/(en|ru|es|de|fr|it)(\/|$)/

export function useLocale() {
  const route = useRoute()

  const locale = computed(() => {
    const match = route.path.match(LOCALE_PREFIX_RE)
    return match ? match[1] : 'en'
  })

  /** Wrap a named route with the current locale param so param inheritance isn't needed. */
  function localRoute(to: RouteLocationRaw): RouteLocationRaw {
    if (typeof to === 'string') {
      if (to.startsWith('/')) {
        return `/${locale.value}${to}`
      }
      return to
    }
    const obj = to as Record<string, unknown>
    const existingParams = (obj.params ?? {}) as Record<string, string>
    return {
      ...obj,
      params: { ...existingParams, locale: locale.value },
    } as RouteLocationRaw
  }

  return { locale, localRoute }
}
