import { OrdifyChat } from '@ordify/chat-widget'
import { useState } from 'react'

// Advanced configuration with all options
const chatConfig = {
  agentId: "your-agent-id",
  apiKey: "your-api-key", 
  apiBaseUrl: "https://api.ordify.ai",
  chatName: "Advanced AI Assistant",
  buttonText: "Start Chat",
  placeholder: "Ask me anything...",
  primaryColor: "#8b5cf6", // Custom purple color
  mode: "floating" as const,
  position: "bottom-right" as const,
  resizable: true,
  showHeader: true,
  height: 500,
  width: "400px",
}

function App() {
  const [activeMode, setActiveMode] = useState<'floating' | 'embedded' | 'inline' | 'modal'>('floating')

  const modeConfigs = {
    floating: {
      ...chatConfig,
      mode: 'floating' as const,
      position: 'bottom-right' as const,
    },
    embedded: {
      ...chatConfig,
      mode: 'embedded' as const,
      height: 400,
      width: "100%",
    },
    inline: {
      ...chatConfig,
      mode: 'inline' as const,
      height: 300,
      width: "100%",
    },
    modal: {
      ...chatConfig,
      mode: 'modal' as const,
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Ordify Chat Widget - Advanced Example</h1>
      <p>
        This example demonstrates all the advanced features and customization options 
        available in the Ordify Chat Widget.
      </p>

      <div className="chat-demo-section">
        <h2>Chat Mode Selector</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {(['floating', 'embedded', 'inline', 'modal'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              style={{
                padding: '10px 20px',
                border: activeMode === mode ? '2px solid #8b5cf6' : '1px solid #d1d5db',
                borderRadius: '6px',
                background: activeMode === mode ? '#f3f4f6' : 'white',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
        <p>Current mode: <strong>{activeMode}</strong></p>
      </div>

      {activeMode === 'embedded' && (
        <div className="chat-demo-section">
          <h3>Embedded Chat</h3>
          <p>Perfect for dedicated chat pages or support sections.</p>
          <div className="chat-container">
            <OrdifyChat {...modeConfigs.embedded} />
          </div>
        </div>
      )}

      {activeMode === 'inline' && (
        <div className="chat-demo-section">
          <h3>Inline Chat</h3>
          <p>Great for integrating chat directly into content pages.</p>
          <div className="chat-container">
            <OrdifyChat {...modeConfigs.inline} />
          </div>
        </div>
      )}

      {activeMode === 'modal' && (
        <div className="chat-demo-section">
          <h3>Modal Chat</h3>
          <p>Click the button below to open the modal chat.</p>
          <OrdifyChat {...modeConfigs.modal} />
        </div>
      )}

      <div className="chat-demo-section">
        <h2>Configuration Options</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h4>Required Settings</h4>
            <ul>
              <li><code>agentId</code> - Your Ordify agent ID</li>
              <li><code>apiKey</code> - Your API key</li>
              <li><code>apiBaseUrl</code> - API endpoint URL</li>
            </ul>
          </div>
          <div>
            <h4>Appearance</h4>
            <ul>
              <li><code>chatName</code> - Header title</li>
              <li><code>buttonText</code> - Button label</li>
              <li><code>placeholder</code> - Input placeholder</li>
              <li><code>primaryColor</code> - Custom header color</li>
            </ul>
          </div>
          <div>
            <h4>Layout</h4>
            <ul>
              <li><code>mode</code> - Chat display mode</li>
              <li><code>position</code> - Floating button position</li>
              <li><code>resizable</code> - Allow user resizing</li>
              <li><code>height</code> - Initial height</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating chat - always rendered */}
      {activeMode === 'floating' && (
        <OrdifyChat {...modeConfigs.floating} />
      )}
    </div>
  )
}

export default App
