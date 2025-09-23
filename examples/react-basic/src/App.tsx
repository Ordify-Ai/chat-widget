import { OrdifyChat } from '../../dist/index.esm.js'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ordify Chat Widget Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our professional AI chat components with multiple integration modes, 
            real-time streaming, and customizable themes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Floating Chat Example */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Floating Chat</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A professional floating chat button that opens a resizable chat window in the corner. 
              Perfect for customer support and sales inquiries.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-500 text-center mb-4">Click the chat button to test</p>
              <OrdifyChat
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
                mode="floating"
                position="bottom-right"
                chatName="Ordify Assistant"
                buttonText="AI Chat"
                primaryColor="#3b82f6"
                resizable={true}
                placeholder="Ask about our AI automation solutions..."
              />
            </div>
          </div>

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
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
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
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
                mode="inline"
                height="100%"
                chatName="Product Assistant"
                primaryColor="#8b5cf6"
                placeholder="Ask about our products..."
              />
            </div>
          </div>

          {/* Modal Chat Example */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Modal Chat</h2>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              A chat interface that opens in a modal overlay. 
              Perfect for focused conversations without leaving the current page.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-sm text-gray-500 text-center mb-4">Click to open modal chat</p>
              <OrdifyChat
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
                mode="modal"
                chatName="Consultation Assistant"
                primaryColor="#f59e0b"
                placeholder="Let's discuss your needs..."
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
    </div>
  )
}

export default App
