import { describe, expect, it } from 'vitest'
import type { Message } from '@/types'
import {
  isStreamingPlaceholder,
  shouldShowStandaloneTyping,
} from './assistantMessageActions'

function msg(
  partial: Pick<Message, 'id' | 'role'> & Partial<Message>
): Message {
  return {
    content: '',
    timestamp: new Date(),
    ...partial,
  }
}

describe('assistant typing state', () => {
  it('treats the empty last assistant message as the streaming placeholder', () => {
    const messages = [
      msg({ id: 'u1', role: 'user', content: 'Hi' }),
      msg({ id: 'a1', role: 'assistant', content: '' }),
    ]
    expect(isStreamingPlaceholder(messages[1], messages, true)).toBe(true)
    expect(shouldShowStandaloneTyping(messages, true)).toBe(false)
  })

  it('shows a standalone typing row until the assistant placeholder exists', () => {
    const messages = [msg({ id: 'u1', role: 'user', content: 'Hi' })]
    expect(shouldShowStandaloneTyping(messages, true)).toBe(true)
  })

  it('does not add a second typing row while a tool chip is showing', () => {
    const messages = [
      msg({ id: 'u1', role: 'user', content: 'Hi' }),
      msg({
        id: 'a1',
        role: 'assistant',
        content: '',
        toolActivity: { label: 'Searching knowledge', status: 'running' }
      })
    ]
    expect(isStreamingPlaceholder(messages[1], messages, true)).toBe(false)
    expect(shouldShowStandaloneTyping(messages, true)).toBe(false)
  })
})
