import { OrdifyConfig } from '@/types'
import { useMemo } from 'react'

export function useOrdifyConfig(config: OrdifyConfig) {
  return useMemo(() => {
    // Get configuration from props or environment variables
    const agentId = config.agentId || process.env.ORDIFY_AGENT_ID
    const apiKey = config.apiKey || process.env.ORDIFY_API_KEY
    const apiBaseUrl = config.apiBaseUrl || process.env.ORDIFY_API_BASE_URL || 'https://r.ordify.ai'
    
    if (!agentId) {
      throw new Error('Ordify agent ID is required. Provide agentId prop or set ORDIFY_AGENT_ID environment variable.')
    }
    
    if (!apiKey) {
      throw new Error('Ordify API key is required. Provide apiKey prop or set ORDIFY_API_KEY environment variable.')
    }

    return {
      agentId,
      apiKey,
      apiBaseUrl,
      mode: config.mode || 'floating',
      position: config.position || 'bottom-right',
      theme: config.theme || 'light',
      placeholder: config.placeholder || 'Type a message...',
      height: config.height || '500px',
      className: config.className || '',
      buttonStyle: config.buttonStyle || {},
      chatWindowStyle: config.chatWindowStyle || {},
      showHeader: config.showHeader !== false,
      onMessage: config.onMessage,
      onError: config.onError,
      onClose: config.onClose,
      onSessionCreated: config.onSessionCreated,
      initialMessage: config.initialMessage
    }
  }, [config])
}
