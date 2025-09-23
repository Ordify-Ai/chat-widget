# Ordify Chat Widget - Next.js Example

This example demonstrates how to use the Ordify Chat Widget in a Next.js application.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Update `.env.local` with your Ordify credentials:
```
NEXT_PUBLIC_ORDIFY_AGENT_ID=your-agent-id
NEXT_PUBLIC_ORDIFY_API_KEY=your-api-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Configuration

Before using the chat widget, you need to:

1. Get your Agent ID from the Ordify dashboard
2. Generate an API key for your agent
3. Set the environment variables in `.env.local`

## Examples

The example includes four different chat modes:

- **Floating Chat**: A floating button that opens a chat window
- **Embedded Chat**: A full-page chat interface
- **Inline Chat**: A chat widget that fits inline with content
- **Modal Chat**: A chat interface that opens in a modal overlay

## Customization

You can customize the chat widget by:

- Changing the theme (light/dark)
- Adjusting the position (for floating mode)
- Modifying the button and chat window styles
- Adding custom CSS classes
- Handling events (onMessage, onError, onClose)

## Learn More

- [Ordify Chat Widget Documentation](../../README.md)
- [Quick Start Guide](../../docs/QUICK_START.md)
- [Development Plan](../../docs/DEVELOPMENT_PLAN.md)
