# Configuration Guide - Ordify Chat Widget

## 🎯 Simple Configuration File System

Instead of scattered props, use our simple configuration file approach for easy customization.

## 📁 Configuration Files

### 1. Create `chat-widget.config.js` (JavaScript)
```javascript
export const chatConfig = {
  // Required settings
  agentId: "your-agent-id",
  apiKey: "your-api-key",
  apiBaseUrl: "https://api.ordify.ai",
  
  // Chat appearance
  chatName: "Your Assistant",
  headerIcon: "/your-logo.png",
  buttonText: "Chat with us",
  placeholder: "How can I help you?",
  
  // Visual customization
  primaryColor: "#3b82f6", // Optional - leave empty for theme-aware
  glassEffect: true,
  darkMode: false,
  
  // Layout options
  mode: "floating",
  position: "bottom-right",
  resizable: true,
  
  // Advanced options
  showHeader: true,
  height: 400,
  width: "320px",
}
```

### 2. Create `chat-widget.config.ts` (TypeScript)
```typescript
import { OrdifyConfig } from '@ordify/chat-widget'

export const chatConfig: OrdifyConfig = {
  // Same configuration as above
  // TypeScript will provide autocomplete and type checking
}
```

## 🚀 Usage

### In your React component:
```tsx
import { OrdifyChat } from '@ordify/chat-widget'
import { chatConfig } from './chat-widget.config'

function App() {
  return <OrdifyChat {...chatConfig} />
}
```

### Override specific settings:
```tsx
<OrdifyChat 
  {...chatConfig}
  chatName="Custom Name"  // Override just this setting
  primaryColor="#ff6b6b"  // Override color
/>
```

## 🎨 Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `agentId` | string | - | **Required** - Your Ordify agent ID |
| `apiKey` | string | - | **Required** - Your API key |
| `apiBaseUrl` | string | - | **Required** - API endpoint URL |
| `chatName` | string | "Chat Assistant" | Title text in chat header |
| `headerIcon` | string | - | Path to your logo/icon file |
| `buttonText` | string | "AI Chat" | Text on floating button |
| `placeholder` | string | "Type a message..." | Input placeholder text |
| `primaryColor` | string | - | Custom header color (optional) |
| `glassEffect` | boolean | false | Enable glassmorphism effect |
| `darkMode` | boolean | false | Force dark/light mode |
| `mode` | string | "floating" | Chat display mode |
| `position` | string | "bottom-right" | Floating button position |
| `resizable` | boolean | true | Allow user to resize chat |
| `showHeader` | boolean | true | Show/hide chat header |
| `height` | number | 400 | Initial chat height (px) |
| `width` | string | "320px" | Chat width |

## 🔧 Theme-Aware Defaults

When `primaryColor` is not specified, the header automatically adapts:
- **Light mode**: White background with dark text
- **Dark mode**: Dark background with light text
- **Glass effect**: Semi-transparent with blur

## 📝 Examples

### Basic Setup
```javascript
export const chatConfig = {
  agentId: "your-agent-id",
  apiKey: "your-api-key", 
  apiBaseUrl: "https://api.ordify.ai",
  chatName: "Support Bot",
  headerIcon: "/logo.png"
}
```

### Custom Branding
```javascript
export const chatConfig = {
  agentId: "your-agent-id",
  apiKey: "your-api-key",
  apiBaseUrl: "https://api.ordify.ai",
  chatName: "My Company Assistant",
  headerIcon: "/company-logo.png",
  primaryColor: "#ff6b6b",
  buttonText: "Get Help",
  placeholder: "Ask us anything!"
}
```

### Glass Effect
```javascript
export const chatConfig = {
  agentId: "your-agent-id",
  apiKey: "your-api-key",
  apiBaseUrl: "https://api.ordify.ai",
  glassEffect: true,
  darkMode: false, // or true for dark theme
  chatName: "Modern Assistant"
}
```

## 🎯 Benefits

✅ **Simple**: One file to configure everything  
✅ **Type-safe**: TypeScript support with autocomplete  
✅ **Flexible**: Override any setting when needed  
✅ **Maintainable**: Easy to update and version control  
✅ **Reusable**: Share config across multiple components
