#!/bin/bash

# Ordify Chat Widget - Main Setup
echo "🚀 Ordify Chat Widget Setup"
echo "=========================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the chat-widget root directory"
    exit 1
fi

echo "📦 Installing main dependencies..."
npm install

echo "🔨 Building the library..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Available examples:"
echo "  • Test Page: open examples/test-page.html"
echo "  • React: cd examples/react-basic && ./setup.sh"
echo "  • Next.js: cd examples/nextjs && ./setup.sh"
echo "  • Vanilla JS: open examples/vanilla-js/index.html"
echo ""
echo "📚 Documentation:"
echo "  • README.md - Main documentation"
echo "  • docs/QUICK_START.md - Detailed setup guide"
echo ""
echo "🔧 Development commands:"
echo "  • npm run dev - Start development server"
echo "  • npm run build - Build the library"
echo "  • npm run lint - Check code quality"
echo "  • npm run type-check - Check TypeScript types"
echo ""
echo "Happy coding! 🎯"
