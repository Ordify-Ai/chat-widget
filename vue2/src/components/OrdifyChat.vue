<template>
  <FloatingChat
    v-if="config.mode === 'floating'"
    :config="config"
    :chat="{
      messages: messages,
      isLoading: isLoading,
      error: error,
      isOpen: isOpen,
      sendMessage: sendMessage,
      setIsOpen: setIsOpen,
    }"
  />
  <EmbeddedChat
    v-else
    :config="config"
    :chat="{
      messages: messages,
      isLoading: isLoading,
      error: error,
      isOpen: isOpen,
      sendMessage: sendMessage,
      setIsOpen: setIsOpen,
    }"
    @close="handleClose"
  />
</template>

<script>
import { useOrdifyChat } from '@/mixins/useOrdifyChat'
import FloatingChat from './FloatingChat.vue'
import EmbeddedChat from './EmbeddedChat.vue'

export default {
  name: 'OrdifyChat',
  components: {
    FloatingChat,
    EmbeddedChat,
  },
  mixins: [useOrdifyChat],
  props: {
    agentId: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      default: 'https://api.ordify.ai',
    },
    mode: {
      type: String,
      default: 'floating',
      validator: (value) => ['floating', 'embedded'].includes(value),
    },
    position: {
      type: String,
      default: 'bottom-right',
      validator: (value) =>
        ['bottom-right', 'bottom-left', 'top-right', 'top-left'].includes(
          value
        ),
    },
    chatName: {
      type: String,
      default: 'Chat Assistant',
    },
    buttonText: {
      type: String,
      default: 'AI Chat',
    },
    placeholder: {
      type: String,
      default: 'Type a message...',
    },
    primaryColor: {
      type: String,
      default: '#3b82f6',
    },
    height: {
      type: [String, Number],
      default: 400,
    },
    width: {
      type: [String, Number],
      default: '320px',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    resizable: {
      type: Boolean,
      default: true,
    },
    onMessage: {
      type: Function,
      default: null,
    },
    onError: {
      type: Function,
      default: null,
    },
    onClose: {
      type: Function,
      default: null,
    },
    onSessionCreated: {
      type: Function,
      default: null,
    },
    initialMessage: {
      type: String,
      default: null,
    },
  },
  computed: {
    config() {
      return {
        agentId: this.agentId,
        apiKey: this.apiKey,
        apiBaseUrl: this.apiBaseUrl,
        mode: this.mode,
        position: this.position,
        chatName: this.chatName,
        buttonText: this.buttonText,
        placeholder: this.placeholder,
        primaryColor: this.primaryColor,
        height: this.height,
        width: this.width,
        showHeader: this.showHeader,
        resizable: this.resizable,
        onMessage: this.onMessage,
        onError: this.onError,
        onClose: this.onClose,
        onSessionCreated: this.onSessionCreated,
        initialMessage: this.initialMessage,
      }
    },
  },
  methods: {
    handleClose() {
      if (this.onClose) {
        this.onClose()
      }
    },
  },
}
</script>
