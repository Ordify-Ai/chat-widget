'use client'

import dynamic from 'next/dynamic'

// Dynamically import the chat widget to avoid SSR issues
const OrdifyChat = dynamic(() => import('../../../dist/index.esm.js').then(mod => ({ default: mod.OrdifyChat })), {
  ssr: false,
  loading: () => <div className="p-4 text-center text-gray-500">Loading chat widget...</div>
})

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ordify Chat Widget Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Experience our professional AI chat components with multiple integration modes,
            real-time streaming, and customizable themes.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-800 text-sm">
              <strong>💡 Tip:</strong> Look for the blue "AI Chat" button in the bottom-right corner of this page to test the floating chat widget!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Embedded Chat Example */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Embedded Chat</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A full-page chat interface embedded directly in your content.
              Ideal for dedicated support pages and documentation.
            </p>
            <div className="h-96 border border-gray-200 rounded-lg overflow-hidden">
              <OrdifyChat
                agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
                apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
                apiBaseUrl={process.env.NEXT_PUBLIC_ORDIFY_API_BASE_URL || "http://localhost:5001"}
                mode="embedded"
                height="100%"
                chatName="Support Assistant"
                primaryColor="#10b981"
                placeholder="How can I help you today?"
              />
            </div>
          </div>

          {/* Inline Chat Example */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Inline Chat</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A compact chat widget that fits seamlessly inline with your content.
              Great for product pages and FAQ sections.
            </p>
            <div className="h-64 border border-gray-200 rounded-lg overflow-hidden">
              <OrdifyChat
                agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
                apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
                apiBaseUrl={process.env.NEXT_PUBLIC_ORDIFY_API_BASE_URL || "http://localhost:5001"}
                mode="inline"
                height="100%"
                chatName="Product Assistant"
                primaryColor="#8b5cf6"
                placeholder="Ask about our products..."
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customizable</h4>
              <p className="text-gray-600 text-sm">Colors, themes, and styling options</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time</h4>
              <p className="text-gray-600 text-sm">Streaming responses with auto-scroll</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Responsive</h4>
              <p className="text-gray-600 text-sm">Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global floating chat button for the entire page */}
      <OrdifyChat
        agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
        apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
        apiBaseUrl={process.env.NEXT_PUBLIC_ORDIFY_API_BASE_URL || "http://localhost:5001"}
        mode="floating"
        position="bottom-right"
        buttonText="AI Chat"
        chatName="Ordify Assistant"
      />
    </div>
  )
}