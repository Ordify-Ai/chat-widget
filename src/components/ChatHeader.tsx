import { X } from 'lucide-react'
import styled from 'styled-components'
import { AgentAvatar } from './styled/ChatComponents'

interface ChatHeaderProps {
  chatName?: string
  showMinimizeButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  primaryColor?: string
  agentImage?: string
  className?: string
}

const HeaderContainer = styled.div<{ $primaryColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  background: ${props => props.$primaryColor || '#ffffff'};
  color: ${props => props.$primaryColor ? 'white' : '#111827'};
  border-bottom: none;

  @media (prefers-color-scheme: dark) {
    background: ${props => props.$primaryColor || '#1f2937'};
    color: ${props => props.$primaryColor ? 'white' : '#f9fafb'};
    border-bottom: none;
  }
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`

const ChatName = styled.span`
  font-weight: 500;
  font-size: 14px;
`

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const CloseButton = styled.button`
  padding: 4px;
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`

export function ChatHeader({
  chatName = "Chat Assistant",
  showCloseButton = true,
  onClose,
  primaryColor,
  agentImage,
  className
}: ChatHeaderProps) {
  return (
    <HeaderContainer
      $primaryColor={primaryColor}
      className={className}
    >
      <HeaderContent>
        {agentImage && (
          <AgentAvatar
            src={agentImage}
            alt={chatName || "Agent"}
            $size="32px"
          />
        )}
        <StatusIndicator>
          <StatusDot />
          <ChatName>{chatName}</ChatName>
        </StatusIndicator>
      </HeaderContent>

      <HeaderActions>
        {showCloseButton && (
          <CloseButton
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </CloseButton>
        )}
      </HeaderActions>
    </HeaderContainer>
  )
}
