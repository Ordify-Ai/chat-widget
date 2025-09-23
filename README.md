# Ordify Chat Widget

A simple, reusable React chat widget that allows developers to easily integrate Ordify AI agents into their applications.

## Features

- 🚀 **Easy Integration**: Simple props-based configuration
- 🎨 **Multiple Modes**: Floating, embedded, inline, and modal chat interfaces
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🎨 **Customizable**: Themes, styles, and positioning options
- 📱 **Responsive**: Works on desktop and mobile devices
- 🔄 **Real-time**: Streaming responses from Ordify AI agents
- 🎭 **Theming**: Light and dark theme support

## Installation

```bash
npm install @ordify/chat-widget
```

## Quick Start

```tsx
import { OrdifyChat } from '@ordify/chat-widget'

function App() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      mode="floating"
      position="bottom-right"
    />
  )
}
```

## Configuration

### Required Props

- `agentId`: Your Ordify agent ID
- `apiKey`: Your Ordify API key

### Optional Props

- `mode`: Chat interface mode (`floating` | `embedded` | `inline` | `modal`)
- `position`: Position for floating mode (`bottom-right` | `bottom-left` | `top-right` | `top-left`)
- `theme`: Theme (`light` | `dark`)
- `placeholder`: Input placeholder text
- `height`: Chat window height
- `className`: Additional CSS classes
- `buttonStyle`: Custom button styles
- `chatWindowStyle`: Custom chat window styles
- `showHeader`: Show/hide chat header
- `onMessage`: Message event handler
- `onError`: Error event handler
- `onClose`: Close event handler

## Examples

### Floating Chat

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="floating"
  position="bottom-right"
/>
```

### Embedded Chat

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="embedded"
  height="500px"
/>
```

### Inline Chat

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="inline"
  height="400px"
/>
```

### Modal Chat

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  mode="modal"
/>
```

## Environment Variables

You can also configure the widget using environment variables:

```bash
ORDIFY_AGENT_ID=your-agent-id
ORDIFY_API_KEY=your-api-key
ORDIFY_API_BASE_URL=https://api.ordify.ai
```

## Customization

### Themes

The widget supports light and dark themes:

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  theme="dark"
/>
```

### Custom Styles

You can customize the appearance using CSS:

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  buttonStyle={{
    backgroundColor: '#your-color',
    borderRadius: '50%',
    width: '60px',
    height: '60px'
  }}
  chatWindowStyle={{
    width: '400px',
    height: '600px',
    borderRadius: '12px'
  }}
/>
```

### Event Handlers

Handle chat events:

```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  onMessage={(message) => {
    console.log('New message:', message)
  }}
  onError={(error) => {
    console.error('Chat error:', error)
  }}
  onClose={() => {
    console.log('Chat closed')
  }}
/>
```

## Quick Start

### Option 1: Test Page (No Setup Required)
Open the test page in your browser to see all chat modes:
```bash
open examples/test-page.html
```

### Option 2: Full Setup
Run the main setup script:
```bash
./setup.sh
```

This will:
- Install all dependencies
- Build the library
- Show you all available examples

## Examples

Complete working examples with setup scripts:

- **[React Example](./examples/react-basic/)** - Basic React implementation
  ```bash
  cd examples/react-basic
  ./setup.sh
  ```

- **[Next.js Example](./examples/nextjs/)** - Next.js integration
  ```bash
  cd examples/nextjs
  ./setup.sh
  ```

- **[Vanilla JS Example](./examples/vanilla-js/)** - Plain JavaScript usage

## Support

- **Documentation**: [Quick Start Guide](./docs/QUICK_START.md)
- **Issues**: [GitHub Issues](https://github.com/Ordify-Ai/chat-widget/issues)
- **Email**: support@ordify.ai

## License

MIT License - see [LICENSE](./LICENSE) for details.