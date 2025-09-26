# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.20] - 2025-01-27

### Fixed
- **BREAKING**: Moved `styled-components` from dependencies to peerDependencies to prevent React context conflicts
- Fixed `ReactCurrentOwner` error that occurred when multiple styled-components instances were present
- Added `@types/styled-components` and `babel-plugin-styled-components` to devDependencies for development

### Changed
- Applications using this widget must now install `styled-components` as a direct dependency
- This ensures only one styled-components instance exists, preventing React context conflicts

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
