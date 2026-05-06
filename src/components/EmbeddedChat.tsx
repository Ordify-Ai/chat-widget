import { AttachmentChips } from '@/components/AttachmentChips'
import { AttachmentPicker } from '@/components/AttachmentPicker'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { useWidgetAttachmentStaging } from '@/hooks/useWidgetAttachmentStaging'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { filesFromDataTransfer } from '@/utils/attachments'
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

interface EmbeddedChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function EmbeddedChat({ config, chat }: EmbeddedChatProps) {
  const { messages, sendMessage, uploadAttachment, isLoading, error, hasSessionStarted } = chat
  const [inputValue, setInputValue] = React.useState('')
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const {
    enabled: attachmentsEnabled,
    staged: stagedAttachments,
    attachmentError,
    setAttachmentError,
    addFiles,
    appendStaged,
    removeStaged,
    clearStaged,
    maxFiles,
    maxBytes,
    allowed
  } = useWidgetAttachmentStaging(config, uploadAttachment)

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
    const trimmed = inputValue.trim()
    if ((!trimmed && stagedAttachments.length === 0) || isLoading) return

    await sendMessage(trimmed, undefined, stagedAttachments.length ? stagedAttachments : undefined)
    setInputValue('')
    clearStaged()

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

  const onDragOver = (e: React.DragEvent) => {
    if (!attachmentsEnabled) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDrop = async (e: React.DragEvent) => {
    if (!attachmentsEnabled) return
    e.preventDefault()
    const files = await filesFromDataTransfer(e.dataTransfer)
    if (files.length) await addFiles(files)
  }

  return (
    <ChatWidget
      data-theme={getThemeValue()}
      style={heightStyle}
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
          <Conversation style={{ flex: 1 }} onDragOver={onDragOver} onDrop={onDrop}>
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
                      <>
                        {message.attachments && message.attachments.length > 0 && (
                          <AttachmentChips attachments={message.attachments} readOnly />
                        )}
                        {message.content ? message.content : null}
                      </>
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

          {/* Chat input */}
          <ChatInput style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0 }}>
            {(attachmentError || (attachmentsEnabled && stagedAttachments.length > 0)) && (
              <div style={{ paddingBottom: 8 }}>
                {attachmentError && (
                  <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 4 }}>{attachmentError}</div>
                )}
                {attachmentsEnabled && stagedAttachments.length > 0 && (
                  <AttachmentChips attachments={stagedAttachments} onRemove={removeStaged} />
                )}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              {attachmentsEnabled && (
                <AttachmentPicker
                  disabled={isLoading}
                  maxFileBytes={maxBytes}
                  maxFiles={maxFiles}
                  allowedMime={allowed}
                  currentCount={stagedAttachments.length}
                  uploadAttachment={uploadAttachment}
                  onUploaded={appendStaged}
                  onError={setAttachmentError}
                />
              )}
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
                disabled={isLoading || (!inputValue.trim() && stagedAttachments.length === 0)}
              >
                <SendIcon size={16} />
              </SendButton>
            </div>
          </ChatInput>
        </>
      )}
    </ChatWidget>
  )
}