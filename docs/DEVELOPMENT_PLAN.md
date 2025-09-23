# Ordify Chat Widget Development Plan

## 🎯 Project Overview

Create a reusable React chat widget library that allows developers to easily integrate Ordify AI agents into their applications with minimal setup.

**Repository:** `ordify-ai/chat-widget`  
**NPM Package:** `@ordify/chat-widget`  
**Target:** Simple, developer-friendly chat interface using Ordify's `/chat/agents` endpoint

## 📋 Task Management

| ID | Title | Status | Priority | Dependencies |
|----|----|-----|----|-----|
| 1 | Setup Project Structure | o pending | high | None |
| 2 | Configure Build System | o pending | high | 1 |
| 3 | Create TypeScript Definitions | o pending | high | 1 |
| 4 | Implement API Client | o pending | high | 3 |
| 5 | Create Core Chat Components | o pending | high | 2,4 |
| 6 | Integrate shadcn/ui Conversation | o pending | high | 5 |
| 7 | Implement Streaming Support | o pending | high | 4,5 |
| 8 | Add Configuration System | o pending | medium | 5 |
| 9 | Create Styling & Theming | o pending | medium | 6 |
| 10 | Add Error Handling | o pending | high | 7 |
| 11 | Implement Session Management | o pending | medium | 7 |
| 12 | Create Developer Documentation | o pending | medium | 8,9 |
| 13 | Build Example Applications | o pending | low | 12 |
| 14 | Setup Testing Framework | o pending | medium | 5 |
| 15 | Add CI/CD Pipeline | o pending | low | 14 |
| 16 | Package & Publish | o pending | low | 15 |

## 🏗️ Architecture Design

