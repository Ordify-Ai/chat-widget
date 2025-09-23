import { cn } from '@/utils'
import { X } from 'lucide-react'

interface ChatHeaderProps {
  chatName?: string
  showMinimizeButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  primaryColor?: string
  headerIcon?: string
  glassEffect?: boolean
  darkMode?: boolean
  className?: string
}

export function ChatHeader({
  chatName = "Chat Assistant",
  showCloseButton = true,
  onClose,
  primaryColor = "#3b82f6",
  headerIcon,
  glassEffect = false,
  darkMode = false,
  className
}: ChatHeaderProps) {
  const headerClasses = cn(
    'flex items-center justify-between px-4 py-3 rounded-t-lg',
    glassEffect 
      ? darkMode 
        ? 'ordify-glass-effect-dark text-white' 
        : 'ordify-glass-effect text-gray-900'
      : 'bg-white text-gray-900 border-b',
    className
  )

  const headerStyle = !glassEffect && primaryColor ? { 
    backgroundColor: primaryColor,
    color: 'white'
  } : {}

  return (
    <div 
      className={headerClasses}
      style={headerStyle}
    >
      <div className="flex items-center space-x-3">
        {headerIcon && (
          <img 
            src={headerIcon} 
            alt="Chat Icon" 
            className="w-6 h-6 rounded-full"
          />
        )}
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
