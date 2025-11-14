import { Message, OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { generateId } from '@/utils'
import { OrdifyApiClient, parseStreamingResponse } from '@/utils/api'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useOrdifyChat(config: OrdifyConfig): UseOrdifyChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(config.sessionId || null)
  const [isOpen, setIsOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [hasExistingMessages, setHasExistingMessages] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  
  const apiClientRef = useRef<OrdifyApiClient | null>(null)
  const initialMessageSentRef = useRef(false)
  const historyLoadedRef = useRef(false)
  const isStreamingRef = useRef(false)

  // Initialize API client
  if (!apiClientRef.current) {
    apiClientRef.current = new OrdifyApiClient({
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl || 'https://api.ordify.ai',
      agentId: config.agentId
    })
  }

  // Track the last sessionId we attempted to load to prevent duplicate loads
  const lastLoadedSessionIdRef = useRef<string | null>(null)

  // Update sessionId if config changes
  useEffect(() => {
    if (config.sessionId && config.sessionId !== sessionId) {
      setSessionId(config.sessionId)
      historyLoadedRef.current = false
      lastLoadedSessionIdRef.current = null
      setHasExistingMessages(false)
      setMessages([])
    }
  }, [config.sessionId])

  // Load existing messages when sessionId is provided
  useEffect(() => {
    const loadSessionHistory = async () => {
      const currentSessionId = sessionId || config.sessionId
      
      // Don't load history if we're currently streaming a response
      if (isStreamingRef.current) {
        return
      }
      
      // If no sessionId, mark as loaded so initial message can proceed
      if (!currentSessionId) {
        historyLoadedRef.current = true
        lastLoadedSessionIdRef.current = null
        setHasExistingMessages(false)
        return
      }

      // If we already tried to load this exact sessionId, skip
      if (lastLoadedSessionIdRef.current === currentSessionId) {
        return
      }

      // Mark that we're attempting to load this session
      lastLoadedSessionIdRef.current = currentSessionId

      setIsLoadingHistory(true)
      try {
        const response = await apiClientRef.current!.getSessionWithMessages(currentSessionId)
        if (response.messages && response.messages.length > 0) {
          const formattedMessages: Message[] = response.messages.map((msg: any) => ({
            id: msg.id || generateId(),
            content: msg.content || '',
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
            sessionId: currentSessionId
          }))
          setMessages(formattedMessages)
          setHasExistingMessages(true)
        } else {
          setHasExistingMessages(false)
        }
      } catch (err) {
        console.warn('Failed to load session history:', err)
        setHasExistingMessages(false)
        // If session not found (404), clear the invalid sessionId so a new one will be created
        if (err instanceof Error && err.message.includes('404')) {
          setSessionId(null)
          lastLoadedSessionIdRef.current = null
        }
      } finally {
        setIsLoadingHistory(false)
        historyLoadedRef.current = true
      }
    }

    loadSessionHistory()
  }, [sessionId, config.sessionId])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const sendMessage = useCallback(async (content: string, context?: string) => {
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

      // Use provided sessionId or create new session if needed
      // If sessionId was cleared due to 404 error, create new session
      let currentSessionId = sessionId || config.sessionId || null
      if (!currentSessionId) {
        const session = await apiClientRef.current!.createSession()
        currentSessionId = session.id
        // Don't trigger session loading effect by updating sessionId here
        // We'll update it after the message is sent to avoid clearing messages
        // setSessionId(currentSessionId)
        
        // Call onSessionCreated callback if provided
        if (config.onSessionCreated) {
          config.onSessionCreated(currentSessionId)
        }
      } else {
        // If using provided sessionId, make sure it's set in state
        if (currentSessionId !== sessionId) {
          setSessionId(currentSessionId)
        }
      }

      // Send message and handle streaming response
      isStreamingRef.current = true
      const stream = await apiClientRef.current!.sendMessage(content.trim(), currentSessionId, context)
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
          if (!line.trim()) continue
          
          const response = parseStreamingResponse(line)
          
          if (response) {
            if (response.type === 'stream' && response.text) {
              assistantMessage.content += response.text
              
              setMessages(prev => {
                const found = prev.find(msg => msg.id === assistantMessage.id)
                if (!found) {
                  return [...prev, { ...assistantMessage, content: assistantMessage.content }]
                }
                return prev.map(msg => 
                  msg.id === assistantMessage.id 
                    ? { ...msg, content: assistantMessage.content }
                    : msg
                )
              })
            } else if (response.type === 'done') {
              break
            }
          }
        }
      }

      // Update sessionId after message is complete to avoid clearing messages
      if (currentSessionId && currentSessionId !== sessionId) {
        setSessionId(currentSessionId)
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
      isStreamingRef.current = false
      setIsLoading(false)
    }
  }, [config.onSessionCreated, config.onMessage, config.onError, isLoading, sessionId])

  // Auto-send initial message on mount (only if no existing session or empty session)
  useEffect(() => {
    const currentSessionId = sessionId || config.sessionId
    const shouldSendInitial = !currentSessionId || !hasExistingMessages
    
    if ((config.initialMessage || config.initialContext) && 
        shouldSendInitial && 
        !hasInitialized && 
        !isLoading && 
        !isLoadingHistory &&
        !initialMessageSentRef.current &&
        historyLoadedRef.current) {
      setHasInitialized(true)
      initialMessageSentRef.current = true
      
      // Determine what message to send and what context to include
      let messageToSend: string
      let contextToSend: string | undefined
      
      if (config.initialMessage && config.initialContext) {
        // Both provided: send message + context
        messageToSend = config.initialMessage
        contextToSend = config.initialContext
      } else if (config.initialMessage) {
        // Only message provided: send message only (backward compatible)
        messageToSend = config.initialMessage
        contextToSend = undefined
      } else if (config.initialContext) {
        // Only context provided: send default greeting + context
        messageToSend = "Hi"
        contextToSend = config.initialContext
      } else {
        // Neither provided: do nothing
        return
      }
      
      // Use setTimeout to avoid dependency loop
      setTimeout(() => {
        sendMessage(messageToSend, contextToSend)
      }, 0)
    }
  }, [config.initialMessage, config.initialContext, hasInitialized, isLoading, isLoadingHistory, hasExistingMessages, sessionId, config.sessionId, sendMessage])

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