### Package Structure
```
chat-widget/
├── src/
│   ├── components/
│   │   ├── OrdifyChat.tsx          # Main chat component
│   │   ├── Message.tsx             # Message display
│   │   ├── Input.tsx               # Message input
│   │   └── LoadingSpinner.tsx      # Loading states
│   ├── hooks/
│   │   ├── useOrdifyChat.ts        # Main chat logic
│   │   └── useOrdifyConfig.ts      # Configuration management
│   ├── types/
│   │   └── index.ts                # TypeScript definitions
│   ├── utils/
│   │   ├── api.ts                  # API client
│   │   └── streaming.ts            # Streaming utilities
│   └── styles/
│       └── index.css                # Default styles
├── examples/
│   ├── react-basic/                # Basic React example
│   ├── nextjs/                     # Next.js example
│   └── vanilla-js/                 # Vanilla JS example
├── docs/
│   ├── DEVELOPMENT_PLAN.md          # This file
│   ├── API_REFERENCE.md            # API documentation
│   └── EXAMPLES.md                 # Usage examples
├── dist/                           # Built package
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### Core Components

#### 1. OrdifyChat (Main Component)
```typescript
interface OrdifyChatProps {
  agentId: string
  apiKey: string
  apiBaseUrl?: string
  mode?: 'floating' | 'embedded' | 'inline' | 'modal'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  theme?: 'light' | 'dark'
  placeholder?: string
  height?: string | number
  className?: string
  buttonStyle?: CSSProperties
  chatWindowStyle?: CSSProperties
  showHeader?: boolean
  onMessage?: (message: Message) => void
  onError?: (error: Error) => void
  onClose?: () => void
}
```

#### 2. useOrdifyChat Hook
```typescript
interface UseOrdifyChatReturn {
  messages: Message[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}
```

#### 3. API Client
```typescript
class OrdifyApiClient {
  constructor(config: OrdifyConfig)
  async sendMessage(content: string, sessionId?: string): Promise<ReadableStream>
  async createSession(): Promise<Session>
  async getAgents(): Promise<Agent[]>
}
```

## 🎯 Integration Patterns & Use Cases

### **Floating Button Chat** (Most Popular)
- **Perfect for:** Landing pages, marketing sites, e-commerce
- **Features:** Floating button in corner, popup chat window
- **Example:** Customer support on your main website
- **Implementation:** `<OrdifyChat mode="floating" position="bottom-right" />`

### **Embedded Chat Interface**
- **Perfect for:** Dedicated chat pages, support portals
- **Features:** Full-page chat interface
- **Example:** `/support/chat` page with full chat experience
- **Implementation:** `<OrdifyChat mode="embedded" className="flex-1" />`

### **Inline Chat Widget**
- **Perfect for:** Sidebars, dashboards, documentation
- **Features:** Chat widget that fits in content areas
- **Example:** Help widget in documentation sidebar
- **Implementation:** `<OrdifyChat mode="inline" className="h-[600px]" />`

### **Modal Chat**
- **Perfect for:** Triggered interactions, forms
- **Features:** Modal overlay chat
- **Example:** "Need help?" button that opens chat modal
- **Implementation:** `<OrdifyChat mode="modal" onClose={handleClose} />`

### **Real-World Examples**
- **Customer Support** - Floating button on landing page
- **Documentation** - Inline widget in help sidebar
- **E-commerce** - Product recommendation chat
- **Education** - Interactive learning experiences
- **Internal Tools** - AI assistants for your team

## 🚀 Implementation Phases

### Phase 1: Foundation (Tasks 1-4)
**Goal:** Setup project structure and core infrastructure

**Deliverables:**
- Project scaffolding with TypeScript
- Build system configuration (Vite)
- TypeScript definitions for all interfaces
- Basic API client for `/chat/agents` endpoint

**Success Criteria:**
- Project builds successfully
- TypeScript compilation passes
- API client can connect to Ordify backend
- Basic streaming response handling works

### Phase 2: Core Components (Tasks 5-7)
**Goal:** Build the main chat interface components

**Deliverables:**
- OrdifyChat main component
- Message display component
- Input component with send functionality
- Integration with shadcn/ui conversation component
- Streaming message handling

**Success Criteria:**
- Chat interface renders correctly
- Messages display properly
- User can send messages
- Streaming responses work smoothly
- Auto-scroll behavior functions

### Phase 3: Configuration & Styling (Tasks 8-9)
**Goal:** Make the widget configurable and visually appealing

**Deliverables:**
- Configuration system with props and environment variables
- Light/dark theme support
- Customizable styling via CSS variables
- Responsive design for mobile/desktop

**Success Criteria:**
- Easy configuration via props
- Themes work correctly
- Custom styling is possible
- Mobile responsive design

### Phase 4: Robustness & Documentation (Tasks 10-12)
**Goal:** Make the widget production-ready

**Deliverables:**
- Comprehensive error handling
- Session management
- Developer documentation
- API reference
- Usage examples

**Success Criteria:**
- Graceful error handling
- Session persistence works
- Documentation is complete
- Examples are working

### Phase 5: Testing & Distribution (Tasks 13-16)
**Goal:** Package and distribute the widget

**Deliverables:**
- Example applications
- Testing framework
- CI/CD pipeline
- NPM package publication

**Success Criteria:**
- Examples work in different frameworks
- Tests pass
- CI/CD pipeline works
- Package is published to NPM

## 🛠️ Technical Specifications

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@radix-ui/react-slot": "^1.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "use-stick-to-bottom": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

### Build Configuration
- **Bundler:** Vite
- **TypeScript:** Strict mode enabled
- **CSS:** Tailwind CSS with PostCSS
- **Output:** ES modules + CommonJS
- **Tree-shaking:** Enabled

### API Integration
- **Endpoint:** `POST /chat/agents/{agent_id}`
- **Authentication:** API key via header
- **Response:** Server-sent events (SSE)
- **Session Management:** Auto-create or custom session ID

## 📦 Distribution Strategy

### NPM Package
```bash
npm install @ordify/chat-widget
```

### GitHub Installation
```bash
npm install ordify-ai/chat-widget
```

### CDN Distribution
```html
<script src="https://unpkg.com/@ordify/chat-widget@latest/dist/global.js"></script>
```

## 🎨 Design System

### Color Scheme
- **Primary:** Ordify brand colors
- **Light Theme:** White background, dark text
- **Dark Theme:** Dark background, light text
- **Accent:** Blue for user messages, green for agent messages

### Typography
- **Font Family:** System fonts (Inter, -apple-system, BlinkMacSystemFont)
- **Font Sizes:** Responsive scaling
- **Line Height:** 1.5 for readability

### Spacing
- **Padding:** 16px standard, 8px compact
- **Margins:** 8px, 16px, 24px scale
- **Border Radius:** 8px for messages, 4px for inputs

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Hook functionality
- API client methods
- Utility functions

### Integration Tests
- End-to-end chat flow
- Streaming response handling
- Error scenarios
- Configuration validation

### Browser Testing
- Chrome, Firefox, Safari
- Mobile browsers
- Different screen sizes

## 📚 Documentation Plan

### README.md
- Quick start guide
- Installation instructions
- Basic usage examples
- Configuration options
- Troubleshooting

### API Reference
- Component props
- Hook return values
- TypeScript interfaces
- Event callbacks

### Examples
- Basic React integration
- Next.js setup
- Vanilla JavaScript
- Custom styling
- Error handling

## 🚀 Success Metrics

### Developer Experience
- **Setup Time:** < 5 minutes from install to working chat
- **Bundle Size:** < 50KB gzipped
- **TypeScript Support:** 100% type coverage
- **Documentation:** Complete API reference

### User Experience
- **Load Time:** < 2 seconds initial render
- **Message Latency:** < 500ms for streaming start
- **Mobile Support:** Responsive on all screen sizes
- **Accessibility:** WCAG 2.1 AA compliance

### Technical Quality
- **Test Coverage:** > 80%
- **Build Success:** 100% CI/CD pass rate
- **Browser Support:** Modern browsers (last 2 versions)
- **Performance:** No memory leaks, smooth scrolling

## 🔄 Maintenance Plan

### Versioning
- **Semantic Versioning:** Major.Minor.Patch
- **Breaking Changes:** Major version bumps
- **Feature Additions:** Minor version bumps
- **Bug Fixes:** Patch version bumps

### Updates
- **Security Updates:** Immediate patches
- **Feature Updates:** Monthly releases
- **Breaking Changes:** Quarterly with migration guides
- **Deprecation:** 6-month notice period

---

## 📝 Next Steps

1. **Start with Task 1:** Setup project structure
2. **Create initial commit** with basic scaffolding
3. **Setup development environment** with hot reload
4. **Begin API client implementation** with streaming support
5. **Iterate quickly** with working prototypes

This plan provides a clear roadmap for building a production-ready chat widget that developers will love to use!
