# Ordify Chat Widget

A professional, production-ready React chat widget that enables seamless integration of Ordify AI agents into any web application. Deploy intelligent conversational interfaces with minimal setup and maximum customization.

## 🎯 What You Get

- **Zero Configuration**: Drop-in chat widget with no CSS imports or complex setup
- **Professional UI**: Polished, responsive chat interface that matches your brand
- **Real-time AI**: Direct integration with your Ordify AI agents for instant responses
- **Multiple Modes**: Floating chat buttons, embedded interfaces, and custom layouts
- **Enterprise Ready**: TypeScript support, theme-aware styling, and production-grade performance

## 📋 Prerequisites

Before integrating the chat widget, ensure you have:

- **API Key**: Available in your Ordify dashboard (Account → Settings → API)
- **Agent ID**: Found in your agent configuration panel within the Ordify application
- **React Application**: Compatible with React 18+ and modern build tools


> **🚀 Try it live!** Visit [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo) to see all chat modes in action.

## ✨ Features

- 🚀 **Zero Configuration**: No CSS imports or additional setup required
- 🎨 **Multiple Modes**: Floating and embedded chat interfaces
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🎨 **Customizable**: Colors, themes, and styling options
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔄 **Real-time**: Streaming responses from Ordify AI agents
- 🎭 **Theme-aware**: Automatic light/dark mode support
- 🔧 **Resizable**: User-adjustable chat window height
- 📝 **Markdown Support**: Rich text rendering for AI responses
<img width="1919" height="1321" alt="image" src="https://github.com/user-attachments/assets/41f20eb9-7b37-48ef-89bc-e406b73db4bd" />

## 🚀 Quick Start

### 1. Install the Library

**From NPM (Recommended):**
```bash
npm install ordify-chat-widget
```

**From GitHub Packages (Mirror):**
```bash
npm install @ordify-ai/chat-widget
```

### 2. Add to Your React App

**If using NPM package (recommended):**
```tsx
import { OrdifyChat } from 'ordify-chat-widget'
```

**If using GitHub Packages mirror:**
```tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'

function App() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://r.ordify.ai"
      chatName="AI Assistant"
      buttonText="Chat with us"
    />
  )
}
```

**That's it!** No CSS imports, no additional setup. The library includes all necessary styles automatically.

### GitHub Packages Setup (Optional)

GitHub Packages serves as a mirror of the NPM package. If you need to use it, configure authentication:

1. **Create a Personal Access Token** with `read:packages` scope
2. **Configure npm authentication:**
   ```bash
   npm login --scope=@ordify-ai --auth-type=legacy --registry=https://npm.pkg.github.com
   ```
3. **Or add to your `.npmrc` file:**
   ```
   @ordify-ai:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_TOKEN
   ```

> **Note**: We recommend using the NPM version (`ordify-chat-widget`) as it's the primary registry and source of truth.

## 🎨 Chat Modes

### Floating Chat (Recommended for websites)
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="floating"
  position="bottom-right"
  buttonText="AI Chat"
/>
```

### Embedded Chat (For dedicated chat pages)
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="embedded"
  height="500px"
  chatName="Support Assistant"
/>
```

**Note**: `embedded` and `inline` modes are identical - both render a full chat interface within your page layout. Use `embedded` for consistency.


## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `agentId` | string | - | **Required** - Your Ordify agent ID |
| `apiKey` | string | - | **Required** - Your API key |
| `apiBaseUrl` | string | - | **Required** - API endpoint URL |
| `chatName` | string | "Chat Assistant" | Title text in chat header |
| `buttonText` | string | "AI Chat" | Text on floating button |
| `placeholder` | string | "Type a message..." | Input placeholder text |
| `primaryColor` | string | - | Custom header color (optional) |
| `mode` | string | "floating" | Chat display mode: "floating" or "embedded" |
| `position` | string | "bottom-right" | Floating button position |
| `resizable` | boolean | true | Allow user to resize chat |
| `showHeader` | boolean | true | Show/hide chat header |
| `height` | number | 400 | Initial chat height (px) |
| `width` | string | "320px" | Chat width |
| `onSessionCreated` | function | - | **Optional** - Callback when a new session is created with session ID |
| `initialMessage` | string | - | **Optional** - Message to automatically send when chat loads |
| `initialContext` | string | - | **Optional** - Hidden system context sent to backend (user ID, page info, etc.) |

## 🎯 Advanced Features

### Session Management
The `onSessionCreated` callback provides access to the auto-generated session ID when a new chat session is created. This is useful for:
- **User tracking**: Associate chat sessions with specific users
- **Analytics**: Track user engagement and conversation patterns
- **Support**: Link chat sessions to customer support tickets
- **Persistence**: Store session IDs for conversation history

### Initial Message
The `initialMessage` prop allows you to automatically send a message when the chat widget loads. This is perfect for:
- **Product pages**: Pre-populate with product-specific questions
- **Support**: Start with a greeting or help prompt
- **Onboarding**: Guide new users with initial instructions
- **A/B testing**: Test different conversation starters

### System Context (initialContext)
The `initialContext` prop allows you to send hidden system information to your AI agent without displaying it to users. This is perfect for:
- **User identification**: Send user ID, email, or subscription tier
- **Page context**: Include current page URL, product ID, or section
- **Session data**: Pass cart items, preferences, or previous interactions
- **Analytics**: Include tracking data, campaign sources, or A/B test groups

