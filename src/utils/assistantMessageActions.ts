import type { Message } from '@/types'

export function isStreamingPlaceholder(
  message: Message,
  messages: Message[],
  isLoading: boolean
): boolean {
  if (!isLoading || message.role !== 'assistant' || message.content.trim()) {
    return false
  }
  return messages[messages.length - 1]?.id === message.id
}

export function shouldShowStandaloneTyping(
  messages: Message[],
  isLoading: boolean
): boolean {
  if (!isLoading) return false
  const last = messages[messages.length - 1]
  if (!last) return true
  return !(last.role === 'assistant' && !last.content.trim())
}

export function shouldShowAssistantActions(
  message: Message,
  messages: Message[],
  isLoading: boolean
): boolean {
  if (message.role !== 'assistant' || !message.content.trim()) return false
  const last = messages[messages.length - 1]
  if (!last) return true
  if (isLoading && last.role === 'assistant' && last.id === message.id)
    return false
  return true
}
