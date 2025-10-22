import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { Conversation, ConversationContent } from '@/components/Conversation'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { formatTime } from '@/utils'
import { MessageSquare, Send } from 'lucide-react'
import React from 'react'
import {
    ChatHeader,
    ChatInput,
    ChatMessage,
    ChatWindow,
    ErrorMessage,
    FloatingButton,
    LoadingDots,
    SendButton,
    ResizeHandle as StyledResizeHandle,
    Timestamp
} from './styled/ChatComponents'

interface FloatingChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function FloatingChat({ config, chat }: FloatingChatProps) {
  const { messages, sendMessage, isLoading, error, isOpen, setIsOpen } = chat
  const [inputValue, setInputValue] = React.useState('')
  const [chatHeight, setChatHeight] = React.useState<number | string>(config.height || 400)
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


  if (!isOpen) {
    return (
      <FloatingButton
        onClick={() => setIsOpen(true)}
        style={config.buttonStyle}
        $position={config.position || 'bottom-right'}
        aria-label="Open chat"
      >
        <div className="icon-container">
          <MessageSquare size={16} />
        </div>
        <span>
          {config.buttonText || config.chatName || "AI Chat"}
        </span>
      </FloatingButton>
    )
  }

  return (
    <ChatWindow
      $position={config.position || 'bottom-right'}
      style={{
        height: chatHeight,
        ...config.chatWindowStyle
      }}
    >
      {/* Resize handle at top */}
      {config.resizable !== false && (
        <StyledResizeHandle
          $position="top"
          onMouseDown={(e) => {
            e.preventDefault()
            const startY = e.clientY
            const startHeight = typeof chatHeight === 'number' ? chatHeight : 400

            const handleMouseMove = (e: MouseEvent) => {
              const deltaY = e.clientY - startY
              const newHeight = startHeight - deltaY
              setChatHeight(Math.max(200, Math.min(600, newHeight)))
            }

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
        />
      )}

      {/* Chat header */}
      {config.showHeader !== false && (
        <ChatHeader primaryColor={config.primaryColor}>
          <div className="header-content">
            <div className="font-medium">{config.chatName || "Chat Assistant"}</div>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-1 rounded"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </ChatHeader>
      )}

      {/* Chat messages with auto-scroll */}
      <Conversation>
        <ConversationContent>
          {messages.map(message => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                marginBottom: '16px',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
               <ChatMessage $isUser={message.role === 'user'}>
                {message.role === 'assistant' ? (
                  <MarkdownRenderer content={message.content} />
                ) : (
                  message.content
                )}
                 <Timestamp $isUser={message.role === 'user'}>
                  {formatTime(message.timestamp)}
                </Timestamp>
              </ChatMessage>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
               <ChatMessage $isUser={false}>
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
      </Conversation>

      {/* Chat input - Full width */}
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
    </ChatWindow>
  )
}