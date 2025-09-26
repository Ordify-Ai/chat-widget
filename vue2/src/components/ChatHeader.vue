<template>
  <ChatHeader :primaryColor="primaryColor">
    <div class="header-content">
      <div class="font-medium">{{ chatName || 'Chat Assistant' }}</div>
    </div>
    <div class="header-actions">
      <button
        @click="$emit('close')"
        class="hover:bg-white/10 p-1 rounded"
        aria-label="Close chat"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </ChatHeader>
</template>

<script>
import { ChatHeader } from './styled/ChatComponents'

export default {
  name: 'ChatHeader',
  components: {
    ChatHeader,
  },
  props: {
    chatName: {
      type: String,
      default: 'Chat Assistant',
    },
    primaryColor: {
      type: String,
      default: '#3b82f6',
    },
  },
}
</script>
