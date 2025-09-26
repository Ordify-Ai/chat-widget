<template>
  <StyledChatInput>
    <ProfessionalInput
      ref="input"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="isLoading"
      @input="handleInput"
      @keydown="handleKeyDown"
    />
    <StyledSendButton
      @click="handleSendMessage"
      :disabled="isLoading || !inputValue.trim()"
    >
      <Send :size="16" />
    </StyledSendButton>
  </StyledChatInput>
</template>

<script>
import {
  ChatInput as StyledChatInput,
  SendButton as StyledSendButton,
} from './styled/ChatComponents'
import ProfessionalInput from './ProfessionalInput.vue'
import { Send } from 'lucide-vue'

export default {
  name: 'ChatInput',
  components: {
    StyledChatInput,
    StyledSendButton,
    ProfessionalInput,
    Send,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Type a message...',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    handleInput(value) {
      this.inputValue = value
    },

    handleKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.handleSendMessage()
      }
    },

    handleSendMessage() {
      if (!this.inputValue.trim() || this.isLoading) return

      this.$emit('send', this.inputValue.trim())
      this.inputValue = ''

      // Auto-focus input after sending
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    },

    focus() {
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    },
  },
}
</script>
