import { Conversation, ConversationContent } from '@/components/Conversation'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { MessageSquare, Send } from 'lucide-react'
import React from 'react'
import { ChatHeader } from './ChatHeader'
import {
  AgentAvatar,
    ChatInput,
    ChatMessage,
    ChatWindow,
    ErrorMessage,
    FloatingButton,
    LoadingDots,
    SendButton,
    ResizeHandle as StyledResizeHandle
} from './styled/ChatComponents'

interface FloatingChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function FloatingChat({ config, chat }: FloatingChatProps) {
  const { messages, sendMessage, isLoading, error, isOpen, setIsOpen, hasSessionStarted } = chat
  const [inputValue, setInputValue] = React.useState('')
  const [chatHeight, setChatHeight] = React.useState<number | string>(config.height || 600)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const getThemeValue = () => {
    if (config.theme === 'dark') return 'dark'
    if (config.theme === 'light') return 'light'
    return isDarkMode ? 'dark' : 'light'
  }

  React.useEffect(() => {
    if (config.theme === 'auto' || !config.theme) {
      const checkDarkMode = () => {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
      
      checkDarkMode()
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', checkDarkMode)
      
      return () => mediaQuery.removeEventListener('change', checkDarkMode)
    } else {
      setIsDarkMode(config.theme === 'dark')
    }
  }, [config.theme])

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
        $primaryColor={config.primaryColor}
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
      data-theme={getThemeValue()}
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
            const startHeight = typeof chatHeight === 'number' ? chatHeight : 600

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
        <ChatHeader
          primaryColor={config.primaryColor}
          agentImage={config.agentImage}
          chatName={config.chatName}
          onClose={() => setIsOpen(false)}
        />
      )}

      {/* Welcome screen or chat messages */}
      {config.quickQuestions && config.quickQuestions.length > 0 && !hasSessionStarted ? (
        <WelcomeScreen
          config={config}
          onQuestionClick={async (question) => {
            await sendMessage(question)
          }}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      ) : (
        <>
          <Conversation>
            <ConversationContent>
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    marginBottom: '16px',
                    justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  {message.role === 'assistant' && config.agentImage && (
                    <AgentAvatar
                      src={config.agentImage}
                      alt={config.chatName || "Agent"}
                      $size="28px"
                    />
                  )}
                   <ChatMessage $isUser={message.role === 'user'}>
                    {message.role === 'assistant' ? (
                      <MarkdownRenderer content={message.content} />
                    ) : (
                      message.content
                    )}
                  </ChatMessage>
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
                  {config.agentImage && (
                    <AgentAvatar
                      src={config.agentImage}
                      alt={config.chatName || "Agent"}
                      $size="28px"
                    />
                  )}
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
        </>
      )}
    </ChatWindow>
  )
}