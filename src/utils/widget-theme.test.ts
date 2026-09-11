import { describe, expect, it } from 'vitest'
import { resolveWidgetTheme } from './widget-theme'

describe('resolveWidgetTheme', () => {
  it('stays light when the host asks for dark', () => {
    expect(resolveWidgetTheme('dark')).toBe('light')
  })

  it('stays light when the host asks for auto', () => {
    expect(resolveWidgetTheme('auto')).toBe('light')
  })

  it('stays light when no theme is set', () => {
    expect(resolveWidgetTheme()).toBe('light')
  })
})
