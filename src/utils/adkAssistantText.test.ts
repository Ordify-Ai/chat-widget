import { describe, expect, it } from 'vitest'
import {
  friendlyToolLabel,
  isToolStatusOnlyText,
  stripAdkToolStatusParagraphsFromAssistantText,
  toolActivityFromStatusText
} from './adkAssistantText'

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

describe('tool activity labels', () => {
  it('maps Retrieve status text to Searching knowledge', () => {
    expect(isToolStatusOnlyText('Using Retrieve...\n\n')).toBe(true)
    expect(toolActivityFromStatusText('Using Retrieve...\n\n')).toEqual({
      label: 'Searching knowledge',
      status: 'running',
      toolName: 'Retrieve'
    })
    expect(friendlyToolLabel('retrieve_documents')).toBe('Searching knowledge')
  })
})