**Key Features**:
- **Hidden from users**: Context is sent to backend but never displayed in chat
- **Flexible scenarios**: Works with or without `initialMessage`
- **Backward compatible**: Existing usage without `initialContext` continues to work

**Usage Scenarios**:

1. **Both message and context**:
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  initialMessage="Help me with the Library page"
  initialContext={`user_id: ${userId}, page: /library, tier: premium`}
/>
```

2. **Context only** (auto-adds "Hi" greeting):
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  initialContext={`user_id: ${userId}, page: /checkout, cart_items: 3`}
/>
```

3. **Message only** (backward compatible):
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  initialMessage="Hello!"
/>
```

### Theme-Aware Defaults

When no `primaryColor` is specified, the header automatically adapts:
- **Light mode**: White background with dark text
- **Dark mode**: Dark background with light text

## 📚 Examples

### Live Demo
Visit [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo) to see all chat modes in action with real functionality.

### Integration Examples

#### Next.js App Router
```tsx
// app/chat/page.tsx
'use client'

import { OrdifyChat } from 'ordify-chat-widget'

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
      />
    </div>
  )
}
```

#### React Component
```tsx
// components/ChatWidget.tsx
import { OrdifyChat } from 'ordify-chat-widget'

export function ChatWidget() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://r.ordify.ai"
      mode="floating"
      position="bottom-right"
      buttonText="AI Chat"
    />
  )
}
```

#### Session Management
```tsx
// components/ChatWithSessionTracking.tsx
import { useState } from 'react'
import { OrdifyChat } from 'ordify-chat-widget'

export function ChatWithSessionTracking() {
  const [sessionId, setSessionId] = useState<string | null>(null)

  return (
    <div>
      {sessionId && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Session ID:</strong> <code className="bg-blue-100 px-2 py-1 rounded text-xs">{sessionId}</code>
          </p>
        </div>
      )}
      
      <OrdifyChat
        agentId="your-agent-id"
        apiKey="your-api-key"
        apiBaseUrl="https://r.ordify.ai"
        mode="floating"
        onSessionCreated={(id) => {
          setSessionId(id)
          console.log('New session created:', id)
          // Store in localStorage, send to analytics, etc.
        }}
      />
    </div>
  )
}
```

#### Initial Message
```tsx
// components/ChatWithInitialMessage.tsx
import { OrdifyChat } from 'ordify-chat-widget'

export function ChatWithInitialMessage() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://r.ordify.ai"
      mode="embedded"
      height="400px"
      chatName="Product Assistant"
      initialMessage="Hello! I'm interested in learning about your products."
      onSessionCreated={(sessionId) => {
        console.log('Chat started with session:', sessionId)
        // Track user engagement
      }}
    />
  )
}
```

#### System Context Integration
```tsx
// components/ChatWithContext.tsx
import { OrdifyChat } from 'ordify-chat-widget'
import { useUser } from './hooks/useUser'
import { useRouter } from 'next/router'

export function ChatWithContext() {
  const { user } = useUser()
  const router = useRouter()

  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://r.ordify.ai"
      mode="floating"
      buttonText="Need Help?"
      initialMessage={`Hi! I'm ${user?.name || 'a visitor'}, help me with this page.`}
      initialContext={`user_id: ${user?.id}, email: ${user?.email}, page: ${router.pathname}, tier: ${user?.subscriptionTier || 'free'}`}
      onSessionCreated={(sessionId) => {
        console.log('Session created with context:', sessionId)
        // Analytics tracking with user context
        analytics.track('chat_session_started', {
          sessionId,
          userId: user?.id,
          page: router.pathname
        })
      }}
    />
  )
}
```

#### Landing Page Integration
```tsx
// pages/index.tsx
import { OrdifyChat } from 'ordify-chat-widget'

export default function HomePage() {
  return (
    <div>
      {/* Your existing page content */}
      <h1>Welcome to Our Site</h1>
      <p>Content here...</p>
      
      {/* Add chat widget */}
      <OrdifyChat
        agentId="your-agent-id"
        apiKey="your-api-key"
        apiBaseUrl="https://r.ordify.ai"
        mode="floating"
        buttonText="Need Help?"
      />
    </div>
  )
}
```

## 🔧 Development

### Setup
```bash
git clone https://github.com/ordify-ai/chat-widget.git
cd chat-widget
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Publishing

**Automatic Publishing**: This package is automatically published to NPM when changes are merged to the `main` branch, with GitHub Packages serving as a mirror.

- **NPM**: Primary registry (`ordify-chat-widget`) - **source of truth**
- **GitHub Packages**: Mirror registry (`@ordify-ai/chat-widget`) - automatic backup
- **Version Sync**: GitHub Packages mirrors NPM versions exactly

**Manual Publishing** (if needed):
```bash
# Publish to NPM
npm publish --registry=https://registry.npmjs.org/

# Publish to GitHub Packages
npm publish --registry=https://npm.pkg.github.com
```

### Integration Examples
See the [`examples/integration/`](./examples/integration/) directory for ready-to-copy code snippets for different frameworks and use cases.

## 📖 Documentation

- **[Integration Examples](./examples/integration/)** - Ready-to-copy code snippets for different frameworks

## 🤝 Support

- **Live Demo**: [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo)
- **Documentation**: [Integration Examples](./examples/integration/)
- **Issues**: [GitHub Issues](https://github.com/ordify-ai/chat-widget/issues)
- **Email**: support@ordify.ai

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ by the Ordify team**
