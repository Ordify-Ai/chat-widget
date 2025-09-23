import React from 'react'
import styled from 'styled-components'

interface ResizeHandleProps {
  onResize: (deltaY: number) => void
  position?: 'top' | 'bottom'
  className?: string
}

const ResizeHandleContainer = styled.div<{ $position: 'top' | 'bottom'; $isResizing: boolean }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 8px;
  cursor: ns-resize;
  background: transparent;
  transition: background-color 0.2s ease;
  ${props => props.$position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  ${props => props.$isResizing ? 'background: #d1d5db;' : ''}

  &:hover {
    background: #e5e7eb;
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background: #4b5563;
    }
    ${props => props.$isResizing ? 'background: #6b7280;' : ''}
  }
`

const ResizeHandleIndicator = styled.div<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 4px;
  background: #9ca3af;
  border-radius: 2px;
  ${props => props.$position === 'top' ? 'top: 0;' : 'bottom: 0;'}

  @media (prefers-color-scheme: dark) {
    background: #6b7280;
  }
`

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
    <ResizeHandleContainer
      $position={position}
      $isResizing={isResizing}
      className={className}
      onMouseDown={handleMouseDown}
    >
      <ResizeHandleIndicator $position={position} />
    </ResizeHandleContainer>
  )
}
