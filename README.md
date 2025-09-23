# Ordify Chat Widget

A professional, reusable React chat widget that allows developers to easily integrate Ordify AI agents into their applications with **zero configuration**.

> **🚀 Try it live!** Visit [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo) to see all chat modes in action.

## ✨ Features

- 🚀 **Zero Configuration**: No CSS imports or additional setup required
- 🎨 **Multiple Modes**: Floating, embedded, inline, and modal chat interfaces
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🎨 **Customizable**: Colors, themes, and styling options
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔄 **Real-time**: Streaming responses from Ordify AI agents
- 🎭 **Theme-aware**: Automatic light/dark mode support
- 🔧 **Resizable**: User-adjustable chat window height
- 📝 **Markdown Support**: Rich text rendering for AI responses

## 🚀 Quick Start

### 1. Install the Library

```bash
npm install @ordify/chat-widget
```

### 2. Add to Your React App

```tsx
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://api.ordify.ai"
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

### Inline Chat (For content pages)
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="inline"
  height="400px"
  primaryColor="#8b5cf6"
/>
```

### Modal Chat (For focused conversations)
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="modal"
  chatName="Consultation Assistant"
/>
```

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
| `mode` | string | "floating" | Chat display mode |
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

### Basic Usage Example
```bash
cd examples/basic-usage
npm install
npm run dev
# Open http://localhost:3001
```

### Advanced Usage Example
```bash
cd examples/advanced-usage
npm install
npm run dev
# Open http://localhost:3001
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

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Detailed setup instructions
- **[Configuration Guide](./docs/CONFIGURATION.md)** - Complete configuration options

## 🤝 Support

- **Live Demo**: [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo)
- **Documentation**: [Quick Start Guide](./docs/QUICK_START.md)
- **Issues**: [GitHub Issues](https://github.com/ordify-ai/chat-widget/issues)
- **Email**: support@ordify.ai

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ by the Ordify team**