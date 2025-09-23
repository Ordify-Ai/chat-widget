import React from 'react'
import { cn } from '@/utils'

interface ProfessionalInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
}

export function ProfessionalInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Type a message...",
  disabled = false,
  className,
  maxLength = 2000
}: ProfessionalInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow normal text editing
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onKeyDown(e)
    } else {
      onKeyDown(e)
    }
  }

  return (
    <textarea
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={cn(
        'w-full resize-none border-0 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      rows={1}
      style={{
        minHeight: '40px',
        maxHeight: '120px',
        overflow: 'hidden'
      }}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = 'auto'
        target.style.height = `${Math.min(target.scrollHeight, 120)}px`
      }}
    />
  )
}
