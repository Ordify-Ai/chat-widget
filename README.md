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

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher  
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

## WordPress and script-tag installation

You can add the chat widget to **any site without React** (WordPress, static HTML, Local WP, etc.) by loading the standalone script and calling the global `mount` API or using a single script tag with data attributes.

### Option 1: Script tag + mount (recommended)

Load the standalone script from a CDN (use a version number to pin; replace `1.0.38` with your desired version), then call `OrdifyChatWidget.mount()` with your config. Place this in your site header or footer (e.g. in WordPress: Theme → Theme File Editor, or a plugin like "Insert Headers and Footers").

**unpkg:**
```html
<script src="https://unpkg.com/ordify-chat-widget@1.0.38/dist/ordify-chat-widget.standalone.js"></script>
<script>
  OrdifyChatWidget.mount(null, {
    agentId: "your-agent-id",
    apiKey: "your-api-key",
    apiBaseUrl: "https://r.ordify.ai",
    mode: "floating",
    position: "bottom-right",
    buttonText: "Chat with us",
    chatName: "AI Assistant"
  });
</script>
```

**jsDelivr:**
```html
<script src="https://cdn.jsdelivr.net/npm/ordify-chat-widget@1.0.38/dist/ordify-chat-widget.standalone.js"></script>
<script>
  OrdifyChatWidget.mount(null, {
    agentId: "your-agent-id",
    apiKey: "your-api-key",
    apiBaseUrl: "https://r.ordify.ai",
    buttonText: "Chat with us"
  });
</script>
```

