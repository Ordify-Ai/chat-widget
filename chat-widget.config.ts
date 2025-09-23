// chat-widget.config.ts
// Simple configuration file for Ordify Chat Widget
// Copy this file and customize it for your needs

export const chatConfig = {
  // Required settings
  agentId: "3b947bd2-a24b-4e0f-8f1a-d65054b9ff49",
  apiKey: "your-api-key-here",
  apiBaseUrl: "http://localhost:5001", // or "https://api.ordify.ai" for production
  
  // Chat appearance
  chatName: "Ordify Assistant",
  buttonText: "AI Chat",
  placeholder: "Ask about our AI automation solutions...",
  
  // Visual customization
  primaryColor: "#3b82f6", // Custom header color (optional - leave empty for theme-aware)
  glassEffect: true, // Enable glassmorphism effect
  darkMode: false, // Force dark/light mode (only when glassEffect is true)
  
  // Layout options
  mode: "floating", // "floating" | "embedded" | "inline" | "modal"
  position: "bottom-right", // "bottom-right" | "bottom-left" | "top-right" | "top-left"
  resizable: true, // Allow users to resize chat window
  
  // Advanced options
  showHeader: true, // Show/hide the chat header
  height: 400, // Initial height in pixels
  width: "320px", // Width (can be px, %, or auto)
}

// Usage example:
// import { chatConfig } from './chat-widget.config'
// import { OrdifyChat } from '@ordify/chat-widget'
// 
// function App() {
//   return <OrdifyChat {...chatConfig} />
// }
