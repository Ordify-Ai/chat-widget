// components/ChatWidget.tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'
import React from 'react'

export function ChatWidget() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://api.ordify.ai"
      mode="floating"
      position="bottom-right"
      buttonText="AI Chat"
      chatName="AI Assistant"
      placeholder="How can I help you?"
    />
  )
}

// Usage in your app
// import { ChatWidget } from './components/ChatWidget'
// 
// function App() {
//   return (
//     <div>
//       {/* Your app content */}
//       <ChatWidget />
//     </div>
//   )
// }
