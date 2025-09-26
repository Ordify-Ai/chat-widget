import { Message, OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { generateId } from '@/utils'
import { OrdifyApiClient, parseStreamingResponse } from '@/utils/api'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useOrdifyChat(config: OrdifyConfig): UseOrdifyChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  
  const apiClientRef = useRef<OrdifyApiClient | null>(null)

  // Initialize API client
  if (!apiClientRef.current) {
    apiClientRef.current = new OrdifyApiClient({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl || 'https://api.ordify.ai',
      agentId: config.agentId
    })
  }

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Add user message immediately
      const userMessage: Message = {
        id: generateId(),
        content: content.trim(),
        role: 'user',
        timestamp: new Date(),
        sessionId: sessionId || undefined
      }

      setMessages(prev => [...prev, userMessage])

      // Create session if needed
      let currentSessionId = sessionId
      if (!currentSessionId) {
        const session = await apiClientRef.current!.createSession()
        currentSessionId = session.id
        setSessionId(currentSessionId)
        
        // Call onSessionCreated callback if provided
        if (config.onSessionCreated) {
          config.onSessionCreated(currentSessionId)
        }
      }

      // Send message and handle streaming response
      const stream = await apiClientRef.current!.sendMessage(content.trim(), currentSessionId)
      const reader = stream.getReader()
      const decoder = new TextDecoder()

      let assistantMessage: Message = {
        id: generateId(),
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        sessionId: currentSessionId
      }

      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          const response = parseStreamingResponse(line)
          if (response) {
            if (response.type === 'stream' && response.text) {
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === assistantMessage.id 
                    ? { ...msg, content: msg.content + response.text }
                    : msg
                )
              )
            } else if (response.type === 'done') {
              // Message complete
              break
            }
          }
        }
      }

      // Call onMessage callback if provided
      if (config.onMessage) {
        config.onMessage(assistantMessage)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)
      
      if (config.onError) {
        config.onError(err instanceof Error ? err : new Error(errorMessage))
      }
    } finally {
      setIsLoading(false)
    }
  }, [config.onSessionCreated, config.onMessage, config.onError, isLoading, sessionId])

  // Auto-send initial message on mount
  useEffect(() => {
    if (config.initialMessage && !hasInitialized && !isLoading) {
      console.log('🚀 Auto-sending initial message:', config.initialMessage)
      setHasInitialized(true)
      // Use setTimeout to avoid dependency loop
      setTimeout(() => {
        sendMessage(config.initialMessage!)
      }, 0)
    }
  }, [config.initialMessage, hasInitialized, isLoading, sendMessage])

  return {
    messages,
    sendMessage,
    isLoading,
    error,
    clearError,
    sessionId,
    isOpen,
    setIsOpen
  }
}
