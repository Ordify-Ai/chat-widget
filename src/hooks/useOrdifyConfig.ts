import { OrdifyConfig } from '@/types'
import { useMemo } from 'react'

function readOrdifyEnv(name: string): string | undefined {
  if (typeof process === 'undefined' || !process.env) {
    return undefined
  }
  const v = (process.env as Record<string, string | undefined>)[name]
  return typeof v === 'string' && v.length > 0 ? v : undefined
}

export function useOrdifyConfig(config: OrdifyConfig) {
  return useMemo(() => {
    const agentId = config.agentId || readOrdifyEnv('ORDIFY_AGENT_ID')
    const publishableKey = config.publishableKey || readOrdifyEnv('ORDIFY_PUBLISHABLE_KEY')
    const apiKey = config.apiKey || readOrdifyEnv('ORDIFY_API_KEY')
    const apiBaseUrl =
      config.apiBaseUrl || readOrdifyEnv('ORDIFY_API_BASE_URL') || 'https://r.ordify.ai'

    if (!agentId) {
      throw new Error('Ordify agent ID is required. Provide agentId prop or set ORDIFY_AGENT_ID environment variable.')
    }

    if (!publishableKey && !apiKey) {
      throw new Error(
        'Ordify credentials are required. Provide publishableKey (recommended) or apiKey.'
      )
    }

    return {
      agentId,
      publishableKey,
      apiKey,
      apiBaseUrl,
      mode: config.mode || 'floating',
      position: config.position || 'bottom-right',
      theme: config.theme || 'auto',
      placeholder: config.placeholder || 'Type a message...',
      height: config.height || '500px',
      className: config.className || '',
      buttonStyle: config.buttonStyle || {},
      chatWindowStyle: config.chatWindowStyle || {},
      showHeader: config.showHeader !== false,
      buttonText: config.buttonText,
      chatName: config.chatName,
      primaryColor: config.primaryColor,
      agentImage: config.agentImage,
      onMessage: config.onMessage,
      onError: config.onError,
      onClose: config.onClose,
      onSessionCreated: config.onSessionCreated,
      initialMessage: config.initialMessage,
      initialContext: config.initialContext,
      sessionId: config.sessionId,
      quickQuestions: config.quickQuestions,
      welcomeMessage: config.welcomeMessage,
      welcomeImage: config.welcomeImage,
      enableAttachments: config.enableAttachments,
      maxAttachmentSizeMB: config.maxAttachmentSizeMB,
      maxAttachments: config.maxAttachments,
      allowedAttachmentTypes: config.allowedAttachmentTypes
    }
  }, [config])
}
