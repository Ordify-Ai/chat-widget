import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ChatMessage } from './styled/ChatComponents'

describe('chat message width', () => {
  it('leaves a slight trailing gap on assistant replies so speakers stay distinct', () => {
    const { getByText } = render(
      <ChatMessage $isUser={false}>assistant reply</ChatMessage>
    )
    expect(getComputedStyle(getByText('assistant reply')).maxWidth).toBe(
      'calc(100% - 24px)'
    )
  })

  it('keeps user bubbles capped so short questions stay compact', () => {
    const { getByText } = render(
      <ChatMessage $isUser={true}>user reply</ChatMessage>
    )
    expect(getComputedStyle(getByText('user reply')).maxWidth).toBe('80%')
  })

  it('keeps typing indicators compact', () => {
    const { getByText } = render(
      <ChatMessage $isUser={false} $compact>
        typing
      </ChatMessage>
    )
    expect(getComputedStyle(getByText('typing')).maxWidth).toBe('80%')
  })
})
