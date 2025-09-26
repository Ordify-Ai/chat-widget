// Types are imported but not used directly in this JS file
import { generateId } from '@/utils'
import { OrdifyApiClient, parseStreamingResponse } from '@/utils/api'

export const useOrdifyChat = {
  data() {
    return {
      messages: [],
      isLoading: false,
      error: null,
      sessionId: null,
      isOpen: false,
      hasInitialized: false,
      apiClient: null,
      initialMessageSent: false
    }
  },

  created() {
    // Initialize API client
    this.apiClient = new OrdifyApiClient({
      apiKey: this.config.apiKey,
      apiBaseUrl: this.config.apiBaseUrl || 'https://api.ordify.ai',
      agentId: this.config.agentId
    })
  },

  methods: {
    clearError() {
      this.error = null
    },

    async sendMessage(content) {
      if (!content.trim() || this.isLoading) return

      this.isLoading = true
      this.error = null

      try {
        // Add user message immediately
        const userMessage = {
          id: generateId(),
          content: content.trim(),
          role: 'user',
          timestamp: new Date(),
          sessionId: this.sessionId || undefined
        }

        this.messages.push(userMessage)

        // Create session if needed
        let currentSessionId = this.sessionId
        if (!currentSessionId) {
          const session = await this.apiClient.createSession()
          currentSessionId = session.id
          this.sessionId = currentSessionId
          
          // Call onSessionCreated callback if provided
          if (this.config.onSessionCreated) {
            this.config.onSessionCreated(currentSessionId)
          }
        }

        // Send message and handle streaming response
        const stream = await this.apiClient.sendMessage(content.trim(), currentSessionId)
        const reader = stream.getReader()
        const decoder = new TextDecoder()

        let assistantMessage = {
          id: generateId(),
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          sessionId: currentSessionId
        }

        this.messages.push(assistantMessage)

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            const response = parseStreamingResponse(line)
            if (response) {
              if (response.type === 'stream' && response.text) {
                const messageIndex = this.messages.findIndex(msg => msg.id === assistantMessage.id)
                if (messageIndex !== -1) {
                  this.$set(this.messages, messageIndex, {
                    ...this.messages[messageIndex],
                    content: this.messages[messageIndex].content + response.text
                  })
                }
              } else if (response.type === 'done') {
                // Message complete
                break
              }
            }
          }
        }

        // Call onMessage callback if provided
        if (this.config.onMessage) {
          this.config.onMessage(assistantMessage)
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
        this.error = errorMessage
        
        if (this.config.onError) {
          this.config.onError(err instanceof Error ? err : new Error(errorMessage))
        }
      } finally {
        this.isLoading = false
      }
    },

    setIsOpen(open) {
      this.isOpen = open
    }
  },

  watch: {
    'config.initialMessage': {
      handler(newMessage) {
        if (newMessage && !this.hasInitialized && !this.isLoading && !this.initialMessageSent) {
          this.hasInitialized = true
          this.initialMessageSent = true
          // Use setTimeout to avoid dependency loop
          setTimeout(() => {
            this.sendMessage(newMessage)
          }, 0)
        }
      },
      immediate: true
    }
  }
}
