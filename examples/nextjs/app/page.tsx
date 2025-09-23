'use client'

import { OrdifyChat } from '../../../dist/index.esm.js'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Ordify Chat Widget - Next.js Example
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Floating Chat Example */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Floating Chat</h2>
            <p className="text-gray-600 mb-4">
              A floating chat button that opens a chat window in the corner.
            </p>
            <OrdifyChat
              agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
              apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
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
                agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
                apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
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
                agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
                apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
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
              agentId={process.env.NEXT_PUBLIC_ORDIFY_AGENT_ID!}
              apiKey={process.env.NEXT_PUBLIC_ORDIFY_API_KEY!}
              mode="modal"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
