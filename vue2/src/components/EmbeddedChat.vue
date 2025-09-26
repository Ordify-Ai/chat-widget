<template>
  <div
    class="embedded-chat"
    :style="{
      height: height,
      width: width,
      ...chatWindowStyle,
    }"
  >
    <!-- Chat header -->
    <ChatHeader
      v-if="showHeader !== false"
      :chatName="chatName"
      :primaryColor="primaryColor"
      @close="$emit('close')"
    />

    <!-- Chat messages -->
    <ChatMessages :messages="messages" :isLoading="isLoading" :error="error" />

    <!-- Chat input -->
    <ChatInput
      :placeholder="placeholder"
      :isLoading="isLoading"
      @send="sendMessage"
    />
  </div>
</template>

<script>
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'

export default {
  name: 'EmbeddedChat',
  components: {
    ChatHeader,
    ChatMessages,
    ChatInput,
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
    chat: {
      type: Object,
      required: true,
    },
  },
  computed: {
    messages() {
      return this.chat.messages || []
    },
    isLoading() {
      return this.chat.isLoading || false
    },
    error() {
      return this.chat.error
    },
    chatName() {
      return this.config.chatName
    },
    primaryColor() {
      return this.config.primaryColor
    },
    showHeader() {
      return this.config.showHeader
    },
    placeholder() {
      return this.config.placeholder
    },
    height() {
      return this.config.height || '400px'
    },
    width() {
      return this.config.width || '100%'
    },
    chatWindowStyle() {
      return this.config.chatWindowStyle
    },
  },
  methods: {
    sendMessage(content) {
      this.chat.sendMessage(content)
    },
  },
}
</script>

<style scoped>
.embedded-chat {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .embedded-chat {
    background: #1f2937;
    border-color: #374151;
  }
}
</style>
