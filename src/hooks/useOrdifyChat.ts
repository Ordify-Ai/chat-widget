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
  const [hasSessionStarted, setHasSessionStarted] = useState(false)
  
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
  
  // Track sessions we created internally to avoid clearing messages when config updates
  const internallyCreatedSessionsRef = useRef<Set<string>>(new Set())

  // Update sessionId if config changes
  useEffect(() => {
    if (config.sessionId && config.sessionId !== sessionId) {
      // Only clear messages if this is an external session change (not one we created internally)
      const isInternalSession = internallyCreatedSessionsRef.current.has(config.sessionId)
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:36',message:'SessionId changed from config',data:{oldSessionId:sessionId,newSessionId:config.sessionId,messagesCount:messages.length,isInternalSession,willClearMessages:!isInternalSession},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      setSessionId(config.sessionId)
      historyLoadedRef.current = false
      lastLoadedSessionIdRef.current = null
      setHasExistingMessages(false)
      
      // Only clear messages if switching to an external session (not one we created)
      if (!isInternalSession) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:50',message:'Clearing messages - external session switch',data:{messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
        setMessages([])
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:55',message:'Preserving messages - internal session',data:{messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
        // #endregion
      }
    }
  }, [config.sessionId])

  // Load existing messages when sessionId is provided
  useEffect(() => {
    const loadSessionHistory = async () => {
      const currentSessionId = sessionId || config.sessionId
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:47',message:'loadSessionHistory called',data:{currentSessionId,sessionId,configSessionId:config.sessionId,isStreaming:isStreamingRef.current,isLoading,messagesCount:messages.length,lastLoadedId:lastLoadedSessionIdRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // Don't load history if we're currently streaming a response
      if (isStreamingRef.current) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:52',message:'Skipping history load - streaming',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return
      }
      
      // Don't load history if we're currently loading (sending a message)
      // This prevents overwriting messages that were just added
      if (isLoading) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:58',message:'Skipping history load - isLoading',data:{messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        return
      }
      
      // If no sessionId, mark as loaded so initial message can proceed
      if (!currentSessionId) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:63',message:'No sessionId - marking loaded',data:{messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        historyLoadedRef.current = true
        lastLoadedSessionIdRef.current = null
        setHasExistingMessages(false)
        return
      }

      // If we already tried to load this exact sessionId, skip
      if (lastLoadedSessionIdRef.current === currentSessionId) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:71',message:'Already loaded this sessionId - skipping',data:{currentSessionId,messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        return
      }

      // If this is an internally created session and we already have messages, skip loading
      // This prevents loading history right after we create a session and send a message
      const isInternalSession = internallyCreatedSessionsRef.current.has(currentSessionId)
      if (isInternalSession && messages.length > 0 && !historyLoadedRef.current) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:78',message:'Skipping history load - internal session with existing messages',data:{currentSessionId,messagesCount:messages.length,isInternalSession},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
        historyLoadedRef.current = true
        lastLoadedSessionIdRef.current = currentSessionId
        setIsLoadingHistory(false)
        return
      }

      // Mark that we're attempting to load this session
      lastLoadedSessionIdRef.current = currentSessionId

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:77',message:'Loading session history',data:{currentSessionId,messagesBeforeLoad:messages.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      setIsLoadingHistory(true)
      try {
        const response = await apiClientRef.current!.getSessionWithMessages(currentSessionId)
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:80',message:'History response received',data:{responseMessagesCount:response.messages?.length||0,responseMessages:response.messages?.map((m:any)=>({id:m.id,content:m.content?.substring(0,50),role:m.role}))||[]},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        if (response.messages && response.messages.length > 0) {
          const formattedMessages: Message[] = response.messages.map((msg: any) => ({
            id: msg.id || generateId(),
            content: msg.content || '',
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
            sessionId: currentSessionId
          }))
          // Merge with existing messages to preserve any messages added before history loaded
          // (e.g., user's quick question that was just sent)
          setMessages(prev => {
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:90',message:'Merging messages - BEFORE',data:{prevCount:prev.length,prevMessages:prev.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role})),formattedCount:formattedMessages.length,formattedMessages:formattedMessages.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
            // If we have existing messages, merge them with loaded messages
            if (prev.length > 0) {
              const messageMap = new Map<string, Message>()
              const contentMap = new Map<string, Message>() // Track by content+role to prevent duplicates
              
              // First add existing messages (these are the most recent, like the user's question)
              prev.forEach(msg => {
                messageMap.set(msg.id, msg)
                // Also track by content+role to detect duplicates with different IDs
                const contentKey = `${msg.role}:${msg.content.trim()}`
                if (!contentMap.has(contentKey)) {
                  contentMap.set(contentKey, msg)
                }
              })
              
              // Then add/update with loaded messages from server
              formattedMessages.forEach(msg => {
                const contentKey = `${msg.role}:${msg.content.trim()}`
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
              // #region agent log
              fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:104',message:'Merging messages - AFTER merge',data:{mergedCount:merged.length,mergedMessages:merged.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
              // #endregion
              return merged
            }
            // If no existing messages, just use loaded messages
            // #region agent log
            fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:111',message:'No prev messages - using formatted only',data:{formattedCount:formattedMessages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
            // #endregion
            return formattedMessages
          })
          setHasExistingMessages(true)
          setHasSessionStarted(true)
        } else {
          // No messages from server, but preserve any local messages (e.g., user's question)
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:116',message:'No server messages - preserving local',data:{messagesCount:messages.length,messages:messages.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:140',message:'sendMessage called',data:{content:content.trim(),currentSessionId:sessionId,currentMessagesCount:messages.length,currentMessages:messages.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    setIsLoading(true)
    setError(null)

    try {
      // Add user message immediately - do this before setting hasSessionStarted
      // so the message is visible when the welcome screen disappears
      const userMessage: Message = {
        id: generateId(),
        content: content.trim(),
        role: 'user',
        timestamp: new Date(),
        sessionId: sessionId || undefined
      }

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:157',message:'Adding user message to state',data:{userMessageId:userMessage.id,userMessageContent:userMessage.content,currentMessagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion

      setMessages(prev => {
        const updated = [...prev, userMessage]
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:161',message:'Messages state updated with user message',data:{prevCount:prev.length,updatedCount:updated.length,updatedMessages:updated.map(m=>({id:m.id,content:m.content.substring(0,50),role:m.role}))},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return updated
      })
      setHasSessionStarted(true)

      // Use provided sessionId or create new session if needed
      // If sessionId was cleared due to 404 error, create new session
      let currentSessionId = sessionId || config.sessionId || null
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:170',message:'Checking sessionId before send',data:{currentSessionId,stateSessionId:sessionId,configSessionId:config.sessionId,messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (!currentSessionId) {
        const session = await apiClientRef.current!.createSession()
        currentSessionId = session.id
        
        // Mark this session as internally created so we don't clear messages when config updates
        internallyCreatedSessionsRef.current.add(currentSessionId)
        
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:180',message:'New session created - marked as internal',data:{newSessionId:currentSessionId,messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
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
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:186',message:'Updating sessionId in state',data:{oldSessionId:sessionId,newSessionId:currentSessionId,messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
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
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/27b72337-a56f-4ea6-889c-aa35e4d8f72f',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useOrdifyChat.ts:197',message:'Updating sessionId after message complete',data:{oldSessionId:sessionId,newSessionId:currentSessionId,messagesCount:messages.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
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
    isLoading,
    error,
    clearError,
    sessionId,
    isOpen,
    setIsOpen,
    hasSessionStarted
  }
}
