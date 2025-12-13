import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { OrdifyChat } from './components/OrdifyChat'

const STORAGE_KEY = 'ordify-demo-config'
const SESSION_STORAGE_KEY = 'ordify-demo-sessions'

function DemoApp() {
  const [agentId, setAgentId] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [apiBaseUrl, setApiBaseUrl] = useState("http://localhost:5001")
  const [chatName, setChatName] = useState("Chat Assistant")
  const [buttonText, setButtonText] = useState("?")
  const [primaryColor, setPrimaryColor] = useState("")
  const [agentImage, setAgentImage] = useState("")
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto')
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'>('bottom-right')
  const [floatingSessionId, setFloatingSessionId] = useState<string | null>(null)
  const [embeddedSessionId, setEmbeddedSessionId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const config = JSON.parse(saved)
        setAgentId(config.agentId || "")
        setApiKey(config.apiKey || "")
        setApiBaseUrl(config.apiBaseUrl || "http://localhost:5001")
        setChatName(config.chatName || "Chat Assistant")
        setButtonText(config.buttonText || "?")
        setPrimaryColor(config.primaryColor || "")
        setAgentImage(config.agentImage || "")
        setTheme(config.theme || 'auto')
        setPosition(config.position || 'bottom-right')
      } catch (e) {
        console.error('Failed to load saved configuration:', e)
      }
    }

    const savedSessions = localStorage.getItem(SESSION_STORAGE_KEY)
    if (savedSessions) {
      try {
        const sessions = JSON.parse(savedSessions)
        if (sessions.floating) setFloatingSessionId(sessions.floating)
        if (sessions.embedded) setEmbeddedSessionId(sessions.embedded)
      } catch (e) {
        console.error('Failed to load saved sessions:', e)
      }
    }
  }, [])

  useEffect(() => {
    const config = {
      agentId,
      apiKey,
      apiBaseUrl,
      chatName,
      buttonText,
      primaryColor,
      agentImage,
      theme,
      position
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [agentId, apiKey, apiBaseUrl, chatName, buttonText, primaryColor, agentImage, theme, position])

  // State for dynamic testing
  const [initialMessage, setInitialMessage] = useState("Hi")
  const [initialContext, setInitialContext] = useState("user_id: test123, page: /demo, name: Test User")
  const [activeMessage, setActiveMessage] = useState("Hi")
  const [activeContext, setActiveContext] = useState("user_id: test123, page: /demo, name: Test User")
  const [testKey, setTestKey] = useState(0) // Force re-render of widgets
  const [widgetsMounted, setWidgetsMounted] = useState(false)
  const [containerHeight, setContainerHeight] = useState(500)
  const [useDynamicHeight, setUseDynamicHeight] = useState(true)
  const [dynamicHeight, setDynamicHeight] = useState(
    typeof window !== 'undefined' ? Math.max(400, window.innerHeight * 0.6) : 600
  )

  useEffect(() => {
    if (useDynamicHeight && typeof window !== 'undefined') {
      const updateHeight = () => {
        setDynamicHeight(Math.max(400, window.innerHeight * 0.6))
      }
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
    }
  }, [useDynamicHeight])

  const saveSession = (type: 'floating' | 'embedded', sessionId: string) => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY)
      const sessions = saved ? JSON.parse(saved) : {}
      sessions[type] = sessionId
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))

      if (type === 'floating') {
        setFloatingSessionId(sessionId)
      } else {
        setEmbeddedSessionId(sessionId)
      }
    } catch (e) {
      console.error('Failed to save session:', e)
    }
  }

  const clearSession = (type: 'floating' | 'embedded') => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY)
      const sessions = saved ? JSON.parse(saved) : {}
      delete sessions[type]
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))

      if (type === 'floating') {
        setFloatingSessionId(null)
      } else {
        setEmbeddedSessionId(null)
      }
    } catch (e) {
      console.error('Failed to clear session:', e)
    }
  }

  const clearAllSessions = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY)
    setFloatingSessionId(null)
    setEmbeddedSessionId(null)
  }

  const handleTestScenario = (message: string, context: string) => {
    setInitialMessage(message)
    setInitialContext(context)
    setActiveMessage(message)
    setActiveContext(context)
    setTestKey(prev => prev + 1) // Force widget re-render
    setWidgetsMounted(true)
  }

  const handleApplySettings = () => {
    setActiveMessage(initialMessage)
    setActiveContext(initialContext)
    setTestKey(prev => prev + 1) // Force widget re-render
    setWidgetsMounted(true)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ordify Chat Widget Test</h1>
      <p>Testing the initialContext feature, button configurability, and auto-scroll</p>

      {/* Configuration Section */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        border: '2px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <h2 style={{ marginTop: 0 }}>Configuration</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
          Enter your Ordify credentials to test the chat widget. Your configuration will be saved locally in your browser.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Agent ID *
            </label>
            <input
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="Enter your Agent ID"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              API Key *
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="Enter your API Key"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              API Base URL *
            </label>
            <input
              type="text"
              value={apiBaseUrl}
              onChange={(e) => setApiBaseUrl(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              placeholder="http://localhost:5001"
            />
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '20px',
          marginTop: '20px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Widget Customization</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Chat Name
              </label>
              <input
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="Chat Assistant"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Button Text
              </label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="?"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Primary Color (hex code)
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                  placeholder="#007bff"
                />
                <input
                  type="color"
                  value={primaryColor || '#007bff'}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  style={{
                    width: '50px',
                    height: '38px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Agent Image URL
              </label>
              <input
                type="text"
                value={agentImage}
                onChange={(e) => setAgentImage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="https://example.com/agent-avatar.png"
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', marginBottom: 0 }}>
                Image will appear in header and next to assistant messages
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                <option value="auto">Auto (system preference)</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Button Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as typeof position)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>
          </div>
        </div>
      </div>

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
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
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

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleApplySettings}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6f42c1',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              🚀 Apply Custom Settings
            </button>
            {(floatingSessionId || embeddedSessionId) && (
              <button
                onClick={() => {
                  clearAllSessions()
                  setTestKey(prev => prev + 1)
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🗑️ Clear All Sessions
              </button>
            )}
            <span style={{ fontSize: '14px', color: '#666' }}>
              Click to mount widgets with your custom settings
            </span>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
          <strong>Input Settings:</strong><br />
          Message: "{initialMessage}"<br />
          Context: "{initialContext}"<br /><br />
          <strong>Active Settings:</strong><br />
          Message: "{activeMessage}"<br />
          Context: "{activeContext}"
        </div>
      </div>

      {!widgetsMounted && (
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        }}>
          <h2>🚀 Ready to Test!</h2>
          <p>Configure your initial message and context above, then click "Apply Custom Settings" or use one of the quick test scenarios to mount the widgets.</p>
        </div>
      )}

      {widgetsMounted && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h2 style={{ margin: 0 }}>Test 1: Floating Widget</h2>
                <p style={{ margin: '5px 0' }}>Button should show: "?"</p>
                <p style={{ margin: '5px 0' }}>Auto-scroll should work when new messages arrive</p>
              </div>
              {floatingSessionId && (
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Session ID:</div>
                  <code style={{
                    fontSize: '11px',
                    wordBreak: 'break-all',
                    display: 'block',
                    marginBottom: '4px'
                  }}>{floatingSessionId}</code>
                  <button
                    onClick={() => {
                      clearSession('floating')
                      setTestKey(prev => prev + 1)
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      backgroundColor: '#ff5252',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Session
                  </button>
                </div>
              )}
            </div>
          </div>

          <OrdifyChat
            key={`floating-${testKey}`}
            agentId={agentId}
            apiKey={apiKey}
            apiBaseUrl={apiBaseUrl}
            mode="floating"
            position={position}
            buttonText={buttonText}
            chatName={chatName}
            primaryColor={primaryColor || undefined}
            agentImage={agentImage || undefined}
            theme={theme}
            placeholder="Test the floating widget"
            sessionId={floatingSessionId || undefined}
            initialMessage={activeMessage}
            initialContext={activeContext}
            onSessionCreated={(sessionId) => {
              console.log('✅ Floating session created:', sessionId)
              saveSession('floating', sessionId)
            }}
            onMessage={(message) => {
              console.log('📨 Floating message received:', message)
            }}
            onError={(error) => {
              console.error('❌ Floating chat error:', error)
            }}
          />

          <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div>
                <h2 style={{ margin: 0 }}>Test 2: Embedded Chat</h2>
                <p style={{ margin: '5px 0' }}>Auto-scroll should work when new messages arrive</p>
                <p style={{ margin: '5px 0' }}>Widget should be embedded as a full-page chat interface</p>
              </div>
              {embeddedSessionId && (
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '6px',
                  fontSize: '12px',
                  maxWidth: '300px'
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Session ID:</div>
                  <code style={{
                    fontSize: '11px',
                    wordBreak: 'break-all',
                    display: 'block',
                    marginBottom: '4px'
                  }}>{embeddedSessionId}</code>
                  <button
                    onClick={() => {
                      clearSession('embedded')
                      setTestKey(prev => prev + 1)
                    }}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      backgroundColor: '#ff5252',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear Session
                  </button>
                </div>
              )}
            </div>

            <div style={{
              marginTop: '15px',
              padding: '15px',
              backgroundColor: '#f0f0f0',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={useDynamicHeight}
                    onChange={(e) => setUseDynamicHeight(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: 'bold' }}>Use Dynamic Height (100%)</span>
                </label>

                {useDynamicHeight && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '300px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '12px' }}>Container Height:</label>
                    <input
                      type="range"
                      value={dynamicHeight}
                      onChange={(e) => setDynamicHeight(Number(e.target.value))}
                      min={300}
                      max={typeof window !== 'undefined' ? Math.max(800, window.innerHeight * 0.9) : 1200}
                      style={{ flex: 1, cursor: 'pointer' }}
                    />
                    <span style={{ minWidth: '60px', fontSize: '12px' }}>{dynamicHeight}px</span>
                  </div>
                )}

                {!useDynamicHeight && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label style={{ fontWeight: 'bold' }}>Fixed Height:</label>
                    <input
                      type="number"
                      value={containerHeight}
                      onChange={(e) => setContainerHeight(Number(e.target.value))}
                      min={200}
                      max={1200}
                      style={{
                        width: '80px',
                        padding: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                      }}
                    />
                    <span>px</span>
                  </div>
                )}
              </div>

              <div style={{ fontSize: '12px', color: '#666' }}>
                {useDynamicHeight
                  ? `✅ Chat fills container dynamically (${dynamicHeight}px) - Resize window to see it update automatically`
                  : `📐 Chat container height: ${containerHeight}px (fixed)`
                }
              </div>
            </div>
          </div>

          <div
            style={{
              border: '2px solid #3b82f6',
              borderRadius: '8px',
              height: useDynamicHeight ? `${dynamicHeight}px` : `${containerHeight}px`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              transition: 'height 0.3s ease'
            }}
          >
            <div style={{
              padding: '10px',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px',
              borderBottom: '2px solid #2563eb'
            }}>
              {useDynamicHeight
                ? `Dynamic Container (height: ${dynamicHeight}px, chat uses 100% of this)`
                : `Fixed Container (height: ${containerHeight}px)`
              }
            </div>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              <OrdifyChat
                key={`embedded-${testKey}`}
                agentId={agentId}
                apiKey={apiKey}
                apiBaseUrl={apiBaseUrl}
                mode="embedded"
                chatName={chatName}
                primaryColor={primaryColor || undefined}
                agentImage={agentImage || undefined}
                theme={theme}
                placeholder="Test the embedded widget"
                height={useDynamicHeight ? '100%' : containerHeight}
                sessionId={embeddedSessionId || undefined}
                initialMessage={activeMessage}
                initialContext={activeContext}
                onSessionCreated={(sessionId) => {
                  console.log('✅ Embedded session created:', sessionId)
                  saveSession('embedded', sessionId)
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
        </>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<DemoApp />)
