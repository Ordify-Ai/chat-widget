import React from 'react'
import {
  ComposerInnerInput,
  ProfessionalInput as StyledProfessionalInput,
} from './styled/ChatComponents'

interface ProfessionalInputProps {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxLength?: number
  variant?: 'default' | 'composer'
}

export const ProfessionalInput = React.forwardRef<HTMLTextAreaElement, ProfessionalInputProps>(function ProfessionalInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Type a message...",
  disabled = false,
  className,
  maxLength = 2000,
  variant = 'default',
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

  const InputEl = variant === 'composer' ? ComposerInnerInput : StyledProfessionalInput

  return (
    <InputEl
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
        const cap = variant === 'composer' ? 96 : 120
        target.style.height = `${Math.min(target.scrollHeight, cap)}px`
      }}
    />
  )
})