<template>
  <div>
    <!-- Floating Button -->
    <FloatingButton
      v-if="!isOpen"
      @click="setIsOpen(true)"
      :style="buttonStyle"
      aria-label="Open chat"
    >
      <div class="icon-container">
        <MessageSquare :size="16" />
      </div>
      <span>
        {{ buttonText || chatName || 'AI Chat' }}
      </span>
    </FloatingButton>

    <!-- Chat Window -->
    <ChatWindow
      v-else
      :$position="position || 'bottom-right'"
      :style="{
        height: chatHeight,
        ...chatWindowStyle,
      }"
    >
      <!-- Resize handle at top -->
      <ResizeHandle
        v-if="resizable !== false"
        $position="top"
        @mousedown="handleResizeStart"
      />

      <!-- Chat header -->
      <ChatHeader
        v-if="showHeader !== false"
        :chatName="chatName"
        :primaryColor="primaryColor"
        @close="setIsOpen(false)"
      />

      <!-- Chat messages -->
      <ChatMessages
        :messages="messages"
        :isLoading="isLoading"
        :error="error"
      />

      <!-- Chat input -->
      <ChatInput
        :placeholder="placeholder"
        :isLoading="isLoading"
        @send="sendMessage"
      />
    </ChatWindow>
  </div>
</template>

<script>
import {
  FloatingButton,
  ChatWindow,
  ResizeHandle,
} from './styled/ChatComponents'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import { MessageSquare } from 'lucide-vue'

export default {
  name: 'FloatingChat',
  components: {
    FloatingButton,
    ChatWindow,
    ResizeHandle,
    ChatHeader,
    ChatMessages,
    ChatInput,
    MessageSquare,
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
  data() {
    return {
      chatHeight: this.config.height || 400,
    }
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
    isOpen() {
      return this.chat.isOpen || false
    },
    chatName() {
      return this.config.chatName
    },
    primaryColor() {
      return this.config.primaryColor
    },
    position() {
      return this.config.position
    },
    resizable() {
      return this.config.resizable
    },
    showHeader() {
      return this.config.showHeader
    },
    placeholder() {
      return this.config.placeholder
    },
    buttonText() {
      return this.config.buttonText
    },
    buttonStyle() {
      return this.config.buttonStyle
    },
    chatWindowStyle() {
      return this.config.chatWindowStyle
    },
  },
  methods: {
    sendMessage(content) {
      this.chat.sendMessage(content)
    },

    setIsOpen(open) {
      this.chat.setIsOpen(open)
    },

    handleResizeStart(e) {
      e.preventDefault()
      const startY = e.clientY
      const startHeight =
        typeof this.chatHeight === 'number' ? this.chatHeight : 400

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY
        const newHeight = startHeight - deltaY
        this.chatHeight = Math.max(200, Math.min(600, newHeight))
      }

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
  },
}
</script>
