# Integration Examples

This directory contains code snippets showing how to integrate the Ordify Chat Widget into different frameworks and use cases.

## 📁 Files

- `nextjs-app-router.tsx` - Next.js App Router integration
- `nextjs-pages-router.tsx` - Next.js Pages Router integration  
- `react-component.tsx` - React component integration
- `landing-page.tsx` - Landing page integration
- `support-page.tsx` - Support page integration

## 🚀 Quick Integration

1. **Install the library:**
   ```bash
   npm install @ordify-ai/chat-widget
   ```

2. **Copy the relevant example** for your use case

3. **Replace the configuration** with your actual values:
   - `agentId` - Your Ordify agent ID
   - `apiKey` - Your API key
   - `apiBaseUrl` - API endpoint URL (defaults to https://r.ordify.ai)

4. **Customize** the chat appearance and behavior as needed

## 🎯 Use Cases

### Floating Chat (Most Common)
Perfect for adding chat to existing websites without changing layout.

### Embedded Chat
Great for dedicated chat pages or support sections.


## 🔧 Environment Variables

For production, use environment variables:

```bash
# .env.local
NEXT_PUBLIC_ORDIFY_AGENT_ID=your-agent-id
NEXT_PUBLIC_ORDIFY_API_KEY=your-api-key
NEXT_PUBLIC_ORDIFY_API_URL=https://r.ordify.ai
```

## 📚 More Examples

Visit [app.ordify.ai/widget-demo](https://app.ordify.ai/widget-demo) to see all chat modes in action with real functionality.
