// Main component
export { default as OrdifyChat } from './components/OrdifyChat.vue'

// Individual chat modes
export { default as EmbeddedChat } from './components/EmbeddedChat.vue'
export { default as FloatingChat } from './components/FloatingChat.vue'

// UI Components
export { default as ChatHeader } from './components/ChatHeader.vue'
export { default as ChatInput } from './components/ChatInput.vue'
export { default as ChatMessages } from './components/ChatMessages.vue'
export { default as MarkdownRenderer } from './components/MarkdownRenderer.vue'
export { default as ProfessionalInput } from './components/ProfessionalInput.vue'

// Mixins
export { useOrdifyChat } from './mixins/useOrdifyChat'

// Types
export * from './types'

// Utils
export { debounce, formatTime, generateId, throttle } from './utils'
export { OrdifyApiClient, parseStreamingResponse } from './utils/api'

