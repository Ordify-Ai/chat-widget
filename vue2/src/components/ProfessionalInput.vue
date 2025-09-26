<template>
  <textarea
    ref="textarea"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="handleInput"
    @keydown="handleKeyDown"
    @focus="handleFocus"
    @blur="handleBlur"
    class="professional-input"
  />
</template>

<script>
export default {
  name: 'ProfessionalInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Type a message...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
      this.autoResize()
    },

    handleKeyDown(event) {
      this.$emit('keydown', event)
    },

    handleFocus(event) {
      this.$emit('focus', event)
    },

    handleBlur(event) {
      this.$emit('blur', event)
    },

    autoResize() {
      this.$nextTick(() => {
        const textarea = this.$refs.textarea
        if (textarea) {
          textarea.style.height = 'auto'
          const scrollHeight = textarea.scrollHeight
          const maxHeight = 120 // max-height from CSS
          textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px'
        }
      })
    },

    focus() {
      this.$nextTick(() => {
        if (this.$refs.textarea) {
          this.$refs.textarea.focus()
        }
      })
    },
  },

  watch: {
    value() {
      this.autoResize()
    },
  },

  mounted() {
    this.autoResize()
  },
}
</script>

<style scoped>
.professional-input {
  flex: 1;
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1f2937;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.professional-input::placeholder {
  color: #6b7280;
}

.professional-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.professional-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .professional-input {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }

  .professional-input::placeholder {
    color: #9ca3af;
  }

  .professional-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}
</style>
