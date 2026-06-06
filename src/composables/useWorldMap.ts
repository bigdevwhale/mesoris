import { continents, type ContinentId } from '@/data/continents'

/** SVG viewBox dimensions for the world map (equirectangular). */
export const MAP_WIDTH = 1000
export const MAP_HEIGHT = 500

/**
 * Convert geographic [longitude, latitude] to SVG [x, y] coordinates
 * in our 1000×500 equirectangular viewBox.
 */
export function coordsToSvg(lng: number, lat: number): [number, number] {
  const x = ((lng + 180) / 360) * MAP_WIDTH
  const y = ((90 - lat) / 180) * MAP_HEIGHT
  return [x, y]
}

/** Convert SVG [x, y] back to [longitude, latitude]. */
export function svgToCoords(x: number, y: number): [number, number] {
  const lng = (x / MAP_WIDTH) * 360 - 180
  const lat = 90 - (y / MAP_HEIGHT) * 180
  return [lng, lat]
}

/**
 * Classify a single [lng, lat] point into a continent id. This is the
 * canonical game-logic mapping — it doesn't depend on the rendered SVG
 * path data, only on geographic boundaries. We use it both for picking
 * the "correct continent" for a dinosaur and (with helpers) for any
 * other lookup.
 *
 * Boundaries:
 *  - North America: lng < -50, lat > 12
 *  - South America: lng < -25, lat < 13
 *  - Europe: -25 ≤ lng < 60, lat > 35
 *  - Africa: -20 ≤ lng < 50, -35 < lat ≤ 37
 *  - Asia: lng ≥ 25, lat > 12 (after Europe/Africa/SA checks)
 *  - Australia: lng ≥ 110, lat < -10
 */
export function classifyLngLat(lng: number, lat: number): ContinentId | null {
  if (lng < -50 && lat > 12) return 'north-america'
  if (lng < -25 && lat < 13) return 'south-america'
  if (lng >= 110 && lng < 180 && lat < -10) return 'australia'
  if (lng >= -20 && lng < 50 && lat <= 37 && lat > -35) return 'africa'
  if (lng >= -25 && lng < 60 && lat > 35) return 'europe'
  if (lng >= 60 && lat > 0) return 'asia'
  if (lng >= 25 && lat > 12) return 'asia'
  return null
}

/**
 * Parse an SVG path 'd' attribute into a list of [x, y] vertices.
 * Supports 'M x y L x y L x y Z' (absolute moveto/lineto) which is
 * what we use for our simplified continent polygons.
 */
function parsePathPoints(d: string): Array<[number, number]> {
  const points: Array<[number, number]> = []
  const tokens = d.split(/\s+/).filter(Boolean)
  let i = 0
  while (i < tokens.length) {
    const t = tokens[i]
    if (t === 'M' || t === 'L') {
      const x = parseFloat(tokens[i + 1])
      const y = parseFloat(tokens[i + 2])
      if (Number.isFinite(x) && Number.isFinite(y)) points.push([x, y])
      i += 3
    } else if (t === 'Z' || t === 'z') {
      i += 1
    } else {
      // Skip unknown tokens
      i += 1
    }
  }
  return points
}

/** Ray-casting point-in-polygon test on a parsed polygon. */
function pointInPolygon(point: [number, number], polygon: Array<[number, number]>): boolean {
  const [px, py] = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    const intersect =
      yi > py !== yj > py &&
      px < ((xj - xi) * (py - yi)) / (yj - yi + 1e-12) + xi
    if (intersect) inside = !inside;
  }
  return inside
}

// Cache parsed polygons so we don't re-parse on every check
const polygonCache = new Map<string, Array<[number, number]>>()

/**
 * Find which continent id contains the given [longitude, latitude] point.
 * Uses the same coordinate-based classifier as the build script, so the
 * "correct" answer for a dino's fossil location is the continent whose
 * name appears in the encyclopedia — independent of any polygon-rendering
 * quirks near the antimeridian.
 */
export function findContinentForCoords(lng: number, lat: number): ContinentId | null {
  return classifyLngLat(lng, lat)
}

