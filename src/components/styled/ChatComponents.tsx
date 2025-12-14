import styled from 'styled-components'

// Base chat widget container
export const ChatWidget = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: white;
  border: 1px solid #e5e7eb;
  min-height: 0;
  
  /* Try both media query approaches */
  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-color: #374151;
  }
  
  /* Alternative approach using data attribute */
  &[data-theme="dark"] {
    background-color: #1f2937;
    border-color: #374151;
  }
`

// Chat message base styles
export const ChatMessage = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  word-break: break-word;
  margin-left: ${props => props.$isUser ? 'auto' : '0'};
  margin-right: ${props => props.$isUser ? '0' : 'auto'};
  line-height: 1.5;
  
  /* User message styles - Light mode */
  background-color: ${props => props.$isUser ? '#3b82f6' : '#f3f4f6'};
  color: ${props => props.$isUser ? '#ffffff' : '#111827'};
  
  /* Ensure bold text has proper contrast */
  strong, b {
    font-weight: 600;
    color: inherit;
  }
  
  /* Dark mode support - Media query */
  @media (prefers-color-scheme: dark) {
    background-color: ${props => props.$isUser ? '#3b82f6' : 'transparent'};
    color: ${props => props.$isUser ? '#ffffff' : '#e5e7eb'};
    
    strong, b {
      color: ${props => props.$isUser ? '#ffffff' : '#ffffff'};
      font-weight: 700;
    }
  }
  
  /* Dark mode support - Data attribute (for ChatWindow/ChatWidget parents) */
  [data-theme="dark"] & {
    background-color: ${props => props.$isUser ? '#3b82f6' : 'transparent'};
    color: ${props => props.$isUser ? '#ffffff' : '#e5e7eb'};
    
    strong, b {
      color: ${props => props.$isUser ? '#ffffff' : '#ffffff'};
      font-weight: 700;
    }
  }
`

// Chat input container
export const ChatInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #ffffff;
  
  @media (prefers-color-scheme: dark) {
    background-color: #1f2937;
    border-top-color: #374151;
  }
  
  [data-theme="dark"] & {
    background-color: #1f2937;
    border-top-color: #374151;
  }
`

// Professional input field
export const ProfessionalInput = styled.textarea`
  flex: 1;
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1f2937;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: #6b7280;
  }
  
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
    
    &::placeholder {
      color: #9ca3af;
    }
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
  }
  
  [data-theme="dark"] & {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
    
    &::placeholder {
      color: #9ca3af;
    }
    
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
  }
