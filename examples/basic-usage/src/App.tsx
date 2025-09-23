import React from 'react'
import { OrdifyChat } from '@ordify/chat-widget'

// Basic configuration - replace with your actual values
const chatConfig = {
  agentId: "your-agent-id",
  apiKey: "your-api-key",
  apiBaseUrl: "https://api.ordify.ai",
  chatName: "AI Assistant",
  buttonText: "Chat with us",
  placeholder: "How can I help you today?",
  mode: "floating" as const,
  position: "bottom-right" as const,
}

function App() {
  return (
    <div style={{ textAlign: 'center', maxWidth: '600px' }}>
      <h1>Ordify Chat Widget - Basic Example</h1>
      <p>
        This is a simple example showing how to integrate the Ordify Chat Widget 
        into your React application.
      </p>
      
      <div style={{ 
        margin: '40px 0', 
        padding: '20px', 
        backgroundColor: 'white', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>Configuration</h3>
        <p>Update the <code>chatConfig</code> object in <code>src/App.tsx</code> with your:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Agent ID</li>
          <li>API Key</li>
          <li>API Base URL</li>
        </ul>
      </div>

      <p>
        The floating chat button will appear in the bottom-right corner.
        Click it to start chatting!
      </p>

      {/* The chat widget */}
      <OrdifyChat {...chatConfig} />
    </div>
  )
}

export default App
