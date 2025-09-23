// pages/chat.tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'
import React from 'react'

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      <OrdifyChat 
        agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
        apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
        apiBaseUrl="https://r.ordify.ai"
        mode="embedded"
        height="500px"
        chatName="AI Assistant"
        placeholder="Ask me anything..."
      />
    </div>
  )
}
