import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { formatTime } from '@/utils'
import { Send } from 'lucide-react'
import React from 'react'
import { Conversation, ConversationContent } from './Conversation'
import {
  AgentAvatar,
  ChatInput,
  ChatMessage,
  ChatWidget,
  ErrorMessage,
  LoadingDots,
  SendButton,
  Timestamp
} from './styled/ChatComponents'

interface EmbeddedChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function EmbeddedChat({ config, chat }: EmbeddedChatProps) {
  const { messages, sendMessage, isLoading, error } = chat
  const [inputValue, setInputValue] = React.useState('')
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

  const heightStyle = React.useMemo(() => {
    if (config.height === '100%' || config.height === '100vh') {
      return {
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column' as const,
        borderRadius: '8px'
      }
    }
    return {
      height: config.height,
      display: 'flex',
      flexDirection: 'column' as const,
      borderRadius: '8px'
    }
  }, [config.height])

  return (
    <ChatWidget
      data-theme={getThemeValue()}
      style={heightStyle}
    >
      {/* Chat messages */}
      <Conversation style={{ flex: 1 }}>
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
                <Timestamp $isUser={message.role === 'user'}>
                  {formatTime(message.timestamp)}
                </Timestamp>
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