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

```bash
npm install @ordify-ai/chat-widget
```

### 2. Add to Your React App

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

## 🎯 Theme-Aware Defaults

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

import { OrdifyChat } from '@ordify-ai/chat-widget'

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
import { OrdifyChat } from '@ordify-ai/chat-widget'

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

#### Landing Page Integration
```tsx
// pages/index.tsx
import { OrdifyChat } from '@ordify-ai/chat-widget'

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
