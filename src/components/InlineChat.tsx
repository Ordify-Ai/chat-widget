import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { formatTime } from '@/utils'
import { Send } from 'lucide-react'
import React from 'react'
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from './Conversation'
import {
    ChatInput,
    ChatMessage,
    ChatWidget,
    ErrorMessage,
    LoadingDots,
    SendButton,
    Timestamp
} from './styled/ChatComponents'

interface InlineChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function InlineChat({ config, chat }: InlineChatProps) {
  const { messages, sendMessage, isLoading, error } = chat
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    await sendMessage(inputValue.trim())
    setInputValue('')

    // Auto-focus input after sending
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <ChatWidget
      style={{ 
        height: config.height,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px'
      }}
    >
      {/* Chat messages */}
      <Conversation style={{ flex: 1, padding: '12px' }}>
        <ConversationContent>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                marginBottom: '12px',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <ChatMessage isUser={message.role === 'user'}>
                {message.role === 'assistant' ? (
                  <MarkdownRenderer content={message.content} />
                ) : (
                  message.content
                )}
                <Timestamp isUser={message.role === 'user'}>
                  {formatTime(message.timestamp)}
                </Timestamp>
              </ChatMessage>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
              <ChatMessage isUser={false}>
                <LoadingDots>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </LoadingDots>
              </ChatMessage>
            </div>
          )}

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Chat input */}
      <ChatInput>
        <ProfessionalInput
          ref={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyPress}
          placeholder={config.placeholder}
          disabled={isLoading}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          <Send size={16} />
        </SendButton>
      </ChatInput>
    </ChatWidget>
  )
}