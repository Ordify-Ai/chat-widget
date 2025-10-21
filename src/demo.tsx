import React from 'react'
import ReactDOM from 'react-dom/client'
import { OrdifyChat } from './components/OrdifyChat'

function DemoApp() {
  const agentId = "3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
  const apiKey = "CiQAw4W/1+zmxdHsmldHe5wGCzCvMtlpFa90dMHTox+sIhT/h5cSVABz4cb0gvyL6mpZz1MvP5PxQP/hZCiQ10m+wsEKff7cQu++g0QQKsx3aNMOJO1ij0sq9FeuMvNCbuNcUjV0khEFjbdZbUw2Z3a/O+JiQ11J+C2udw=="
  const apiBaseUrl = "http://localhost:5001"
  const initialMessage = "Hi"
  const initialContext = "user_id: test123, page: /demo, name: Test User"
  const buttonText = "?"

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ordify Chat Widget Test</h1>
      <p>Testing the initialContext feature and button configurability</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Test 1: Both initialMessage and initialContext</h2>
        <p>Should show: "Hi" in chat</p>
        <p>Should send context: "user_id: test123, page: /demo, name: Test User"</p>
        <p>Button should show: "?"</p>
      </div>

      <OrdifyChat
        agentId={agentId}
        apiKey={apiKey}
        apiBaseUrl={apiBaseUrl}
        mode="floating"
        position="bottom-right"
        buttonText={buttonText}
        chatName="Test Assistant"
        placeholder="Test the initialContext feature"
        initialMessage={initialMessage}
        initialContext={initialContext}
        onSessionCreated={(sessionId) => {
          console.log('✅ Session created:', sessionId)
        }}
        onMessage={(message) => {
          console.log('📨 Message received:', message)
        }}
        onError={(error) => {
          console.error('❌ Chat error:', error)
        }}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<DemoApp />)
