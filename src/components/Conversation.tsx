import { ArrowDown } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom'

interface ConversationProps {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

interface ConversationContentProps {
  className?: string
  children: React.ReactNode
}

interface ConversationScrollButtonProps {
  className?: string
}

const StyledStickToBottom = styled(StickToBottom)`
  position: relative;
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`

const StyledStickToBottomContent = styled(StickToBottom.Content)`
  padding: 16px;
`

const ScrollButton = styled.button`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #d1d5db;
  background: white;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
    color: #9ca3af;

    &:hover {
      background: #374151;
      border-color: #4b5563;
      color: #d1d5db;
    }
  }
`

export function Conversation({ className, children, style }: ConversationProps) {
  return (
    <StyledStickToBottom
      className={className}
      style={style}
      initial="smooth"
      resize="smooth"
      role="log"
    >
      {children}
    </StyledStickToBottom>
  )
}

export function ConversationContent({ className, children }: ConversationContentProps) {
  return (
    <StyledStickToBottomContent className={className}>
      {children}
    </StyledStickToBottomContent>
  )
}

export function ConversationScrollButton({ className }: ConversationScrollButtonProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  const handleScrollToBottom = React.useCallback(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    !isAtBottom && (
      <ScrollButton
        className={className}
        onClick={handleScrollToBottom}
        type="button"
      >
        <ArrowDown />
      </ScrollButton>
    )
  )
}
