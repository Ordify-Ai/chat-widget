import { ChatMessage, LoadingDots } from './styled/ChatComponents'

export function AssistantTypingBubble() {
  return (
    <ChatMessage
      $isUser={false}
      $compact
      role="status"
      aria-live="polite"
      aria-label="Assistant is typing"
    >
      <LoadingDots>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </LoadingDots>
    </ChatMessage>
  )
}
