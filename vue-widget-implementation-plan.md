# Vue Widget Implementation Plan

## Overview

This document outlines the implementation plan for creating Vue 2 and Vue 3 versions of the Ordify Chat Widget. The plan prioritizes Vue 2 first to support existing customers, followed by Vue 3 for future compatibility.

## Project Structure

```
ordify-chat-widget/
├── src/                    # React version (existing)
├── vue2/                   # Vue 2 version (new)
│   ├── src/
│   │   ├── components/
│   │   ├── mixins/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── webpack.config.js
│   ├── tsconfig.json
│   └── README.md
├── vue3/                   # Vue 3 version (future)
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
├── package.json            # Root package.json
└── README.md
```

## Task Management

### Phase 1: Vue 2 Implementation

| ID | Task | Status | Priority | Dependencies | Testing Requirements |
|----|------|--------|----------|--------------|---------------------|
| 1 | Create vue2 folder structure | ✓ completed | high | None | Verify folder structure exists |
| 2 | Set up Vue 2 package.json | ✓ completed | high | 1 | Verify package.json has correct dependencies |
| 3 | Configure Vite build | ✓ completed | high | 2 | Verify build process works |
| 4 | Set up TypeScript config | ✓ completed | medium | 2 | Verify TypeScript compilation |
| 5 | Create base component structure | ✓ completed | high | 1 | Verify all component files exist |
| 6 | Implement OrdifyChat.vue | ✓ completed | high | 5 | Test component renders correctly |
| 7 | Implement FloatingChat.vue | ✓ completed | high | 6 | Test floating chat functionality |
| 8 | Implement EmbeddedChat.vue | ✓ completed | high | 6 | Test embedded chat functionality |
| 9 | Implement ChatHeader.vue | ✓ completed | medium | 5 | Test header displays correctly |
| 10 | Implement ChatMessages.vue | ✓ completed | medium | 5 | Test message rendering |
| 11 | Implement ChatInput.vue | ✓ completed | medium | 5 | Test input functionality |
| 12 | Create useOrdifyChat mixin | ✓ completed | high | 5 | Test mixin functionality |
| 13 | Implement API client | ✓ completed | high | 5 | Test API calls work |
| 14 | Add session management | ✓ completed | high | 12, 13 | Test onSessionCreated callback |
| 15 | Add initial message support | ✓ completed | high | 12, 13 | Test initial message auto-send |
| 16 | Add error handling | ✓ completed | medium | 12, 13 | Test error states |
| 17 | Add loading states | ✓ completed | medium | 12, 13 | Test loading indicators |
| 18 | Update root package.json scripts | ✓ completed | high | 3 | Test build scripts work |
| 19 | Create Vue 2 documentation | pending | medium | 17 | Verify documentation is complete |
| 20 | Test Vue 2 package locally | ✓ completed | high | 17 | Test all features work |
| 21 | Verify React package unaffected | ✓ completed | high | 18 | Test React package still works |
| 22 | Publish Vue 2 to npm | pending | high | 20, 21 | Verify package is published |

### Phase 2: Vue 3 Implementation

| ID | Task | Status | Priority | Dependencies | Testing Requirements |
|----|------|--------|----------|--------------|---------------------|
| 23 | Create vue3 folder structure | pending | high | 22 | Verify folder structure exists |
| 24 | Set up Vue 3 package.json | pending | high | 23 | Verify package.json has correct dependencies |
| 25 | Configure Vite build | pending | high | 24 | Verify build process works |
| 26 | Set up TypeScript config | pending | medium | 24 | Verify TypeScript compilation |
| 27 | Create base component structure | pending | high | 23 | Verify all component files exist |
| 28 | Implement OrdifyChat.vue (Composition API) | pending | high | 27 | Test component renders correctly |
| 29 | Implement FloatingChat.vue | pending | high | 28 | Test floating chat functionality |
| 30 | Implement EmbeddedChat.vue | pending | high | 28 | Test embedded chat functionality |
| 31 | Implement ChatHeader.vue | pending | medium | 27 | Test header displays correctly |
| 32 | Implement ChatMessages.vue | pending | medium | 27 | Test message rendering |
| 33 | Implement ChatInput.vue | pending | medium | 27 | Test input functionality |
| 34 | Create useOrdifyChat composable | pending | high | 27 | Test composable functionality |
| 35 | Implement API client | pending | high | 27 | Test API calls work |
| 36 | Add session management | pending | high | 34, 35 | Test onSessionCreated callback |
| 37 | Add initial message support | pending | high | 34, 35 | Test initial message auto-send |
| 38 | Add error handling | pending | medium | 34, 35 | Test error states |
| 39 | Add loading states | pending | medium | 34, 35 | Test loading indicators |
| 40 | Update root package.json scripts | pending | high | 25 | Test build scripts work |
| 41 | Create Vue 3 documentation | pending | medium | 39 | Verify documentation is complete |
| 42 | Test Vue 3 package locally | pending | high | 39 | Test all features work |
| 43 | Verify other packages unaffected | pending | high | 40 | Test React and Vue 2 packages still work |
| 44 | Publish Vue 3 to npm | pending | high | 42, 43 | Verify package is published |

