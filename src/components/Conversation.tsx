import React from 'react'
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { ArrowDown } from 'lucide-react'

interface ConversationProps {
  className?: string
  children: React.ReactNode
}

interface ConversationContentProps {
  className?: string
  children: React.ReactNode
}

interface ConversationScrollButtonProps {
  className?: string
}

export function Conversation({ className, children }: ConversationProps) {
  return (
    <StickToBottom
      className={cn('relative flex-1 overflow-y-auto', className)}
      initial="smooth"
      resize="smooth"
      role="log"
    >
      {children}
    </StickToBottom>
  )
}

export function ConversationContent({ className, children }: ConversationContentProps) {
  return (
    <StickToBottom.Content className={cn('p-4', className)}>
      {children}
    </StickToBottom.Content>
  )
}

export function ConversationScrollButton({ className }: ConversationScrollButtonProps) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  const handleScrollToBottom = React.useCallback(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    !isAtBottom && (
      <Button
        className={cn(
          'absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full',
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
      >
        <ArrowDown className="size-4" />
      </Button>
    )
  )
}
