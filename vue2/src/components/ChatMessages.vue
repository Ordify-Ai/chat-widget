<template>
  <Conversation>
    <div
      v-for="message in messages"
      :key="message.id"
      class="message-container"
      :class="{ 'user-message': message.role === 'user' }"
    >
      <ChatMessage :$isUser="message.role === 'user'">
        <MarkdownRenderer
          v-if="message.role === 'assistant'"
          :content="message.content"
        />
        <span v-else>{{ message.content }}</span>
        <Timestamp :$isUser="message.role === 'user'">
          {{ formatTime(message.timestamp) }}
        </Timestamp>
      </ChatMessage>
    </div>

    <div v-if="isLoading" class="message-container">
      <ChatMessage :$isUser="false">
        <LoadingDots>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </LoadingDots>
      </ChatMessage>
    </div>

    <ErrorMessage v-if="error">
      {{ error }}
    </ErrorMessage>
  </Conversation>
</template>

<script>
import {
  Conversation,
  ChatMessage,
  Timestamp,
  LoadingDots,
  ErrorMessage,
} from './styled/ChatComponents'
import MarkdownRenderer from './MarkdownRenderer.vue'
import { formatTime } from '@/utils'

export default {
  name: 'ChatMessages',
  components: {
    Conversation,
    ChatMessage,
    Timestamp,
    LoadingDots,
    ErrorMessage,
    MarkdownRenderer,
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },
  methods: {
    formatTime,
  },
}
</script>

<style scoped>
.message-container {
  display: flex;
  margin-bottom: 16px;
  justify-content: flex-start;
}

.message-container.user-message {
  justify-content: flex-end;
}
</style>
