import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { cn, formatTime } from '@/utils'
import { Send } from 'lucide-react'
import React from 'react'

interface EmbeddedChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function EmbeddedChat({ config, chat }: EmbeddedChatProps) {
  const { messages, sendMessage, isLoading, error } = chat
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

  return (
    <div 
      className={cn(
        'ordify-chat-widget flex flex-col h-full bg-background border rounded-lg',
        config.className
      )}
      style={{ height: config.height }}
    >
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
                'ordify-chat-message max-w-[80%]',
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
      <div className="ordify-chat-input border-t bg-background">
        <div className="flex items-center space-x-2 p-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={config.placeholder}
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
