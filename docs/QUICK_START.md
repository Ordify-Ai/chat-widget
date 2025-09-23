# Quick Start Guide - Ordify Chat Widget

## 🚀 Installation

### From NPM (Recommended)
```bash
npm install @ordify/chat-widget
```

### From GitHub (Development)
```bash
npm install ordify-ai/chat-widget
```

### From CDN
```html
<script src="https://unpkg.com/@ordify/chat-widget@latest/dist/global.js"></script>
```

## ⚡ Basic Usage

### 1. Floating Button Chat (Recommended for websites)
```tsx
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  return (
    <OrdifyChat 
      agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
      apiKey="your-api-key-here"
      apiBaseUrl="https://api.ordify.ai"
      mode="floating"  // Default: floating button with popup chat
    />
  )
}
```

### 2. Integrated Chat Interface (For dedicated chat pages)
```tsx
import { OrdifyChat } from '@ordify/chat-widget'

function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <h1>Chat with AI</h1>
      <OrdifyChat 
        agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
        apiKey="your-api-key-here"
        apiBaseUrl="https://api.ordify.ai"
        mode="embedded"  // Full-page embedded chat
        className="flex-1"
      />
    </div>
  )
}
```

### Configuration Options
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  apiBaseUrl="https://api.ordify.ai"  // Optional: defaults to production
  theme="dark"                        // Optional: 'light' | 'dark'
  placeholder="Ask me anything..."    // Optional: custom placeholder
  height="500px"                      // Optional: chat height
  onMessage={(message) => {           // Optional: message callback
    console.log('New message:', message)
  }}
  onError={(error) => {               // Optional: error callback
    console.error('Chat error:', error)
  }}
  className="my-custom-chat"          // Optional: custom CSS class
/>
```

## 🔧 Environment Variables

Create a `.env` file:
```bash
ORDIFY_AGENT_ID=3b947bd2-a24b-4e0f-8f1a-d65054b9ff49
ORDIFY_API_KEY=your-api-key-here
ORDIFY_API_BASE_URL=https://api.ordify.ai
```

Then use without props:
```tsx
<OrdifyChat />
```

## 🎨 Styling

### CSS Variables
```css
:root {
  --ordify-chat-bg: #ffffff;
  --ordify-chat-text: #000000;
  --ordify-chat-border: #e5e7eb;
  --ordify-chat-primary: #3b82f6;
  --ordify-chat-radius: 8px;
}

[data-theme="dark"] {
  --ordify-chat-bg: #1f2937;
  --ordify-chat-text: #ffffff;
  --ordify-chat-border: #374151;
  --ordify-chat-primary: #60a5fa;
}
```

### Custom Classes
```tsx
<OrdifyChat 
  className="my-chat-widget"
  style={{
    height: '600px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}
/>
```

## 📱 Responsive Design

The widget automatically adapts to different screen sizes:

```tsx
<OrdifyChat 
  className="w-full h-full min-h-[400px] max-h-[800px]"
/>
```

## 🎨 Integration Patterns

### Floating Button Chat (Perfect for Landing Pages)
```tsx
// Automatically creates a floating button in bottom-right corner
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="floating"  // Default mode
  position="bottom-right"  // bottom-right, bottom-left, top-right, top-left
  buttonStyle={{
    backgroundColor: 'hsl(var(--primary))',
    borderRadius: '50%',
    width: '60px',
    height: '60px'
  }}
  chatWindowStyle={{
    width: '380px',
    height: '500px',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  }}
/>
```

### Embedded Chat Interface (For Dedicated Chat Pages)
```tsx
// Full-page chat interface
<div className="h-screen flex flex-col">
  <header className="p-4 border-b">
    <h1>Chat with AI Assistant</h1>
  </header>
  <OrdifyChat 
    agentId="your-agent-id"
    apiKey="your-api-key"
    mode="embedded"
    className="flex-1"
    showHeader={false}  // Hide default header since we have our own
  />
</div>
```

### Inline Chat Widget (For Sidebars)
```tsx
// Chat widget that fits in a sidebar or content area
<div className="grid grid-cols-3 gap-4">
  <div className="col-span-2">
    {/* Your main content */}
  </div>
  <div className="col-span-1">
    <OrdifyChat 
      agentId="your-agent-id"
      apiKey="your-api-key"
      mode="inline"
      className="h-[600px]"
    />
  </div>
</div>
```

### Modal Chat (Triggered by Button)
```tsx
import { useState } from 'react'
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsChatOpen(true)}>
        Open Chat
      </button>
      
      {isChatOpen && (
        <OrdifyChat 
          agentId="your-agent-id"
          apiKey="your-api-key"
          mode="modal"
          onClose={() => setIsChatOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        />
      )}
    </>
  )
}
```

## 🔄 Advanced Usage

### Custom Message Handling
```tsx
import { useOrdifyChat } from '@ordify/chat-widget'

function CustomChat() {
  const { messages, sendMessage, isLoading, error } = useOrdifyChat({
    agentId: "your-agent-id",
    apiKey: "your-api-key"
  })

  const handleSend = async (content: string) => {
    try {
      await sendMessage(content)
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  return (
    <div>
      {/* Custom message rendering */}
      {messages.map((message) => (
        <div key={message.id}>
          {message.role}: {message.content}
        </div>
      ))}
      
      {/* Custom input */}
      <input 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend(e.target.value)
            e.target.value = ''
          }
        }}
        disabled={isLoading}
      />
    </div>
  )
}
```

### Session Management
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  sessionId="custom-session-id"  // Optional: custom session
  onSessionCreated={(session) => {
    // Save session ID for persistence
    localStorage.setItem('ordify-session', session.id)
  }}
/>
```

