import styled from 'styled-components'
import { CloseIcon } from './Icons'
import { AgentAvatar } from './styled/ChatComponents'

interface ChatHeaderProps {
  chatName?: string
  showMinimizeButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  agentImage?: string
  className?: string
  primaryColor?: string
  showWelcomeScreen?: boolean
}

const HeaderContainer = styled.div<{ $primaryColor?: string; $showWelcomeScreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  background: ${props => {
    if (props.$showWelcomeScreen && props.$primaryColor) {
      return props.$primaryColor;
    }
    return '#ffffff';
  }};
  color: ${props => {
    if (props.$showWelcomeScreen && props.$primaryColor) {
      return 'white';
    }
    return '#111827';
  }};
  border-bottom: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (prefers-color-scheme: dark) {
    background: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return props.$primaryColor;
      }
      return '#1f2937';
    }};
    color: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return 'white';
      }
      return '#f9fafb';
    }};
    border-bottom: none;
  }
  
  [data-theme="dark"] & {
    background: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return props.$primaryColor;
      }
      return '#1f2937';
    }};
    color: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return 'white';
      }
      return '#f9fafb';
    }};
  }
  
  [data-theme="light"] & {
    background: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return props.$primaryColor;
      }
      return '#ffffff';
    }};
    color: ${props => {
      if (props.$showWelcomeScreen && props.$primaryColor) {
        return 'white';
      }
      return '#111827';
    }};
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
  agentImage,
  className,
  primaryColor,
  showWelcomeScreen = false
}: ChatHeaderProps) {
  return (
    <HeaderContainer
      className={className}
      $primaryColor={primaryColor}
      $showWelcomeScreen={showWelcomeScreen}
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
            <CloseIcon size={16} />
          </CloseButton>
        )}
      </HeaderActions>
    </HeaderContainer>
  )
}
