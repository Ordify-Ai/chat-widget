#!/bin/bash

# Ordify Chat Widget - React Example Setup
echo "🚀 Setting up Ordify Chat Widget React Example..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the examples/react-basic directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "🔧 Creating .env file..."
    cat > .env << EOF
# Ordify Configuration
VITE_ORDIFY_AGENT_ID=your-agent-id
VITE_ORDIFY_API_KEY=your-api-key
VITE_ORDIFY_API_BASE_URL=https://api.ordify.ai
EOF
    echo "✅ Created .env file. Please update it with your Ordify credentials."
fi

# Start development server
echo "🎉 Setup complete! Starting development server..."
echo "📝 Don't forget to update your .env file with your actual Ordify credentials."
echo "🌐 The example will be available at http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server when you're done testing."

npm run dev
