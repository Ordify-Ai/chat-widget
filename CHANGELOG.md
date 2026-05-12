# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Generated images in the widget**: ADK `image` SSE events are no longer dropped during streaming (they appear as markdown images in the assistant bubble). Assistant messages with image **attachments** from history now render inline images plus non-image attachment chips.
- **Empty assistant bubbles on tool-heavy turns**: SSE `adk_tool` events with a `content` string are now folded into the streamed assistant text so status lines (e.g. tool progress) still appear when the model does not emit a separate text chunk.

### Added
- **`enableImageGeneration` on `OrdifyConfig`**: for publishable-key chat, the widget sends **`enable_image_generation: true` or `false`** on every request. The API allows the image tool only when **`true`**. Standalone: `data-ordify-enable-image-generation="true"` / `"false"`.

### Changed
- **Breaking (publishable keys):** image generation is no longer configured on publishable keys in the Ordify app or API. Control it only via **`enableImageGeneration`** / **`enable_image_generation`** on the embed.

### Notes
- **Backend**: `POST /widget/chat/...` sets widget image permission from **`enable_image_generation`** on the request body only (default **`false`** when omitted by non-widget clients; the official widget always sends an explicit boolean).

## [1.0.45] - 2026-05-04

### Added
- **Widget attachments**: Optional `enableAttachments`, `maxAttachmentSizeMB`, `maxAttachments`, and `allowedAttachmentTypes` on `OrdifyConfig`. When enabled with a **publishable key**, users can attach documents and images (paperclip + drag/drop). Files upload to `POST /widget/attachments` and are sent as `attachments` on chat.
- **`uploadAttachment` on `useOrdifyChat`**: Programmatic upload using the same auth as the widget.
- **`Message.attachments`**: User bubbles can show attachment chips; history hydration maps server `attachments` when present.

### Notes
- Embeds using **API key only** cannot use widget upload (picker stays off); use a publishable key for browser uploads.
- Configure a GCS lifecycle rule on the `widget_attachments/` prefix in your bucket for retention (ops).

## [1.0.27] - 2024-12-19

### Added
- **System Context Support**: New `initialContext` prop allows sending hidden system information to AI agents
- **GitHub Packages Mirror**: Package now automatically mirrors to GitHub Packages after NPM publishing
- **Automated Publishing**: GitHub Actions workflow for seamless publishing on main branch merges
- **Enhanced Documentation**: Updated README with proper registry usage instructions

### Changed
- Package name updated to `@ordify-ai/chat-widget` for GitHub Packages compatibility
- Improved auto-scroll behavior with better conversation component structure
- Enhanced floating button positioning with proper prop support

### Technical
- Added `.npmrc` configuration for GitHub Packages registry
- Created GitHub Actions workflow for NPM-first publishing with GitHub Packages mirroring
- Updated package.json with proper scoped naming and publishConfig
- **NPM remains the single source of truth** for versioning

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
