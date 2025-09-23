import { ChatHeader } from '@/components/ChatHeader'
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/Conversation'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { ProfessionalInput } from '@/components/ProfessionalInput'
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
  const [chatHeight, setChatHeight] = React.useState(config.height || 400)
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

  const handleResize = (deltaY: number) => {
    setChatHeight(prev => {
      const currentHeight = typeof prev === 'number' ? prev : 400
      const newHeight = currentHeight - deltaY // Invert deltaY for intuitive resizing
      return Math.max(200, Math.min(600, newHeight)) // Min 200px, Max 600px
    })
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
          'h-12 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800',
          'flex items-center space-x-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200',
          'border-0 font-medium text-sm'
        )}
        style={config.buttonStyle}
        aria-label="Open chat"
      >
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <MessageSquare className="h-4 w-4" />
        </div>
        <span>
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
        'bg-white border',
        config.className
      )}
      style={{
        height: chatHeight,
        ...config.chatWindowStyle
      }}
    >
      {/* Resize handle at top */}
      {config.resizable !== false && (
        <ResizeHandle 
          position="top"
          onResize={handleResize}
        />
      )}
      
      {/* Chat header */}
      {config.showHeader !== false && (
        <ChatHeader
          chatName={config.chatName || "Chat Assistant"}
          showMinimizeButton={false}
          showCloseButton={true}
          onClose={() => setIsOpen(false)}
          primaryColor={config.primaryColor}
        />
      )}
      
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
      
      {/* Chat input - Full width */}
      <div className="border-t bg-background p-3">
        <div className="flex items-end space-x-2 w-full">
          <ProfessionalInput
            ref={inputRef}
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
            className="ordify-send-button h-8 w-8 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}