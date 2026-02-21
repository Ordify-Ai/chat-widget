import { OrdifyConfig } from '@/types'
import { ProfessionalInput } from '@/components/ProfessionalInput'
import { SendIcon } from './SendIcon'
import React from 'react'
import {
  WelcomeScreenContainer,
  WelcomeGreeting,
  WelcomeImage,
  WelcomeQuestionsContainer,
  QuestionButton,
  WelcomeInputContainer,
  SendButton
} from './styled/ChatComponents'

interface WelcomeScreenProps {
  config: OrdifyConfig
  onQuestionClick: (question: string) => void
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function WelcomeScreen({ config, onQuestionClick, onSendMessage, isLoading }: WelcomeScreenProps) {
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    await onSendMessage(inputValue.trim())
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const welcomeMessage = config.welcomeMessage || "Hi there 👋 How can we help?"

  return (
    <WelcomeScreenContainer $primaryColor={config.primaryColor}>
      {config.welcomeImage && (
        <WelcomeImage
          src={config.welcomeImage}
          alt="Welcome"
        />
      )}
      <WelcomeGreeting>{welcomeMessage}</WelcomeGreeting>
      
      {config.quickQuestions && config.quickQuestions.length > 0 && (
        <WelcomeQuestionsContainer>
          {config.quickQuestions.map((question, index) => (
            <QuestionButton
              key={index}
              onClick={() => onQuestionClick(question)}
              disabled={isLoading}
              $primaryColor={config.primaryColor}
            >
              {question}
            </QuestionButton>
          ))}
        </WelcomeQuestionsContainer>
      )}

      <WelcomeInputContainer>
        <ProfessionalInput
          ref={inputRef}
          value={inputValue}
          onChange={setInputValue}
          onKeyDown={handleKeyPress}
          placeholder={config.placeholder || "Type a message..."}
          disabled={isLoading}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          <SendIcon size={16} />
        </SendButton>
      </WelcomeInputContainer>
    </WelcomeScreenContainer>
  )
}

