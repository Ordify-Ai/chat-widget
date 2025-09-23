import { CSSProperties } from 'react'

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  sessionId?: string
}

export interface Session {
  id: string
  name: string
  agentConfig: {
    type: 'chat' | 'adk_agent'
    settings: any
  }
  userId: string
  createdAt: string
  updatedAt: string
  status: 'active' | 'archived'
  lastMessage?: Message
  summary?: {
    title_summary: string
    session_summary: string
    key_topics: string[]
    action_items: string[]
    last_summarized_at: string
    summary_version: number
  }
}

export interface Agent {
  id: string
  name: string
  role: string
  description: string
  goal: string
  tools: string[]
  mcp_servers: string[]
  owner_type: 'user' | 'public'
  is_user_agent: boolean
}

export interface OrdifyConfig {
  agentId: string
  apiKey: string
  apiBaseUrl?: string
  mode?: 'floating' | 'embedded'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'light' | 'dark' | 'auto'
  placeholder?: string
  height?: string | number
  width?: string | number
  className?: string
  // Customization options
  chatName?: string
  primaryColor?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: string | number
  showHeader?: boolean
  resizable?: boolean
  minHeight?: string | number
  maxHeight?: string | number
  // Header customization
  glassEffect?: boolean // Enable glass morphism effect
  darkMode?: boolean // Force dark/light mode
  // Button styling
  buttonStyle?: CSSProperties
  buttonText?: string // Added for customizable button text
  chatWindowStyle?: CSSProperties
  // Callbacks
  onMessage?: (message: Message) => void
  onError?: (error: Error) => void
  onClose?: () => void
}

export interface UseOrdifyChatReturn {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
  sessionId: string | null
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export interface StreamingResponse {
  text: string
  sessionId: string
  type: 'stream' | 'done'
  agentName?: string
  duration_ms?: number
  duration_seconds?: number
  retry_attempt?: number
}

export interface ApiError {
  detail: string
  status_code?: number
}

export interface OrdifyApiClientConfig {
  apiKey: string
  apiBaseUrl: string
  agentId: string
}

export interface ChatRequest {
  message: string
  sessionId?: string
}

export interface ChatResponse {
  sessionId: string
  messages: Message[]
}
