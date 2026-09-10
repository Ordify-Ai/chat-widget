export const FLOATING_EDGE_INSET = 24

export function viewportFloatingMaxHeight(
  viewportHeight = typeof window === 'undefined' ? 800 : window.innerHeight
): number {
  return Math.max(360, viewportHeight - FLOATING_EDGE_INSET * 2)
}

export function parseCssSize(
  value: string | number | undefined
): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value
  }
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  if (trimmed.endsWith('px')) {
    const n = parseFloat(trimmed)
    return Number.isFinite(n) && n > 0 ? n : undefined
  }
  const asNum = Number(trimmed)
  return Number.isFinite(asNum) && asNum > 0 ? asNum : undefined
}

export function clampFloatingHeight(
  height: number,
  minHeight: number,
  maxHeight: number
): number {
  return Math.min(maxHeight, Math.max(minHeight, height))
}

export function resolveFloatingHeight(options: {
  height?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  viewportHeight?: number
}): { height: number; minHeight: number; maxHeight: number } {
  const viewportHeight =
    options.viewportHeight ??
    (typeof window === 'undefined' ? 800 : window.innerHeight)
  const maxFromViewport = viewportFloatingMaxHeight(viewportHeight)
  const maxHeight = Math.min(
    parseCssSize(options.maxHeight) ?? maxFromViewport,
    maxFromViewport
  )
  const minHeight = Math.min(parseCssSize(options.minHeight) ?? 360, maxHeight)
  const preferred = parseCssSize(options.height) ?? Math.min(500, maxHeight)
  return {
    height: clampFloatingHeight(preferred, minHeight, maxHeight),
    minHeight,
    maxHeight,
  }
}
