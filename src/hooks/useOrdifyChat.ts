import { AttachmentItem, Message, OrdifyConfig, UseOrdifyChatReturn } from '@/types'
import { generateId } from '@/utils'
import { isAdkToolHistoryPayload, stripAdkToolStatusParagraphsFromAssistantText } from '@/utils/adkAssistantText'
import { OrdifyApiClient, parseStreamingResponse } from '@/utils/api'
import { useCallback, useEffect, useRef, useState } from 'react'

function messageMergeKey(msg: Message): string {
  const att = (msg.attachments || []).map((a) => a.id).join('|')
  return `${msg.role}:${msg.content.trim()}:${att}`
}

function mapAttachmentsFromHistory(msg: any): AttachmentItem[] | undefined {
  const raw = msg.attachments
  if (!raw || !Array.isArray(raw) || raw.length === 0) return undefined
  const mapped: AttachmentItem[] = []
  for (const a of raw) {
    const url = a.url || ''
    if (!url) continue
    mapped.push({
      id: a.id || generateId(),
      name: String(a.name || 'attachment'),
      type: a.type === 'image' ? 'image' : 'document',
      url,
      content_type: String(a.content_type || a.contentType || 'application/octet-stream'),
      size: a.size,
      preview: a.preview
    })
  }
  return mapped.length ? mapped : undefined
}

