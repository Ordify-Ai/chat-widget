import { cn } from '@/utils'
import { Maximize2, Minimize2, X } from 'lucide-react'

interface ChatHeaderProps {
  chatName?: string
  isMinimized?: boolean
  showMinimizeButton?: boolean
  showCloseButton?: boolean
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  primaryColor?: string
  className?: string
}

export function ChatHeader({
  chatName = "Chat Assistant",
  isMinimized = false,
  showMinimizeButton = true,
  showCloseButton = true,
  onMinimize,
  onMaximize,
  onClose,
  primaryColor = "#3b82f6",
  className
}: ChatHeaderProps) {
  return (
    <div 
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b bg-white rounded-t-lg',
        className
      )}
      style={{ 
        backgroundColor: primaryColor,
        color: 'white'
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="font-medium text-sm">{chatName}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {showMinimizeButton && (
          <button
            onClick={isMinimized ? onMaximize : onMinimize}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
        )}
        
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
