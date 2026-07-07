import { describe, expect, it } from 'vitest'
import { normalizeMarkdown } from './index'

describe('normalizeMarkdown', () => {
  it('adds a space after heading markers missing one', () => {
    expect(normalizeMarkdown('###2. Operational Focus')).toBe('### 2. Operational Focus')
    expect(normalizeMarkdown('##Heading')).toBe('## Heading')
  })

  it('leaves well-formed markdown untouched', () => {
    expect(normalizeMarkdown('### Heading')).toBe('### Heading')
    expect(normalizeMarkdown('*emphasis*')).toBe('*emphasis*')
  })

  it('fixes ordered and unordered lists missing a space', () => {
    expect(normalizeMarkdown('1.First')).toBe('1. First')
    expect(normalizeMarkdown('-Item')).toBe('- Item')
  })

  it('does not treat decimals or rules as lists', () => {
    expect(normalizeMarkdown('3.14 is pi')).toBe('3.14 is pi')
    expect(normalizeMarkdown('---')).toBe('---')
  })

  it('does not modify content inside fenced code blocks', () => {
    const code = ['```py', '###2 comment', '```'].join('\n')
    expect(normalizeMarkdown(code)).toBe(code)
  })
})