export function useOrdifyChat(config: OrdifyConfig): UseOrdifyChatReturn {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(config.sessionId || null)
  const [isOpen, setIsOpen] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [hasExistingMessages, setHasExistingMessages] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [hasSessionStarted, setHasSessionStarted] = useState(false)

  const apiClientRef = useRef<OrdifyApiClient | null>(null)
  const credFingerprintRef = useRef<string>('')
  const initialMessageSentRef = useRef(false)
  const historyLoadedRef = useRef(false)
  const isStreamingRef = useRef(false)

  // Reset API client when credentials or endpoint change so stale clients are never used
  const credFingerprint = `${config.publishableKey ?? ''}|${config.apiKey ?? ''}|${config.apiBaseUrl ?? ''}|${config.agentId}`
  if (credFingerprintRef.current !== credFingerprint) {
    apiClientRef.current = null
    credFingerprintRef.current = credFingerprint
  }

  // Initialize API client
  if (!apiClientRef.current) {
    apiClientRef.current = new OrdifyApiClient({
      publishableKey: config.publishableKey,
      apiKey: config.apiKey,
      apiBaseUrl: config.apiBaseUrl || 'https://api.ordify.ai',
      agentId: config.agentId
    })
  }

  // Track the last sessionId we attempted to load to prevent duplicate loads
  const lastLoadedSessionIdRef = useRef<string | null>(null)

  // Track sessions we created internally to avoid clearing messages when config updates
  const internallyCreatedSessionsRef = useRef<Set<string>>(new Set())

  // Update sessionId if config changes
  useEffect(() => {
    if (config.sessionId && config.sessionId !== sessionId) {
      // Only clear messages if this is an external session change (not one we created internally)
      const isInternalSession = internallyCreatedSessionsRef.current.has(config.sessionId)


      setSessionId(config.sessionId)
      historyLoadedRef.current = false
      lastLoadedSessionIdRef.current = null
      setHasExistingMessages(false)

      // Only clear messages if switching to an external session (not one we created)
      if (!isInternalSession) {
        setMessages([])
      }
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

      // Don't load history if we're currently loading (sending a message)
      // This prevents overwriting messages that were just added
      if (isLoading) {
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

      // If this is an internally created session and we already have messages, skip loading
      // This prevents loading history right after we create a session and send a message
      const isInternalSession = internallyCreatedSessionsRef.current.has(currentSessionId)
      if (isInternalSession && messages.length > 0 && !historyLoadedRef.current) {
        historyLoadedRef.current = true
        lastLoadedSessionIdRef.current = currentSessionId
        setIsLoadingHistory(false)
        return
      }

      // Mark that we're attempting to load this session
      lastLoadedSessionIdRef.current = currentSessionId


      setIsLoadingHistory(true)
      try {
        const response = await apiClientRef.current!.getSessionWithMessages(currentSessionId)
        if (response.messages && response.messages.length > 0) {
          const formattedMessages: Message[] = (response.messages as unknown as Array<{ type?: string | null } & Record<string, unknown>>)
            .filter(msg => !isAdkToolHistoryPayload(msg))
            .map((msg: any) => {
              const role = msg.role === 'assistant' ? 'assistant' : 'user'
              const raw = String(msg.content || '')
              return {
                id: msg.id || generateId(),
                content:
                  role === 'assistant'
                    ? stripAdkToolStatusParagraphsFromAssistantText(raw)
                    : raw,
                role,
                timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
                sessionId: currentSessionId,
                attachments: mapAttachmentsFromHistory(msg)
              }
            })
          // Merge with existing messages to preserve any messages added before history loaded
          // (e.g., user's quick question that was just sent)
          setMessages(prev => {
            // If we have existing messages, merge them with loaded messages
            if (prev.length > 0) {
              const messageMap = new Map<string, Message>()
              const contentMap = new Map<string, Message>() // Track by content+role to prevent duplicates

              // First add existing messages (these are the most recent, like the user's question)
              prev.forEach(msg => {
                messageMap.set(msg.id, msg)
                // Also track by content+role+attachments to detect duplicates with different IDs
                const contentKey = messageMergeKey(msg)
                if (!contentMap.has(contentKey)) {
                  contentMap.set(contentKey, msg)
                }
              })

              // Then add/update with loaded messages from server
              formattedMessages.forEach(msg => {
                const contentKey = messageMergeKey(msg)
                // Only add if we don't already have this message by ID or by content
                if (!messageMap.has(msg.id) && !contentMap.has(contentKey)) {
                  messageMap.set(msg.id, msg)
                  contentMap.set(contentKey, msg)
                } else if (messageMap.has(msg.id)) {
                  // Update existing message if IDs match
                  messageMap.set(msg.id, msg)
                }
                // If content matches but ID is different, skip to prevent duplicates
              })

              // Convert back to array and sort by timestamp
              const merged = Array.from(messageMap.values()).sort((a, b) =>
                a.timestamp.getTime() - b.timestamp.getTime()
              )
              return merged
            }
            // If no existing messages, just use loaded messages
            return formattedMessages
          })
          setHasExistingMessages(true)
          setHasSessionStarted(true)
        } else {
          setHasExistingMessages(false)
        }
      } catch (err) {
        console.warn('Failed to load session history:', err)
        setHasExistingMessages(false)
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

  const uploadAttachment = useCallback(async (file: File) => {
    if (!apiClientRef.current) {
      throw new Error('API client not initialized')
    }
    return apiClientRef.current.uploadAttachment(file)
  }, [])

  const sendMessage = useCallback(
    async (content: string, context?: string, attachments?: AttachmentItem[]) => {
    const trimmed = content.trim()
    const hasAttachments = Boolean(attachments && attachments.length > 0)
    if ((!trimmed && !hasAttachments) || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const attachmentSnapshot = attachments?.length
        ? attachments.map((a) => ({ ...a }))
        : undefined

      // Add user message immediately - do this before setting hasSessionStarted
      // so the message is visible when the welcome screen disappears
      const userMessage: Message = {
        id: generateId(),
        content: trimmed,
        role: 'user',
        timestamp: new Date(),
        sessionId: sessionId || undefined,
        attachments: attachmentSnapshot
      }


      setMessages(prev => {
        const updated = [...prev, userMessage]
        return updated
      })
      setHasSessionStarted(true)

      // Use provided sessionId or create new session if needed
      // If sessionId was cleared due to 404 error, create new session
      let currentSessionId = sessionId || config.sessionId || null
      if (!currentSessionId) {
        const session = await apiClientRef.current!.createSession()
        currentSessionId = session.id

        // Mark this session as internally created so we don't clear messages when config updates
        internallyCreatedSessionsRef.current.add(currentSessionId)

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
      const stream = await apiClientRef.current!.sendMessage(
        trimmed || '(see attachments)',
        currentSessionId,
        context,
        attachmentSnapshot
      )
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
              assistantMessage.content = stripAdkToolStatusParagraphsFromAssistantText(
                assistantMessage.content + response.text
              )

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
  },
  [config.onSessionCreated, config.onMessage, config.onError, config.sessionId, isLoading, sessionId]
  )

  // Auto-send initial message on mount (only if no existing session or empty session)
  // Skip if quickQuestions are provided (user must select a question or type custom message)
  useEffect(() => {
    const currentSessionId = sessionId || config.sessionId
    const shouldSendInitial = !currentSessionId || !hasExistingMessages
    const hasQuickQuestions = config.quickQuestions && config.quickQuestions.length > 0

    if ((config.initialMessage || config.initialContext) &&
      shouldSendInitial &&
      !hasInitialized &&
      !isLoading &&
      !isLoadingHistory &&
      !initialMessageSentRef.current &&
      historyLoadedRef.current &&
      !hasQuickQuestions) {
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
    uploadAttachment,
    isLoading,
    error,
    clearError,
    sessionId,
    isOpen,
    setIsOpen,
    hasSessionStarted
  }
}
