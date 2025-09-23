import { cn } from '@/utils'
import React from 'react'

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
        'w-full resize-none border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 rounded-md',
        '!bg-white !text-gray-900 !border-gray-300', // Force override any theme conflicts
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
