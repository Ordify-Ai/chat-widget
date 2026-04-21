import { ApiError, ChatRequest, Message, OrdifyApiClientConfig, Session, StreamingResponse } from '@/types'

export class OrdifyApiClient {
  private config: OrdifyApiClientConfig
  private warnedLegacyApiKey = false

  constructor(config: OrdifyApiClientConfig) {
    this.config = config
    if (!this.config.publishableKey && !this.config.apiKey) {
      throw new Error('Either publishableKey or apiKey is required.')
    }
    if (this.config.publishableKey && this.config.apiKey) {
      console.warn('[Ordify] Both publishableKey and apiKey provided. publishableKey will be used.')
    }
  }

  private usePublishableKey(): boolean {
    return Boolean(this.config.publishableKey)
  }

  private maybeWarnLegacyApiKey(): void {
    if (this.usePublishableKey() || this.warnedLegacyApiKey) {
      return
    }
    this.warnedLegacyApiKey = true
    console.warn(
      '[Ordify] Using legacy apiKey in browser. For production embeds, use publishableKey from user settings.'
    )
  }

  private getAuthHeaders(includeContentType = false): HeadersInit {
    if (this.usePublishableKey()) {
      return {
        ...(includeContentType ? { 'Content-Type': 'application/json' } : {}),
        'x-ordify-publishable-key': this.config.publishableKey as string,
        'accept': 'application/json'
      }
    }

    this.maybeWarnLegacyApiKey()
    return {
      ...(includeContentType ? { 'Content-Type': 'application/json' } : {}),
      'api-key': this.config.apiKey as string,
      'accept': 'application/json'
    }
  }

  async sendMessage(content: string, sessionId?: string, context?: string): Promise<ReadableStream<Uint8Array>> {
    const path = this.usePublishableKey()
      ? `/widget/chat/${this.config.agentId}`
      : `/chat/agents/${this.config.agentId}`
    const url = `${this.config.apiBaseUrl}${path}`

    const requestBody: ChatRequest = {
      message: content,
      sessionId: sessionId,
      context: context
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getAuthHeaders(true),
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(`API Error: ${error.detail}`)
    }

    if (!response.body) {
      throw new Error('No response body')
    }

    return response.body
  }

  async createSession(): Promise<Session> {
    const path = this.usePublishableKey() ? '/widget/sessions' : '/sessions'
    const url = `${this.config.apiBaseUrl}${path}`

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getAuthHeaders(true),
      body: JSON.stringify({
        name: 'Chat Session',
        agentConfig: {
          type: 'chat',
          settings: null
        }
      })
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(`API Error: ${error.detail}`)
    }

    return response.json()
  }

  async getSessionWithMessages(sessionId: string): Promise<{ session: Session; messages: Message[] }> {
    const path = this.usePublishableKey()
      ? `/widget/sessions/${sessionId}/with-messages`
      : `/sessions/${sessionId}/with-messages`
    const url = `${this.config.apiBaseUrl}${path}`

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(`API Error: ${error.detail}`)
    }

    return response.json()
  }
}

export function parseStreamingResponse(chunk: string): StreamingResponse | null {
  try {
    if (chunk.startsWith('data: ')) {
      const data = chunk.slice(6).trim()
      if (data === '[DONE]' || data === '') {
        return { text: '', sessionId: '', type: 'done' }
      }
      const parsed = JSON.parse(data)
      if (parsed.done) {
        return { text: '', sessionId: parsed.sessionId || '', type: 'done' }
      }
      return parsed
    }
  } catch (error) {
    console.warn('Failed to parse streaming response:', error)
  }
  return null
}
