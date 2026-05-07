import { describe, expect, it } from 'vitest'
import { stripAdkToolStatusParagraphsFromAssistantText } from './adkAssistantText'

describe('stripAdkToolStatusParagraphsFromAssistantText', () => {
  it('removes Using … and Action completed paragraphs', () => {
    const raw =
      'We accept TruHearing.\n\nUsing Retrieve...\n\nAction completed\n\nMore answer.'
    expect(stripAdkToolStatusParagraphsFromAssistantText(raw)).toBe(
      'We accept TruHearing.\n\nMore answer.'
    )
  })

  it('leaves normal copy untouched', () => {
    const raw = 'Hello.\n\nHere is the policy.'
    expect(stripAdkToolStatusParagraphsFromAssistantText(raw)).toBe(raw)
  })
})
