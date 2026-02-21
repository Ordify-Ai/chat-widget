import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { SendIcon } from './SendIcon'
import React from 'react'
import { Conversation, ConversationContent } from './Conversation'
import {
  AgentAvatar,
  ChatInput,
  ChatMessage,
  ChatWidget,
  ErrorMessage,
  LoadingDots,
  SendButton
} from './styled/ChatComponents'

interface InlineChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function InlineChat({ config, chat }: InlineChatProps) {
  const { messages, sendMessage, isLoading, error, hasSessionStarted } = chat
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
          <Conversation style={{ flex: 1 }}>
            <ConversationContent>
              {messages.map(message => (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    marginBottom: '12px',
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
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
              <SendIcon size={16} />
            </SendButton>
          </ChatInput>
        </>
      )}
    </ChatWidget>
  )
}