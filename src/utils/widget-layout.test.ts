import { describe, expect, it } from 'vitest'
import {
  clampFloatingHeight,
  parseCssSize,
  resolveFloatingHeight,
  viewportFloatingMaxHeight,
} from './widget-layout'

describe('widget layout', () => {
  it('uses nearly the full viewport for the floating panel', () => {
    expect(viewportFloatingMaxHeight(900)).toBe(852)
  })

  it('defaults floating height to 500px and lets resize reach the viewport', () => {
    const resolved = resolveFloatingHeight({ viewportHeight: 900 })
    expect(resolved.height).toBe(500)
    expect(resolved.maxHeight).toBe(852)
  })

  it('caps a requested height to the viewport', () => {
    const resolved = resolveFloatingHeight({
      height: 1200,
      viewportHeight: 800,
    })
    expect(resolved.height).toBe(752)
  })

  it('parses pixel strings', () => {
    expect(parseCssSize('500px')).toBe(500)
  })

  it('clamps between min and max', () => {
    expect(clampFloatingHeight(200, 360, 800)).toBe(360)
    expect(clampFloatingHeight(900, 360, 800)).toBe(800)
  })
})
