import { AssistantMessageActions } from '@/components/AssistantMessageActions'
import { AssistantMessageContent } from '@/components/AssistantMessageContent'
import { AssistantTypingBubble } from '@/components/AssistantTypingBubble'
import { AttachmentChips } from '@/components/AttachmentChips'
import { AttachmentPicker } from '@/components/AttachmentPicker'
import { Conversation, ConversationContent } from '@/components/Conversation'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { useWidgetAttachmentStaging } from '@/hooks/useWidgetAttachmentStaging'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import {
  isStreamingPlaceholder,
  shouldShowAssistantActions,
  shouldShowStandaloneTyping,
} from '@/utils/assistantMessageActions'
import { filesFromDataTransfer } from '@/utils/attachments'
import {
  clampFloatingHeight,
  resolveFloatingHeight,
} from '@/utils/widget-layout'
import { resolveWidgetTheme } from '@/utils/widget-theme'
import { MessageSquareIcon } from './Icons'
import { ResizeHandle } from './ResizeHandle'
import { SendIcon } from './SendIcon'
import React from 'react'
import { ChatHeader } from './ChatHeader'
import {
  AgentAvatar,
  AssistantMessageColumn,
  ChatInput,
  ChatMessage,
  ChatWindow,
  MessageRow,
  ComposerShell,
  ComposerToolbar,
  ErrorMessage,
  FloatingButton,
  ComposerSendButton,
} from './styled/ChatComponents'

interface FloatingChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function FloatingChat({ config, chat }: FloatingChatProps) {
  const {
    messages,
    sendMessage,
    uploadAttachment,
    exportMessagePdf,
    isLoading,
    error,
    isOpen,
    setIsOpen,
    hasSessionStarted,
  } = chat
  const [inputValue, setInputValue] = React.useState('')
  const sizeBounds = React.useMemo(
    () =>
      resolveFloatingHeight({
        height: config.height,
        minHeight: config.minHeight,
        maxHeight: config.maxHeight,
      }),
    [config.height, config.minHeight, config.maxHeight]
  )
  const [chatHeight, setChatHeight] = React.useState(sizeBounds.height)
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const theme = resolveWidgetTheme(config.theme)

