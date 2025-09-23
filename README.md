# Ordify Chat Widget

A simple, reusable React chat widget that allows developers to easily integrate Ordify AI agents into their applications.

[![npm version](https://badge.fury.io/js/%40ordify%2Fchat-widget.svg)](https://badge.fury.io/js/%40ordify%2Fchat-widget)
[![GitHub license](https://img.shields.io/github/license/Ordify-Ai/chat-widget.svg)](https://github.com/Ordify-Ai/chat-widget/blob/main/LICENSE)
[![Build Status](https://github.com/Ordify-Ai/chat-widget/workflows/CI/badge.svg)](https://github.com/Ordify-Ai/chat-widget/actions)

## ✨ Features

- 🤖 **Easy Integration** - Add AI chat to your app in minutes
- 🎨 **Beautiful UI** - Built with shadcn/ui and Tailwind CSS
- 🌙 **Theme Support** - Light and dark themes included
- 📱 **Responsive** - Works perfectly on mobile and desktop
- ⚡ **Real-time Streaming** - Live message streaming with auto-scroll
- 🔧 **Highly Configurable** - Customize appearance and behavior
- 📦 **TypeScript** - Full type safety and IntelliSense support
- 🚀 **Framework Agnostic** - Works with React, Next.js, and vanilla JS

## 🚀 Quick Start

### Installation

```bash
npm install @ordify/chat-widget
```

### Basic Usage

```tsx
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  return (
    <OrdifyChat 
      agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
      apiKey="your-api-key-here"
      apiBaseUrl="https://api.ordify.ai"
    />
  )
}
```

That's it! Your AI chat widget is ready to use.

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK_START.md)** - Get up and running in minutes
- **[Development Plan](./docs/DEVELOPMENT_PLAN.md)** - Project roadmap and architecture
- **[Task Manager](./docs/TASK_MANAGER.md)** - Development progress tracking
- **[API Reference](./docs/API_REFERENCE.md)** - Complete API documentation (coming soon)

## 🎯 Use Cases

- **Customer Support** - Add AI-powered support to your website
- **Documentation** - Create interactive help systems
- **E-commerce** - Product recommendation and assistance
- **Education** - Interactive learning experiences
- **Internal Tools** - AI assistants for your team

## 🛠️ Development

This project is currently in active development. We're building a production-ready chat widget that developers will love to use.

### Current Status

- ✅ Project structure and planning
- 🔄 Core components development
- ⏳ API integration
- ⏳ Testing and documentation

### Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Roadmap

- [ ] Core chat components
- [ ] Streaming message support
- [ ] Theme customization
- [ ] Session management
- [ ] Error handling
- [ ] Documentation and examples
- [ ] NPM package publication

## 📦 Installation Methods

### NPM (Recommended)
```bash
npm install @ordify/chat-widget
```

### GitHub
```bash
npm install ordify-ai/chat-widget
```

### CDN
```html
<script src="https://unpkg.com/@ordify/chat-widget@latest/dist/global.js"></script>
```

## 🎨 Examples

### React Component
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  theme="dark"
  placeholder="Ask me anything..."
  onMessage={(message) => console.log('New message:', message)}
/>
```

### Next.js Integration
```tsx
// app/chat/page.tsx
'use client'

import { OrdifyChat } from '@ordify/chat-widget'

export default function ChatPage() {
  return (
    <div className="container mx-auto p-4">
      <OrdifyChat 
        agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
        apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
      />
    </div>
  )
}
```

### Vanilla JavaScript
```html
<div id="chat-container"></div>
<script>
  OrdifyChat.mount('#chat-container', {
    agentId: 'your-agent-id',
    apiKey: 'your-api-key'
  })
</script>
```

## 🔧 Configuration

### Environment Variables
```bash
ORDIFY_AGENT_ID=your-agent-id
ORDIFY_API_KEY=your-api-key
ORDIFY_API_BASE_URL=https://api.ordify.ai
```

### Props Configuration
```tsx
interface OrdifyChatProps {
  agentId: string                    // Required: Ordify agent ID
  apiKey: string                     // Required: API authentication key
  apiBaseUrl?: string                // Optional: API base URL
  theme?: 'light' | 'dark'           // Optional: Color theme
  placeholder?: string               // Optional: Input placeholder
  height?: string | number          // Optional: Chat height
  className?: string                // Optional: Custom CSS class
  onMessage?: (message: Message) => void  // Optional: Message callback
  onError?: (error: Error) => void        // Optional: Error callback
}
```

## 🎨 Theming

### CSS Variables
```css
:root {
  --ordify-chat-bg: #ffffff;
  --ordify-chat-text: #000000;
  --ordify-chat-border: #e5e7eb;
  --ordify-chat-primary: #3b82f6;
  --ordify-chat-radius: 8px;
}
```

### Custom Styling
```tsx
<OrdifyChat 
  className="my-custom-chat"
  style={{
    height: '600px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}
/>
```

## 🐛 Troubleshooting

### Common Issues

**Invalid API key**
- Verify your API key is correct
- Check API key permissions
- Ensure correct environment (dev/prod)

**Agent not found**
- Verify agent ID exists
- Check agent is active
- Ensure you have access

**Messages not streaming**
- Check network connectivity
- Verify API endpoint accessibility
- Check browser console for errors

### Debug Mode
```tsx
<OrdifyChat 
  agentId="your-agent-id"
  apiKey="your-api-key"
  debug={true}  // Enable debug logging
/>
```

## 📊 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🤝 Support

- **Documentation:** [GitHub Wiki](https://github.com/Ordify-Ai/chat-widget/wiki)
- **Issues:** [GitHub Issues](https://github.com/Ordify-Ai/chat-widget/issues)
- **Discord:** [Ordify Community](https://discord.gg/ordify)
- **Email:** support@ordify.ai

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the framework
- [Ordify](https://ordify.ai/) for the AI platform

---

**Made with ❤️ by the Ordify team**

*Building the future of AI-powered applications*
