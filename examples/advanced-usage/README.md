# Advanced Usage Example

This example demonstrates all the advanced features and customization options available in the Ordify Chat Widget.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your chat widget:**
   Edit `src/App.tsx` and update the `chatConfig` object with your:
   - Agent ID
   - API Key  
   - API Base URL

3. **Run the example:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3001`

## Features Demonstrated

### 🎨 All Chat Modes
- **Floating**: Bottom-right corner button
- **Embedded**: Full-width chat interface
- **Inline**: Integrated into page content
- **Modal**: Popup chat window

### ⚙️ Advanced Configuration
- Custom colors and styling
- Resizable chat windows
- Multiple positioning options
- Header customization
- Responsive design

### 🔧 Interactive Demo
- Mode selector to switch between chat types
- Live configuration examples
- Real-time chat functionality

## Key Features

- ✅ All chat modes (floating, embedded, inline, modal)
- ✅ Advanced customization options
- ✅ Interactive mode switching
- ✅ TypeScript support
- ✅ Zero-config setup
- ✅ Responsive design

## Configuration Options

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

## Next Steps

- Try different color schemes
- Experiment with positioning
- Add custom event handlers
- Integrate with your application