## Testing Strategy

### Unit Testing
- Test individual components in isolation
- Test mixins/composables functionality
- Test API client methods
- Test utility functions

### Integration Testing
- Test component interactions
- Test session management flow
- Test initial message functionality
- Test error handling scenarios

### End-to-End Testing
- Test complete chat flow
- Test floating chat mode
- Test embedded chat mode
- Test session creation and management

### Cross-Package Testing
- Verify React package unaffected
- Verify Vue 2 package works independently
- Verify Vue 3 package works independently
- Test build processes for all packages

## Success Criteria

### Vue 2 Package
- [ ] All React features implemented
- [ ] Session management working (`onSessionCreated` callback)
- [ ] Initial message support
- [ ] Floating and embedded chat modes
- [ ] Error handling and loading states
- [ ] Build process working
- [ ] Published to npm as `ordify-chat-widget-vue2`
- [ ] Documentation complete
- [ ] All tests passing

### Vue 3 Package
- [ ] All Vue 2 features implemented
- [ ] Composition API used throughout
- [ ] TypeScript support
- [ ] Session management working
- [ ] Initial message support
- [ ] Floating and embedded chat modes
- [ ] Error handling and loading states
- [ ] Build process working
- [ ] Published to npm as `ordify-chat-widget-vue3`
- [ ] Documentation complete
- [ ] All tests passing

### Overall Project
- [ ] Existing React package unaffected
- [ ] All packages work independently
- [ ] Clear documentation for each package
- [ ] Consistent API across packages
- [ ] Build scripts work for all packages
- [ ] No breaking changes to existing functionality

## Implementation Details

### Vue 2 Package Structure
```
vue2/
├── src/
│   ├── components/
│   │   ├── OrdifyChat.vue
│   │   ├── FloatingChat.vue
│   │   ├── EmbeddedChat.vue
│   │   ├── ChatHeader.vue
│   │   ├── ChatMessages.vue
│   │   └── ChatInput.vue
│   ├── mixins/
│   │   └── useOrdifyChat.js
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── api.ts
│   └── index.js
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Vue 3 Package Structure
```
vue3/
├── src/
│   ├── components/
│   │   ├── OrdifyChat.vue
│   │   ├── FloatingChat.vue
│   │   ├── EmbeddedChat.vue
│   │   ├── ChatHeader.vue
│   │   ├── ChatMessages.vue
│   │   └── ChatInput.vue
│   ├── composables/
│   │   └── useOrdifyChat.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── api.ts
│   └── index.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Package Names
- React: `ordify-chat-widget` (existing)
- Vue 2: `ordify-chat-widget-vue2`
- Vue 3: `ordify-chat-widget-vue3`

### Root Package.json Scripts
```json
{
  "scripts": {
    "build": "npm run build:react && npm run build:vue2 && npm run build:vue3",
    "build:react": "cd . && npm run build",
    "build:vue2": "cd vue2 && npm run build",
    "build:vue3": "cd vue3 && npm run build",
    "publish:react": "npm publish",
    "publish:vue2": "cd vue2 && npm publish",
    "publish:vue3": "cd vue3 && npm publish",
    "test:all": "npm run test:react && npm run test:vue2 && npm run test:vue3",
    "test:react": "cd . && npm test",
    "test:vue2": "cd vue2 && npm test",
    "test:vue3": "cd vue3 && npm test"
  }
}
```

## Risk Mitigation

### Technical Risks
- **Vue 2/3 compatibility**: Use separate packages to avoid conflicts
- **Build process complexity**: Use Vite for both Vue 2 and Vue 3 for consistency
- **TypeScript support**: Configure TypeScript appropriately for each Vue version

### Project Risks
- **Feature parity**: Ensure all React features are implemented in Vue versions
- **Breaking changes**: Test thoroughly to ensure existing React package is unaffected
- **Documentation**: Maintain clear documentation for each package

### Testing Risks
- **Incomplete testing**: Implement comprehensive testing strategy
- **Cross-package issues**: Test all packages independently and together
- **Build failures**: Test build processes for all packages

## Next Steps

1. Review and approve this plan
2. Begin Phase 1: Vue 2 Implementation
3. Start with Task 1: Create vue2 folder structure
4. Follow the task management table for implementation order
5. Complete testing requirements for each task
6. Move to Phase 2: Vue 3 Implementation after Vue 2 is complete

## Notes

- This plan prioritizes Vue 2 first to support existing customers
- Vue 3 implementation will follow after Vue 2 is complete and tested
- All packages will be published to npm with clear naming conventions
- Documentation will be maintained for each package
- Testing is integrated throughout the implementation process