/**
 * Convenience wrapper for callers that have [latitude, longitude] (the
 * format used in our dinosaur fossil-location data).
 */
export function findContinentForLatLng(lat: number, lng: number): ContinentId | null {
  return classifyLngLat(lng, lat)
}

// Cache of Intl.DisplayNames per locale. Lets us translate country
// names ("USA", "UK", "Mongolia", …) into the active UI language.
const displayNamesCache = new Map<string, Intl.DisplayNames>()

/**
 * Map country names/abbreviations used in fossil data to ISO 3166
 * alpha-2 codes for Intl.DisplayNames. Intl.DisplayNames.of() only
 * accepts ISO codes, not free-text names.
 */
const COUNTRY_TO_ISO: Record<string, string> = {
  'USA': 'US',
  'UK': 'GB',
  'United Kingdom': 'GB',
  'UAE': 'AE',
  'United Arab Emirates': 'AE',
  'South Korea': 'KR',
  'North Korea': 'KP',
  'Russia': 'RU',
  'Czech Republic': 'CZ',
  'Czechia': 'CZ',
  'The Netherlands': 'NL',
  'Netherlands': 'NL',
  'Algeria': 'DZ',
  'Angola': 'AO',
  'Argentina': 'AR',
  'Australia': 'AU',
  'Belgium': 'BE',
  'Brazil': 'BR',
  'Canada': 'CA',
  'China': 'CN',
  'Egypt': 'EG',
  'France': 'FR',
  'Germany': 'DE',
  'India': 'IN',
  'Mongolia': 'MN',
  'Morocco': 'MA',
  'Niger': 'NE',
  'Portugal': 'PT',
  'Tanzania': 'TZ',
  'Zimbabwe': 'ZW',
}

/**
 * Fallback country-name table for locales where Intl.DisplayNames
 * doesn't ship localised region names (e.g. 'kk' on some browsers).
 * Keys are the ISO 3166 alpha-2 codes we use internally.
 */
const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  kk: {
    US: 'Америка Құрама Штаттары',
    GB: 'Ұлыбритания',
    DZ: 'Алжир',
    AO: 'Ангола',
    AR: 'Аргентина',
    AU: 'Аустралия',
    BE: 'Бельгия',
    BR: 'Бразилия',
    CA: 'Канада',
    CN: 'Қытай',
    EG: 'Мысыр',
    FR: 'Франция',
    DE: 'Германия',
    IN: 'Үндістан',
    MN: 'Моңғолия',
    MA: 'Марокко',
    NL: 'Нидерланд',
    NE: 'Нигер',
    PT: 'Португалия',
    TZ: 'Танзания',
    ZW: 'Зимбабве',
  },
}

/**
 * Translate a country name (as stored in fossilLocations) into the
 * given UI locale. Falls back to the original name if Intl doesn't
 * recognise the code.
 */
export function localizeCountry(country: string, locale: string): string {
  if (!country) return ''
  const trimmed = country.trim()
  const code = COUNTRY_TO_ISO[trimmed] ?? trimmed
  // 1) Try our hand-rolled dictionary for locales that lack Intl data
  const fallback = COUNTRY_NAMES[locale]?.[code]
  if (fallback) return fallback
  // 2) Otherwise use Intl.DisplayNames
  let dn = displayNamesCache.get(locale)
  if (!dn) {
    try {
      dn = new Intl.DisplayNames([locale], { type: 'region' })
      displayNamesCache.set(locale, dn)
    } catch {
      return country
    }
  }
  try {
    const result = dn.of(code)
    // If Intl returned the input code (or empty), it's not localised
    if (result && result !== code) return result
  } catch {
    // Intl throws on unknown codes
  }
  return country
}

/**
 * Composable wrapper that exposes the helper functions for use inside
 * Vue components. (Stateless — no reactive state.)
 */
export function useWorldMap() {
  return {
    MAP_WIDTH,
    MAP_HEIGHT,
    coordsToSvg,
    svgToCoords,
    classifyLngLat,
    findContinentForCoords,
    findContinentForLatLng,
    localizeCountry,
  }
}
