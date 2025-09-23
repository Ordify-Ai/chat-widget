import { OrdifyChat } from '../../dist/index.esm.js'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ordify Chat Widget Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Floating Chat Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Floating Chat</h2>
            <p className="text-gray-600 mb-4">
              A floating chat button that opens a chat window in the corner.
            </p>
            <OrdifyChat
              agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
              apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
              apiBaseUrl="http://localhost:5001"
              mode="floating"
              position="bottom-right"
            />
          </div>

          {/* Embedded Chat Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Embedded Chat</h2>
            <p className="text-gray-600 mb-4">
              A full-page chat interface embedded in your content.
            </p>
            <div className="h-96">
              <OrdifyChat
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
                mode="embedded"
                height="100%"
              />
            </div>
          </div>

          {/* Inline Chat Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Inline Chat</h2>
            <p className="text-gray-600 mb-4">
              A chat widget that fits inline with your content.
            </p>
            <div className="h-64">
              <OrdifyChat
                agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
                apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
                apiBaseUrl="http://localhost:5001"
                mode="inline"
                height="100%"
              />
            </div>
          </div>

          {/* Modal Chat Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Modal Chat</h2>
            <p className="text-gray-600 mb-4">
              A chat interface that opens in a modal overlay.
            </p>
            <OrdifyChat
              agentId="3b947bd2-a24b-4e0f-8f1a-d65054b9ff49"
              apiKey="CiQAw4W/13FiyduPEbLPo/mq+FTbrv2HGUZIF0cTHxH9tMn3/xwSVABz4cb0CCn3qJ8FJLR5fO6U1qeTf+2105u8bhSJHhTe0HnzfersLyHjPJHhEirogMp6HToFGGuSqqK5RCcFNewo6WUllKStliVNJUlBQUPoAvz0gg=="
              apiBaseUrl="http://localhost:5001"
              mode="modal"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
