// pages/index.tsx or components/LandingPage.tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'
import React from 'react'

export default function HomePage() {
  return (
    <div>
      {/* Your existing page content */}
      <header>
        <h1>Welcome to Our Site</h1>
        <p>We provide amazing AI-powered solutions</p>
      </header>
      
      <main>
        <section>
          <h2>Our Services</h2>
          <p>Content about your services...</p>
        </section>
        
        <section>
          <h2>Get Started</h2>
          <p>Ready to get started? Chat with our AI assistant!</p>
        </section>
      </main>
      
      {/* Add floating chat widget */}
      <OrdifyChat
        agentId="your-agent-id"
        apiKey="your-api-key"
        apiBaseUrl="https://r.ordify.ai"
        mode="floating"
        position="bottom-right"
        buttonText="Need Help?"
        chatName="AI Assistant"
        placeholder="Ask about our services..."
      />
    </div>
  )
}