  React.useEffect(() => {
    const syncToViewport = () => {
      const next = resolveFloatingHeight({
        height: config.height,
        minHeight: config.minHeight,
        maxHeight: config.maxHeight,
      })
      setChatHeight((current) =>
        clampFloatingHeight(current, next.minHeight, next.maxHeight)
      )
    }
    window.addEventListener('resize', syncToViewport)
    return () => window.removeEventListener('resize', syncToViewport)
  }, [config.height, config.minHeight, config.maxHeight])

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
    allowed,
  } = useWidgetAttachmentStaging(config, uploadAttachment)

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim()
    if ((!trimmed && stagedAttachments.length === 0) || isLoading) return

    const attachments = stagedAttachments.length ? stagedAttachments : undefined
    setInputValue('')
    clearStaged()
    void sendMessage(trimmed, undefined, attachments)
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
          <MessageSquareIcon size={16} />
        </div>
        <span>{config.buttonText || config.chatName || 'AI Chat'}</span>
      </FloatingButton>
    )
  }

  return (
    <ChatWindow
      $position={config.position || 'bottom-right'}
      data-ordify-chat="true"
      data-theme={theme}
      style={{
        height: chatHeight,
        ...(config.backgroundColor
          ? { backgroundColor: config.backgroundColor }
          : {}),
        ...(config.textColor ? { color: config.textColor } : {}),
        ...config.chatWindowStyle,
      }}
    >
      {/* Resize handle at top */}
      {config.resizable !== false && (
        <ResizeHandle
          position="top"
          onResize={(deltaY) => {
            setChatHeight((current) =>
              clampFloatingHeight(
                current - deltaY,
                sizeBounds.minHeight,
                sizeBounds.maxHeight
              )
            )
          }}
        />
      )}

      {/* Chat header */}
      {config.showHeader !== false && (
        <ChatHeader
          agentImage={config.agentImage}
          chatName={config.chatName}
          onClose={() => setIsOpen(false)}
          primaryColor={config.primaryColor}
          showWelcomeScreen={
            config.quickQuestions &&
            config.quickQuestions.length > 0 &&
            !hasSessionStarted
          }
        />
      )}

      {/* Welcome screen or chat messages */}
      {config.quickQuestions &&
      config.quickQuestions.length > 0 &&
      !hasSessionStarted ? (
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
          <Conversation
            surfaceTheme={theme}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <ConversationContent>
              {messages.map((message) => (
                <MessageRow key={message.id} $isUser={message.role === 'user'}>
                  {message.role === 'assistant' && config.agentImage && (
                    <AgentAvatar
                      src={config.agentImage}
                      alt={config.chatName || 'Agent'}
                      $size="28px"
                    />
                  )}
                  {message.role === 'assistant' ? (
                    <AssistantMessageColumn>
                      {isStreamingPlaceholder(message, messages, isLoading) ? (
                        <AssistantTypingBubble />
                      ) : (
                        <ChatMessage $isUser={false}>
                          <AssistantMessageContent message={message} />
                        </ChatMessage>
                      )}
                      {shouldShowAssistantActions(
                        message,
                        messages,
                        isLoading
                      ) && (
                        <AssistantMessageActions
                          content={message.content}
                          disabled={isLoading}
                          onExportPdf={(c) => exportMessagePdf(c)}
                        />
                      )}
                    </AssistantMessageColumn>
                  ) : (
                    <ChatMessage $isUser={true}>
                      <>
                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <AttachmentChips
                              attachments={message.attachments}
                              readOnly
                              tone="onPrimary"
                            />
                          )}
                        {message.content ? message.content : null}
                      </>
                    </ChatMessage>
                  )}
                </MessageRow>
              ))}

              {shouldShowStandaloneTyping(messages, isLoading) && (
                <MessageRow $isUser={false}>
                  {config.agentImage && (
                    <AgentAvatar
                      src={config.agentImage}
                      alt={config.chatName || 'Agent'}
                      $size="28px"
                    />
                  )}
                  <AssistantTypingBubble />
                </MessageRow>
              )}

              {error && <ErrorMessage>{error}</ErrorMessage>}
            </ConversationContent>
          </Conversation>

          {/* Chat input - Full width */}
          <ChatInput
            style={{ flexDirection: 'column', alignItems: 'stretch', gap: 0 }}
          >
            {(attachmentError ||
              (attachmentsEnabled && stagedAttachments.length > 0)) && (
              <div style={{ paddingBottom: 8 }}>
                {attachmentError && (
                  <div
                    style={{ fontSize: 12, color: '#dc2626', marginBottom: 4 }}
                  >
                    {attachmentError}
                  </div>
                )}
                {attachmentsEnabled && stagedAttachments.length > 0 && (
                  <AttachmentChips
                    attachments={stagedAttachments}
                    onRemove={removeStaged}
                  />
                )}
              </div>
            )}
            <div style={{ width: '100%' }}>
              <ComposerShell>
                <ProfessionalInput
                  ref={inputRef}
                  variant="composer"
                  value={inputValue}
                  onChange={setInputValue}
                  onKeyDown={handleKeyPress}
                  placeholder={config.placeholder}
                  disabled={isLoading}
                />
                <ComposerToolbar>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {attachmentsEnabled && (
                      <AttachmentPicker
                        integrated
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
                  </div>
                  <ComposerSendButton
                    type="button"
                    onClick={handleSendMessage}
                    disabled={
                      isLoading ||
                      (!inputValue.trim() && stagedAttachments.length === 0)
                    }
                    aria-label="Send message"
                  >
                    <SendIcon size={13} />
                  </ComposerSendButton>
                </ComposerToolbar>
              </ComposerShell>
            </div>
          </ChatInput>
        </>
      )}
    </ChatWindow>
  )
}