`

// Send button
export const SendButton = styled.button`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  background: transparent;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  color: #3b82f6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover:not(:disabled) {
    background: #3b82f6;
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #9ca3af;
    color: #9ca3af;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const darkenColor = (color: string, amount: number = 0.15): string => {
  if (color && color.startsWith('#')) {
    const hex = color.replace('#', '')
    const num = parseInt(hex, 16)
    if (isNaN(num)) return color
    const r = Math.max(0, Math.min(255, (num >> 16) & 0xff) * (1 - amount))
    const g = Math.max(0, Math.min(255, (num >> 8) & 0xff) * (1 - amount))
    const b = Math.max(0, Math.min(255, num & 0xff) * (1 - amount))
    return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`
  }
  return color || '#2563eb'
}

// Floating chat button
export const FloatingButton = styled.button<{ $position?: string; $primaryColor?: string }>`
  position: fixed;
  z-index: 50;
  height: 48px;
  padding: 0 16px;
  background: ${props => {
    if (props.$primaryColor) {
      const darker = darkenColor(props.$primaryColor, 0.1)
      return `linear-gradient(135deg, ${props.$primaryColor} 0%, ${darker} 100%)`
    }
    return 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
  }};
  color: white;
  border: none;
  border-radius: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  
  /* Position based on prop */
  ${props => {
    switch (props.$position) {
      case 'bottom-left':
        return 'bottom: 24px; left: 24px;'
      case 'top-right':
        return 'top: 24px; right: 24px;'
      case 'top-left':
        return 'top: 24px; left: 24px;'
      default:
        return 'bottom: 24px; right: 24px;'
    }
  }}
  
  &:hover {
    background: ${props => {
    if (props.$primaryColor) {
      const darker = darkenColor(props.$primaryColor, 0.2)
      const darkest = darkenColor(props.$primaryColor, 0.3)
      return `linear-gradient(135deg, ${darker} 0%, ${darkest} 100%)`
    }
    return 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)'
  }};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .icon-container {
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

// Chat window container
export const ChatWindow = styled.div<{ $position: string }>`
  position: fixed;
  z-index: 50;
  width: 320px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  
  /* Position based on prop */
  ${props => {
    switch (props.$position) {
      case 'bottom-left':
        return 'bottom: 24px; left: 24px;'
      case 'top-right':
        return 'top: 24px; right: 24px;'
      case 'top-left':
        return 'top: 24px; left: 24px;'
      default:
        return 'bottom: 24px; right: 24px;'
    }
  }}
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
  
  &[data-theme="dark"] {
    background: #1f2937;
    border-color: #374151;
  }
  
  @media (min-width: 640px) {
    width: 384px;
  }
`

// Chat header
export const ChatHeader = styled.div<{ primaryColor?: string }>`
  padding: 12px 16px;
  background: ${props => props.primaryColor || '#3b82f6'};
  color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  
  .header-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`

// Close button
export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

// Conversation container
export const Conversation = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  @media (prefers-color-scheme: dark) {
    &::-webkit-scrollbar-track {
      background: #374151;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #6b7280;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  }
  
  [data-theme="dark"] & {
    &::-webkit-scrollbar-track {
      background: #374151;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #6b7280;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  }
`

// Loading dots
export const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  
  .dot {
    width: 8px;
    height: 8px;
    background: #6b7280;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
    &:nth-child(3) { animation-delay: 0s; }
  }
  
  @keyframes bounce {
    0%, 80%, 100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
  
  @media (prefers-color-scheme: dark) {
    .dot {
      background: #9ca3af;
    }
  }
`

// Timestamp
export const Timestamp = styled.div<{ $isUser: boolean }>`
  font-size: 12px;
  margin-top: 4px;
  color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.8)' : '#6b7280'};
  
  @media (prefers-color-scheme: dark) {
    color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.8)' : '#d1d5db'};
  }
  
  [data-theme="dark"] & {
    color: ${props => props.$isUser ? 'rgba(255, 255, 255, 0.8)' : '#d1d5db'};
  }
`

// Error message
export const ErrorMessage = styled.div`
  font-size: 14px;
  color: #dc2626;
  text-align: center;
  padding: 8px;
  margin: 16px 0;
  
  @media (prefers-color-scheme: dark) {
    color: #f87171;
  }
`

// Resize handle
export const ResizeHandle = styled.div<{ $position: string }>`
  position: absolute;
  ${props => props.$position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #e5e7eb 0%, #3b82f6 50%, #e5e7eb 100%);
  cursor: ${props => props.$position === 'top' ? 'ns-resize' : 'ns-resize'};
  border-radius: ${props => props.$position === 'top' ? '8px 8px 0 0' : '0 0 8px 8px'};
  opacity: 0.7;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
    background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #3b82f6 100%);
  }
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, #374151 0%, #3b82f6 50%, #374151 100%);
    
    &:hover {
      background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #3b82f6 100%);
    }
  }
`

// Agent avatar
export const AgentAvatar = styled.img<{ $size?: string }>`
  width: ${props => props.$size || '32px'};
  height: ${props => props.$size || '32px'};
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
`

// Helper function to convert hex to rgba with opacity
const hexToRgba = (hex: string, opacity: number): string => {
  if (!hex || !hex.startsWith('#')) {
    return hex || 'transparent'
  }
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// Welcome screen container
export const WelcomeScreenContainer = styled.div<{ $primaryColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  gap: 20px;
  position: relative;
  
  /* Gradient background - starts with full primary color at top, fades to background color */
  background: ${props => {
    if (props.$primaryColor) {
      return `linear-gradient(to bottom, ${props.$primaryColor} 0%, ${props.$primaryColor} 20%, rgba(255, 255, 255, 0.3) 45%, rgba(255, 255, 255, 0.7) 65%, rgba(255, 255, 255, 1) 100%)`
    }
    return 'transparent'
  }};
  
  @media (prefers-color-scheme: dark) {
    background: ${props => {
      if (props.$primaryColor) {
        return `linear-gradient(to bottom, ${props.$primaryColor} 0%, ${props.$primaryColor} 20%, rgba(31, 41, 55, 0.3) 45%, rgba(31, 41, 55, 0.7) 65%, rgba(31, 41, 55, 1) 100%)`
      }
      return 'transparent'
    }};
  }
  
  [data-theme="dark"] & {
    background: ${props => {
      if (props.$primaryColor) {
        return `linear-gradient(to bottom, ${props.$primaryColor} 0%, ${props.$primaryColor} 20%, rgba(31, 41, 55, 0.3) 45%, rgba(31, 41, 55, 0.7) 65%, rgba(31, 41, 55, 1) 100%)`
      }
      return 'transparent'
    }};
  }
`

// Welcome greeting
export const WelcomeGreeting = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #111827;
  margin-bottom: 8px;
  
  @media (prefers-color-scheme: dark) {
    color: #f9fafb;
  }
  
  [data-theme="dark"] & {
    color: #f9fafb;
  }
`

// Welcome image
export const WelcomeImage = styled.img`
  max-width: 120px;
  max-height: 120px;
  width: auto;
  height: auto;
  object-fit: contain;
  margin-bottom: 8px;
  border-radius: 8px;
`

// Welcome questions container
export const WelcomeQuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 16px;
`

// Question button
export const QuestionButton = styled.button<{ $primaryColor?: string }>`
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  color: #111827;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.$primaryColor ? `${props.$primaryColor}15` : '#f3f4f6'};
    border-color: ${props => props.$primaryColor || '#d1d5db'};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.$primaryColor ? `${props.$primaryColor}25` : '#4b5563'};
      border-color: ${props => props.$primaryColor || '#6b7280'};
    }
  }
  
  [data-theme="dark"] & {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.$primaryColor ? `${props.$primaryColor}25` : '#4b5563'};
      border-color: ${props => props.$primaryColor || '#6b7280'};
    }
  }
`

// Welcome input container
export const WelcomeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  
  @media (prefers-color-scheme: dark) {
    border-top-color: #374151;
  }
  
  [data-theme="dark"] & {
    border-top-color: #374151;
  }
`
