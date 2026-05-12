import { Message } from '@/types'
import { AttachmentChips } from './AttachmentChips'
import { MarkdownRenderer } from './MarkdownRenderer'

interface AssistantMessageContentProps {
  message: Message
  className?: string
}

/**
 * Renders assistant text (markdown) plus inline images from stored session attachments.
 * Live streams also inject `![...](url)` via SSE `type: "image"` handling in `parseStreamingResponse`.
 */
export function AssistantMessageContent({ message, className }: AssistantMessageContentProps) {
  const attachments = message.attachments || []
  const imageAtts = attachments.filter((a) => a.type === 'image' && a.url)
  const otherAtts = attachments.filter((a) => !(a.type === 'image' && a.url))

  return (
    <>
      {imageAtts.map((a) => (
        <img
          key={a.id}
          src={a.url}
          alt={a.name || 'Generated image'}
          loading="lazy"
          decoding="async"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 8,
            marginBottom: 10,
            display: 'block',
          }}
        />
      ))}
      {otherAtts.length > 0 && <AttachmentChips attachments={otherAtts} readOnly />}
      <MarkdownRenderer content={message.content} className={className} />
    </>
  )
}