## 🛠️ Development Setup

### Local Development
```bash
# Clone the repository
git clone https://github.com/Ordify-Ai/chat-widget.git
cd chat-widget

# Install dependencies
npm install

# Start development server
npm run dev

# Build package
npm run build

# Run tests
npm test
```

### Testing with Local API
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  apiBaseUrl="http://localhost:5001"  // Local development
/>
```

## 🐛 Troubleshooting

### Common Issues

**1. "Invalid API key" error**
- Verify your API key is correct
- Check that the API key has proper permissions
- Ensure you're using the right environment (dev/prod)

**2. "Agent not found" error**
- Verify the agent ID exists
- Check that the agent is active
- Ensure you have access to the agent

**3. Messages not streaming**
- Check network connectivity
- Verify the API endpoint is accessible
- Check browser console for errors

**4. Styling issues**
- Ensure CSS variables are defined
- Check for conflicting styles
- Verify Tailwind CSS is loaded

### Debug Mode
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  debug={true}  // Enable debug logging
/>
```

## 📚 Examples

### Next.js App Router
```tsx
// app/chat/page.tsx
'use client'

import { OrdifyChat } from '@ordify/chat-widget'

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      <OrdifyChat 
        agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
        apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
        apiBaseUrl={process.env.NEXT_PUBLIC_ORDIFY_API_URL}
        mode="embedded"  // Full-page chat
      />
    </div>
  )
}
```

### Ordify-Web Integration Example
```tsx
// components/LiveChat.tsx - Replace your existing LiveChat component
'use client'

import { OrdifyChat } from '@ordify/chat-widget'

export default function LiveChat() {
  return (
    <OrdifyChat 
      agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
      apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
      apiBaseUrl="https://api.ordify.ai"
      mode="floating"
      position="bottom-right"
      buttonStyle={{
        backgroundColor: 'hsl(var(--primary))',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      chatWindowStyle={{
        width: '380px',
        height: '500px',
        borderRadius: '12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      theme="light"
      placeholder="Ask about our AI automation solutions..."
    />
  )
}

// app/layout.tsx - Add to your root layout
import LiveChat from '@/components/LiveChat'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <LiveChat />  {/* Floating chat on every page */}
      </body>
    </html>
  )
}
```

### Vite + React
```tsx
// src/App.tsx
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My AI Chat App</h1>
      </header>
      <main>
        <OrdifyChat 
          agentId={import.meta.env.VITE_ORDIFY_AGENT_ID}
          apiKey={import.meta.env.VITE_ORDIFY_API_KEY}
        />
      </main>
    </div>
  )
}
```

### Vanilla JavaScript
```html
<!DOCTYPE html>
<html>
<head>
  <title>Ordify Chat Widget</title>
  <script src="https://unpkg.com/@ordify/chat-widget@latest/dist/global.js"></script>
</head>
<body>
  <div id="chat-container"></div>
  
  <script>
    OrdifyChat.mount('#chat-container', {
      agentId: 'your-agent-id',
      apiKey: 'your-api-key',
      theme: 'light'
    })
  </script>
</body>
</html>
```

## 🔗 API Reference

### OrdifyChat Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `agentId` | `string` | ✅ | - | Ordify agent ID |
| `apiKey` | `string` | ✅ | - | API authentication key |
| `apiBaseUrl` | `string` | ❌ | `https://api.ordify.ai` | API base URL |
| `mode` | `'floating' \| 'embedded' \| 'inline' \| 'modal'` | ❌ | `'floating'` | Chat display mode |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | ❌ | `'bottom-right'` | Floating button position |
| `theme` | `'light' \| 'dark'` | ❌ | `'light'` | Color theme |
| `placeholder` | `string` | ❌ | `'Type a message...'` | Input placeholder |
| `height` | `string \| number` | ❌ | `'500px'` | Chat height |
| `className` | `string` | ❌ | - | Custom CSS class |
| `buttonStyle` | `CSSProperties` | ❌ | - | Custom floating button styles |
| `chatWindowStyle` | `CSSProperties` | ❌ | - | Custom chat window styles |
| `showHeader` | `boolean` | ❌ | `true` | Show/hide chat header |
| `onMessage` | `(message: Message) => void` | ❌ | - | Message callback |
| `onError` | `(error: Error) => void` | ❌ | - | Error callback |
| `onClose` | `() => void` | ❌ | - | Close callback (modal mode) |

### useOrdifyChat Hook
```typescript
interface UseOrdifyChatReturn {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}
```

## 📞 Support

- **Documentation:** [GitHub Wiki](https://github.com/Ordify-Ai/chat-widget/wiki)
- **Issues:** [GitHub Issues](https://github.com/Ordify-Ai/chat-widget/issues)
- **Discord:** [Ordify Community](https://discord.gg/ordify)
- **Email:** support@ordify.ai

---

*This guide will be updated as the project develops. Check back for the latest examples and features!*
