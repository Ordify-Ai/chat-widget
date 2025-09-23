import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { ChatHeader } from '@/components/ChatHeader'
import { ResizeHandle } from '@/components/ResizeHandle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { cn, formatTime } from '@/utils'
import { MessageSquare, Send } from 'lucide-react'
import React from 'react'

interface FloatingChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function FloatingChat({ config, chat }: FloatingChatProps) {
  const { messages, sendMessage, isLoading, error, isOpen, setIsOpen } = chat
  const [inputValue, setInputValue] = React.useState('')

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    
    await sendMessage(inputValue.trim())
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getPositionClasses = () => {
    switch (config.position) {
      case 'bottom-left':
        return 'bottom-6 left-6'
      case 'top-right':
        return 'top-6 right-6'
      case 'top-left':
        return 'top-6 left-6'
      default:
        return 'bottom-6 right-6'
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'ordify-chat-floating-button',
          getPositionClasses(),
          'p-4 bg-primary text-primary-foreground hover:bg-primary/90'
        )}
        style={config.buttonStyle}
        size="icon"
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card 
      className={cn(
        'ordify-chat-window',
        getPositionClasses(),
        'w-80 sm:w-96 flex flex-col z-50',
        config.className
      )}
      style={{
        height: config.height,
        ...config.chatWindowStyle
      }}
    >
      {/* Chat header */}
      {config.showHeader !== false && (
        <ChatHeader
          chatName={config.chatName || "Chat Assistant"}
          showMinimizeButton={config.showMinimizeButton !== false}
          showCloseButton={true}
          onMinimize={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          primaryColor={config.primaryColor}
        />
      )}
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map(message => (
          <div 
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div 
              className={cn(
                'ordify-chat-message',
                message.role === 'user' 
                  ? 'ordify-chat-message-user' 
                  : 'ordify-chat-message-assistant'
              )}
            >
              {message.role === 'assistant' ? (
                <MarkdownRenderer content={message.content} />
              ) : (
                message.content
              )}
              <div className={cn(
                'text-xs mt-1',
                message.role === 'user' 
                  ? 'text-primary-foreground/70' 
                  : 'text-muted-foreground'
              )}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="ordify-chat-message ordify-chat-message-assistant">
              <div className="ordify-chat-loading">
                <div className="ordify-chat-loading-dot"></div>
                <div className="ordify-chat-loading-dot" style={{ animationDelay: '150ms' }}></div>
                <div className="ordify-chat-loading-dot" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-sm text-destructive text-center p-2">
            {error}
          </div>
        )}
      </div>
      
      {/* Chat input */}
      <div className="ordify-chat-input">
            <ProfessionalInput
              value={inputValue}
              onChange={setInputValue}
              onKeyDown={handleKeyPress}
              placeholder={config.placeholder}
              disabled={isLoading}
              className="flex-1"
            />
        <Button 
          size="icon" 
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {config.resizable !== false && (
        <ResizeHandle onResize={(deltaY) => {
          // Simple resize logic - could be enhanced
          console.log('Resize:', deltaY)
        }} />
      )}
    </Card>
  )
}
