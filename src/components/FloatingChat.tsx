import { ChatHeader } from '@/components/ChatHeader'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { ResizeHandle } from '@/components/ResizeHandle'
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/Conversation'
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
  const [isMinimized, setIsMinimized] = React.useState(false)

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
          'px-6 py-4 bg-primary text-primary-foreground hover:bg-primary/90',
          'flex items-center space-x-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200'
        )}
        style={config.buttonStyle}
        aria-label="Open chat"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-sm font-medium">
          {config.buttonText || config.chatName || "AI Chat"}
        </span>
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
          onMinimize={() => setIsMinimized(true)}
          onMaximize={() => setIsMinimized(false)}
          onClose={() => setIsOpen(false)}
          primaryColor={config.primaryColor}
        />
      )}
      
        {!isMinimized && (
          <>
            {/* Chat messages with auto-scroll */}
            <Conversation className="flex-1">
              <ConversationContent>
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={cn(
                      'flex mb-4',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div 
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2',
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
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
                  <div className="flex justify-start mb-4">
                    <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="text-sm text-destructive text-center p-2 mb-4">
                    {error}
                  </div>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>
      
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
          </>
        )}
    </Card>
  )
}
