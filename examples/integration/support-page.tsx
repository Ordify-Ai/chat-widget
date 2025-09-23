// pages/support.tsx or components/SupportPage.tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'
import React from 'react'

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Support Center</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support content */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">How do I get started?</h3>
              <p>Getting started is easy! Just follow our quick setup guide...</p>
            </div>
            <div>
              <h3 className="font-medium">What are your pricing plans?</h3>
              <p>We offer flexible pricing plans to suit your needs...</p>
            </div>
            {/* More FAQ items */}
          </div>
        </div>
        
        {/* Chat widget sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Can't find what you're looking for? Chat with our AI assistant for instant help.
            </p>
            
            <OrdifyChat
              agentId="your-agent-id"
              apiKey="your-api-key"
              apiBaseUrl="https://r.ordify.ai"
              mode="embedded"
              height="400px"
              chatName="Support Assistant"
              placeholder="Ask a question..."
              showHeader={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
