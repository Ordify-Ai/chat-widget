import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { cn, formatTime } from '@/utils'
import { Send, X } from 'lucide-react'
import React from 'react'

interface ModalChatProps {
  config: OrdifyConfig
  chat: UseOrdifyChatReturn
}

export function ModalChat({ config, chat }: ModalChatProps) {
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

  const handleClose = () => {
    setIsOpen(false)
    if (config.onClose) {
      config.onClose()
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  // Show trigger button when modal is closed
  if (!isOpen) {
    return (
      <div className="w-full">
        <Button
          onClick={handleOpen}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium py-3 px-6 rounded-lg"
        >
          Click to open modal chat
        </Button>
      </div>
    )
  }

  return (
    <div className="ordify-chat-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        className={cn(
          'ordify-chat-modal-content',
          'bg-background border rounded-lg shadow-lg flex flex-col',
          config.className
        )}
        style={{
          width: '90vw',
          maxWidth: '500px',
          height: '80vh',
          maxHeight: '600px',
          ...config.chatWindowStyle
        }}
      >
        {/* Modal header */}
        <div className="px-4 py-3 border-b flex justify-between items-center bg-primary text-primary-foreground">
          <div className="font-medium">Chat with AI</div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose}
            className="hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
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
    </div>
  )
}
