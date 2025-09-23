#!/bin/bash

# Ordify Chat Widget - Next.js Example Setup
echo "🚀 Setting up Ordify Chat Widget Next.js Example..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the examples/nextjs directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << EOF
# Ordify Configuration
NEXT_PUBLIC_ORDIFY_AGENT_ID=your-agent-id
NEXT_PUBLIC_ORDIFY_API_KEY=your-api-key
NEXT_PUBLIC_ORDIFY_API_BASE_URL=https://api.ordify.ai
EOF
    echo "✅ Created .env.local file. Please update it with your Ordify credentials."
fi

# Start development server
echo "🎉 Setup complete! Starting development server..."
echo "📝 Don't forget to update your .env.local file with your actual Ordify credentials."
echo "🌐 The example will be available at http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server when you're done testing."

npm run dev
