# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.28] - 2024-12-19

### Added
- **System Context Support**: New `initialContext` prop allows sending hidden system information to AI agents
- **GitHub Packages Integration**: Package now publishes to both NPM and GitHub Packages automatically
- **Automated Publishing**: GitHub Actions workflow for seamless publishing on main branch merges
- **Enhanced Documentation**: Updated README with GitHub Packages setup instructions

### Changed
- Package name updated to `@ordify-ai/chat-widget` for GitHub Packages compatibility
- Improved auto-scroll behavior with better conversation component structure
- Enhanced floating button positioning with proper prop support

### Technical
- Added `.npmrc` configuration for GitHub Packages registry
- Created GitHub Actions workflow for dual-registry publishing
- Updated package.json with proper scoped naming and publishConfig

## [1.0.0] - 2024-01-16

### Added
- Initial release of Ordify Chat Widget
- Support for multiple chat modes: floating, embedded, inline, and modal
- TypeScript support with full type definitions
- Real-time streaming responses from Ordify AI agents
- Markdown rendering for AI responses
- Theme-aware styling (light/dark mode)
- Resizable chat windows
- Professional input component with auto-resize
- Configuration file support for easy customization
- Multiple positioning options for floating chat
- Auto-scroll functionality for conversations
- Professional styling with Tailwind CSS and shadcn/ui components

### Features
- **Floating Chat**: Bottom-right corner chat button with resizable window
- **Embedded Chat**: Full-page chat interface for dedicated chat pages
- **Inline Chat**: Compact chat widget for content pages
- **Modal Chat**: Overlay chat interface for focused conversations
- **Customizable**: Colors, themes, positioning, and styling options
- **Responsive**: Works on desktop and mobile devices
- **Professional UI**: Clean, modern design with smooth animations

### Technical Details
- Built with React 18+ and TypeScript
- Uses Vite for fast development and building
- Integrates with Ordify API endpoints
- Supports streaming responses
- Includes comprehensive examples and documentation