- Pass `null` as the first argument to mount the widget on `document.body` (typical for a floating button). To mount inside a specific element, pass the DOM node: `OrdifyChatWidget.mount(document.getElementById('my-container'), { ... })`.
- All [configuration options](#-configuration-options) (e.g. `quickQuestions`, `welcomeMessage`, `primaryColor`, `onSessionCreated`) are supported in the config object.

### Option 2: One-tag install (data attributes)

Add a single script tag with `data-ordify-widget` and the required/optional data attributes. The widget auto-mounts when the script loads. No inline script needed.

```html
<script
  src="https://unpkg.com/ordify-chat-widget@1.0.38/dist/ordify-chat-widget.standalone.js"
  data-ordify-widget
  data-ordify-agent-id="your-agent-id"
  data-ordify-api-key="your-api-key"
  data-ordify-api-base-url="https://r.ordify.ai"
  data-ordify-button-text="Chat with us"
  data-ordify-chat-name="AI Assistant"
  data-ordify-position="bottom-right"
></script>
```

**Supported data attributes (all optional except agent-id and api-key):**

| Attribute | Description |
|-----------|-------------|
| `data-ordify-agent-id` | **Required.** Your Ordify agent ID. |
| `data-ordify-api-key` | **Required.** Your API key. |
| `data-ordify-api-base-url` | API base URL (default: `https://r.ordify.ai`). |
| `data-ordify-button-text` | Floating button label. |
| `data-ordify-chat-name` | Chat header title. |
| `data-ordify-mode` | `floating` or `embedded`. |
| `data-ordify-position` | `bottom-right`, `bottom-left`, `top-right`, `top-left`. |
| `data-ordify-primary-color` | Header/theme color (e.g. `#3b82f6`). |
| `data-ordify-agent-image` | URL for agent avatar. |
| `data-ordify-welcome-message` | Welcome screen text. |
| `data-ordify-welcome-image` | URL for welcome screen image. |
| `data-ordify-quick-questions` | JSON array of strings, or comma-separated list (e.g. `["Question 1","Question 2"]` or `Question 1, Question 2`). |
| `data-ordify-container-id` | ID of the element to mount into; if omitted, mounts to `document.body`. |

### WordPress and Local WP

- **WordPress:** Add the script (and optional inline `OrdifyChatWidget.mount(...)`) in **Appearance → Theme File Editor** (footer or header), or use a plugin such as **Insert Headers and Footers** to paste the snippet site-wide.
- **Local WP:** Same as any WordPress site: use Theme File Editor or an "Insert Headers and Footers"–style plugin. No extra steps.
- **Version pinning:** Use a specific version in the script URL (e.g. `@1.0.38`) so updates are intentional. Check [releases](https://github.com/ordify-ai/chat-widget/releases) or npm for the latest version.

**Where to put your API key and Agent ID**

The widget does **not** use a separate config file. You put the Agent ID and API key in the same place as the script:

- **Option 1 (script + mount):** In the inline snippet, replace `"your-agent-id"` and `"your-api-key"` with your real values. That snippet lives wherever you add it (theme header/footer or a plugin’s “custom code” field).
- **Option 2 (data attributes):** In the script tag, set `data-ordify-agent-id="your-agent-id"` and `data-ordify-api-key="your-api-key"` (and optionally `data-ordify-api-base-url`). Again, that tag is added via theme or plugin.

So the “config” is the snippet or script tag you paste; the credentials are inside it.

**Best practice (how others do it)**

- **Avoid theme files for secrets.** If you use **Theme File Editor** and paste the snippet into `footer.php` or `header.php`, your credentials are in the theme. Theme updates can overwrite those files, and credentials are in version control if you ever export the theme. Prefer storing the snippet elsewhere.
- **Use a “header/footer” plugin.** Plugins like **Insert Headers and Footers**, **WPCode**, or **Code Snippets** store your snippet in the database (e.g. `wp_options`). You paste the script + config once in the plugin’s UI; credentials are not in theme files and survive theme updates. This is the same pattern used by Intercom, Crisp, Drift, and similar widgets: one snippet (with your site/key) added via a plugin or dashboard.
- **Optional: dedicated plugin.** For maximum control, a small WordPress plugin can provide a settings page (Agent ID, API Key, API Base URL), save them in the database, and enqueue the widget script with that config. Credentials stay in the DB and are easy to change without editing code. The widget itself does not require this; it only needs the script and config in the page (however you inject it).

**Test page:** After running `npm run build`, you can serve the repo (e.g. `npx serve .`) and open [static/wordpress-demo.html](static/wordpress-demo.html) to try the script-tag install locally. Replace the placeholder `agentId` and `apiKey` with your own.

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
| `height` | number | 600 | Initial chat height (px) |
| `width` | string | "320px" | Chat width |
| `onSessionCreated` | function | - | **Optional** - Callback when a new session is created with session ID |
| `initialMessage` | string | - | **Optional** - Message to automatically send when chat loads |
| `initialContext` | string | - | **Optional** - Hidden system context sent to backend (user ID, page info, etc.) |
| `agentImage` | string | - | **Optional** - URL to agent avatar image (shown in header and next to assistant messages) |
| `quickQuestions` | string[] | - | **Optional** - Array of quick action questions displayed as buttons in welcome screen |
| `welcomeMessage` | string | "Hi there 👋 How can we help?" | **Optional** - Custom greeting message shown in welcome screen when quickQuestions are provided |
| `welcomeImage` | string | - | **Optional** - URL to image/graphic displayed in welcome screen |

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

### Welcome Screen with Quick Questions

The `quickQuestions` prop enables a welcome screen that displays before the chat session starts. This provides a guided experience with pre-filled question buttons while still allowing users to type custom messages.

**Key Features**:
- **Quick Action Buttons**: Display common questions as clickable buttons
- **Customizable Greeting**: Set a custom welcome message (defaults to "Hi there 👋 How can we help?")
- **Welcome Image**: Add a custom image or graphic to the welcome screen
- **Gradient Background**: Beautiful gradient that starts with your primary color and fades to the theme background
- **Flexible Input**: Users can click a quick question or type their own custom message
- **Dynamic Header**: Header uses primary color during welcome screen, switches to theme colors once chat starts

**Usage**:
```tsx
<OrdifyChat
  agentId="your-agent-id"
  apiKey="your-api-key"
  apiBaseUrl="https://r.ordify.ai"
  mode="floating"
  quickQuestions={[
    "I want to schedule an appointment",
    "I want to find a location near me",
    "I want a Free hearing screening",
    "Please contact me"
  ]}
  welcomeMessage="Hi there, how can we help?"
  welcomeImage="https://example.com/welcome-graphic.png"
  primaryColor="#3b82f6"
  agentImage="https://example.com/agent-avatar.png"
/>
```

**Note**: When `quickQuestions` are provided, the welcome screen is displayed before the session starts. Users must select a question or type a custom message to begin chatting. The `initialMessage` prop is automatically skipped when `quickQuestions` are present.

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

#### Welcome Screen with Quick Questions
```tsx
// components/ChatWithWelcomeScreen.tsx
import { OrdifyChat } from 'ordify-chat-widget'

export function ChatWithWelcomeScreen() {
  return (
    <OrdifyChat
      agentId="your-agent-id"
      apiKey="your-api-key"
      apiBaseUrl="https://r.ordify.ai"
      mode="floating"
      buttonText="Chat with us"
      chatName="Support Assistant"
      agentImage="https://example.com/agent-avatar.png"
      quickQuestions={[
        "I want to schedule an appointment",
        "I want to find a location near me",
        "I want a Free hearing screening",
        "Please contact me",
        "Tell me more about your products and services"
      ]}
      welcomeMessage="Hi there, how can we help?"
      welcomeImage="https://example.com/welcome-graphic.png"
      primaryColor="#3b82f6"
      onSessionCreated={(sessionId) => {
        console.log('Session started:', sessionId)
        // Track user engagement
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
# Ensure you have Node.js 18+ and npm 9+
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 9.0.0 or higher

# Clone and setup
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
