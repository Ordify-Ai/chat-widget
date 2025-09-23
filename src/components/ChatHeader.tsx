import { cn } from '@/utils'
import { X } from 'lucide-react'

interface ChatHeaderProps {
  chatName?: string
  showMinimizeButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  primaryColor?: string
  className?: string
}

export function ChatHeader({
  chatName = "Chat Assistant",
  showCloseButton = true,
  onClose,
  primaryColor,
  className
}: ChatHeaderProps) {
  const headerClasses = cn(
    'flex items-center justify-between px-4 py-3 rounded-t-lg',
    primaryColor 
      ? 'text-white' // Use primaryColor background
      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-b', // Theme-aware default
    className
  )

  const headerStyle = primaryColor ? { 
    backgroundColor: primaryColor,
    color: 'white'
  } : {}

  return (
    <div 
      className={headerClasses}
      style={headerStyle}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-medium text-sm">{chatName}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
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
