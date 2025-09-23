# Ordify Chat Widget

A professional, reusable React chat widget that allows developers to easily integrate Ordify AI agents into their applications with minimal setup.

> **🚀 Try it now!** Clone the repo and run `open examples/live-test.html` to see all chat modes in action.

## ✨ Features

- 🚀 **Easy Integration**: Simple configuration file approach
- 🎨 **Multiple Modes**: Floating, embedded, inline, and modal chat interfaces
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🎨 **Customizable**: Colors, themes, and styling options
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- 🔄 **Real-time**: Streaming responses from Ordify AI agents
- 🎭 **Theme-aware**: Automatic light/dark mode support
- 🔧 **Resizable**: User-adjustable chat window height
- 📝 **Markdown Support**: Rich text rendering for AI responses

## 🚀 Quick Start

### Option 1: Try It Out (No Setup Required)

Want to see the chat widget in action immediately? Open our live demo:

```bash
# Clone the repository
git clone https://github.com/ordify-ai/chat-widget.git
cd chat-widget

# Open the test page in your browser
open examples/live-test.html
```

This will open a test page showing all chat modes (floating, embedded, inline, modal) with real functionality.

### Option 2: Development Setup

For development and customization:

```bash
# Clone and install
git clone https://github.com/ordify-ai/chat-widget.git
cd chat-widget
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Option 3: Use in Your Project

```bash
npm install @ordify/chat-widget
```

Create `chat-widget.config.ts` for easy customization:

```typescript
export const chatConfig = {
  // Required settings
  agentId: "your-agent-id",
  apiKey: "your-api-key",
  apiBaseUrl: "https://api.ordify.ai",
  
  // Chat appearance
  chatName: "Your Assistant",
  buttonText: "Chat with us",
  placeholder: "How can I help you?",
  
  // Visual customization
  primaryColor: "#3b82f6", // Custom header color
  mode: "floating",
  position: "bottom-right",
  resizable: true,
}

// Usage
import { chatConfig } from './chat-widget.config'
<OrdifyChat {...chatConfig} />
```

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

Complete working examples are available in the `/examples` directory:

### Live Test Page
```bash
# Quick demo of all chat modes
open examples/live-test.html
```

### React Example
```bash
cd examples/react-basic
npm install
npm run dev
# Open http://localhost:3001
```

### Next.js Example
```bash
cd examples/nextjs
npm install
npm run dev
# Open http://localhost:3000
```

### Vanilla JS Example
```bash
# Open examples/vanilla-js/index.html in your browser
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

### Test Examples
```bash
cd examples/react-basic
npm install
npm run dev
```

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Detailed setup instructions
- **[Configuration Guide](./docs/CONFIGURATION.md)** - Complete configuration options
- **[Development Plan](./docs/DEVELOPMENT_PLAN.md)** - Roadmap and features

## 🤝 Support

- **Documentation**: [Quick Start Guide](./docs/QUICK_START.md)
- **Issues**: [GitHub Issues](https://github.com/ordify-ai/chat-widget/issues)
- **Email**: support@ordify.ai

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Built with ❤️ by the Ordify team**