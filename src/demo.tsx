import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { OrdifyChat } from './components/OrdifyChat'

function DemoApp() {
  const agentId = "3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
  const apiKey = "CiQAw4W/1+zmxdHsmldHe5wGCzCvMtlpFa90dMHTox+sIhT/h5cSVABz4cb0gvyL6mpZz1MvP5PxQP/hZCiQ10m+wsEKff7cQu++g0QQKsx3aNMOJO1ij0sq9FeuMvNCbuNcUjV0khEFjbdZbUw2Z3a/O+JiQ11J+C2udw=="
  const apiBaseUrl = "http://localhost:5001"
  const buttonText = "?"

  // State for dynamic testing
  const [initialMessage, setInitialMessage] = useState("Hi")
  const [initialContext, setInitialContext] = useState("user_id: test123, page: /demo, name: Test User")
  const [testKey, setTestKey] = useState(0) // Force re-render of widgets

  const handleTestScenario = (message: string, context: string) => {
    setInitialMessage(message)
    setInitialContext(context)
    setTestKey(prev => prev + 1) // Force widget re-render
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ordify Chat Widget Test</h1>
      <p>Testing the initialContext feature, button configurability, and auto-scroll</p>
      
      {/* Interactive Testing Controls */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        border: '2px solid #e0e0e0', 
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>🧪 Interactive Testing Controls</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Initial Message (visible to user):
          </label>
          <input
            type="text"
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              marginBottom: '10px'
            }}
            placeholder="Enter initial message..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Initial Context (hidden, sent to backend):
          </label>
          <textarea
            value={initialContext}
            onChange={(e) => setInitialContext(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              height: '60px',
              marginBottom: '10px'
            }}
            placeholder="Enter context (user_id, page, etc.)..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h3>Quick Test Scenarios:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleTestScenario("Hi", "user_id: test123, page: /demo, name: Test User")}
              style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Default Test
            </button>
            <button
              onClick={() => handleTestScenario("Help me with the Library page", "user_id: usr_456, page: /library, tier: premium")}
              style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Library Page
            </button>
            <button
              onClick={() => handleTestScenario("", "user_id: usr_789, page: /checkout, cart_items: 3")}
              style={{ padding: '8px 12px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Context Only
            </button>
            <button
              onClick={() => handleTestScenario("Hello! I need support", "")}
              style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Message Only
            </button>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong>Current Settings:</strong><br/>
          Message: "{initialMessage}"<br/>
          Context: "{initialContext}"
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Test 1: Floating Widget</h2>
        <p>Button should show: "?"</p>
        <p>Auto-scroll should work when new messages arrive</p>
      </div>

      <OrdifyChat
        key={`floating-${testKey}`}
        agentId={agentId}
        apiKey={apiKey}
        apiBaseUrl={apiBaseUrl}
        mode="floating"
        position="bottom-right"
        buttonText={buttonText}
        chatName="Floating Assistant"
        placeholder="Test the floating widget"
        initialMessage={initialMessage}
        initialContext={initialContext}
        onSessionCreated={(sessionId) => {
          console.log('✅ Floating session created:', sessionId)
        }}
        onMessage={(message) => {
          console.log('📨 Floating message received:', message)
        }}
        onError={(error) => {
          console.error('❌ Floating chat error:', error)
        }}
      />

      <div style={{ marginTop: '40px', marginBottom: '20px' }}>
        <h2>Test 2: Embedded Chat</h2>
        <p>Auto-scroll should work when new messages arrive</p>
        <p>Widget should be embedded as a full-page chat interface</p>
      </div>

      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', height: '500px' }}>
        <OrdifyChat
          key={`embedded-${testKey}`}
          agentId={agentId}
          apiKey={apiKey}
          apiBaseUrl={apiBaseUrl}
          mode="embedded"
          chatName="Embedded Assistant"
          placeholder="Test the embedded widget"
          initialMessage={initialMessage}
          initialContext={initialContext}
          onSessionCreated={(sessionId) => {
            console.log('✅ Embedded session created:', sessionId)
          }}
          onMessage={(message) => {
            console.log('📨 Embedded message received:', message)
          }}
          onError={(error) => {
            console.error('❌ Embedded chat error:', error)
          }}
        />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<DemoApp />)
