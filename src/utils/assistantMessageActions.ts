import type { Message } from '@/types'

export function shouldShowAssistantActions(
  message: Message,
  messages: Message[],
  isLoading: boolean
): boolean {
  if (message.role !== 'assistant' || !message.content.trim()) return false
  const last = messages[messages.length - 1]
  if (!last) return true
  if (isLoading && last.role === 'assistant' && last.id === message.id) return false
  return true
}
