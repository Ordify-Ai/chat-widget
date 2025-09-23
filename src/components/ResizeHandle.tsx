import { cn } from '@/utils'
import React from 'react'

interface ResizeHandleProps {
  onResize: (deltaY: number) => void
  position?: 'top' | 'bottom'
  className?: string
}

export function ResizeHandle({ onResize, position = 'bottom', className }: ResizeHandleProps) {
  const [isResizing, setIsResizing] = React.useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  React.useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      onResize(e.movementY)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, onResize])

  return (
    <div
      className={cn(
        'absolute left-0 right-0 h-2 cursor-ns-resize bg-transparent hover:bg-gray-200 transition-colors',
        position === 'top' ? 'top-0' : 'bottom-0',
        isResizing && 'bg-gray-300',
        className
      )}
      onMouseDown={handleMouseDown}
    >
      <div className={cn(
        'absolute left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-400 rounded-full',
        position === 'top' ? 'top-0' : 'bottom-0'
      )} />
    </div>
  )
}
