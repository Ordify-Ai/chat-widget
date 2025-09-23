import React from 'react'
import { ProfessionalInput as StyledProfessionalInput } from './styled/ChatComponents'

interface ProfessionalInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
}

export const ProfessionalInput = React.forwardRef<HTMLTextAreaElement, ProfessionalInputProps>(function ProfessionalInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Type a message...",
  disabled = false,
  className,
  maxLength = 2000
}, ref) {
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
    <StyledProfessionalInput
      ref={ref}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={className}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = 'auto'
        target.style.height = `${Math.min(target.scrollHeight, 120)}px`
      }}
    />
  )
})