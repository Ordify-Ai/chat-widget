// Main component
export { OrdifyChat } from './components/OrdifyChat'

// Individual chat modes
export { EmbeddedChat } from './components/EmbeddedChat'
export { FloatingChat } from './components/FloatingChat'
export { InlineChat } from './components/InlineChat'

// UI Components
export { MarkdownRenderer } from './components/MarkdownRenderer'

// Hooks
export { useOrdifyChat } from './hooks/useOrdifyChat'
export { useOrdifyConfig } from './hooks/useOrdifyConfig'

// Types
export type {
    Agent, ApiError, ChatRequest, Message, OrdifyApiClientConfig, OrdifyConfig, Session, StreamingResponse, UseOrdifyChatReturn
} from './types'

// Utils
export { debounce, formatTime, generateId, throttle } from './utils'
export { OrdifyApiClient, parseStreamingResponse } from './utils/api'

