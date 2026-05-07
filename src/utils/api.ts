import {
  Agent,
  ApiError,
  AttachmentItem,
  AttachmentWire,
  ChatRequest,
  Message,
  OrdifyApiClientConfig,
  Session,
  StreamingResponse
} from '@/types'

function toAttachmentWire(a: AttachmentItem): AttachmentWire {
  return {
    id: a.id,
    name: a.name,
    url: a.url,
    content_type: a.content_type,
    type: a.type,
    size: a.size ?? null,
    preview: null,
    oauth_token: null
  }
}

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

  async sendMessage(
    content: string,
    sessionId?: string,
    context?: string,
    attachments?: AttachmentItem[]
  ): Promise<ReadableStream<Uint8Array>> {
    const path = this.usePublishableKey()
      ? `/widget/chat/${this.config.agentId}`
      : `/chat/agents/${this.config.agentId}`
    const url = `${this.config.apiBaseUrl}${path}`

    const wires = attachments?.length ? attachments.map(toAttachmentWire) : undefined

    const requestBody: ChatRequest = {
      message: content,
      sessionId: sessionId,
      context: context
    }
    if (wires?.length) {
      requestBody.attachments = wires
      requestBody.use_document_understanding = wires.some(
        (w) =>
          w.type === 'document' ||
          (!w.type && !String(w.content_type || '').startsWith('image/'))
      )
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

  /**
   * Upload a file for widget chat. Requires publishableKey (browser-safe auth).
   */
  async uploadAttachment(file: File): Promise<AttachmentItem> {
    if (!this.usePublishableKey()) {
      throw new Error('[Ordify] uploadAttachment requires publishableKey.')
    }
    const url = `${this.config.apiBaseUrl}/widget/attachments`
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getAuthHeaders(false),
      body: formData
    })

    if (!response.ok) {
      let detail = `HTTP ${response.status}`
      try {
        const err: ApiError = await response.json()
        detail = err.detail || detail
      } catch {
        /* ignore */
      }
      throw new Error(`API Error: ${detail}`)
    }

    const data = (await response.json()) as AttachmentItem
    if (!data?.url || !data?.content_type || !data?.name) {
      throw new Error('Invalid attachment response from server')
    }
    return {
      id: data.id,
      name: data.name,
      type: data.type === 'image' ? 'image' : 'document',
      url: data.url,
      content_type: data.content_type,
      size: data.size,
      preview: data.preview
    }
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

  /** @deprecated Use the Ordify dashboard to list agents. Will be removed in a future major version. */
  async getAgents(): Promise<Agent[]> {
    if (!this.config.apiKey) {
      throw new Error('[Ordify] getAgents() requires apiKey and is not supported with publishableKey.')
    }
    const url = `${this.config.apiBaseUrl}/chat/agents`

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'api-key': this.config.apiKey, 'accept': 'application/json' }
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(`API Error: ${error.detail}`)
    }

    const data = await response.json()
    return data.agents || []
  }

  /** @deprecated Use sessionId prop to load sessions. Will be removed in a future major version. */
  async getSessions(): Promise<Session[]> {
    if (!this.config.apiKey) {
      throw new Error('[Ordify] getSessions() requires apiKey and is not supported with publishableKey.')
    }
    const url = `${this.config.apiBaseUrl}/sessions`

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'api-key': this.config.apiKey, 'accept': 'application/json' }
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
      const parsed = JSON.parse(data) as Record<string, unknown>
      if (parsed.done) {
        return { text: '', sessionId: (parsed.sessionId as string) || '', type: 'done' }
      }
      if (
        parsed.type === 'adk_tool' ||
        parsed.type === 'turn_complete' ||
        parsed.type === 'image'
      ) {
        return null
      }
      return parsed as unknown as StreamingResponse
    }
  } catch (error) {
    console.warn('Failed to parse streaming response:', error)
  }
  return null
}
