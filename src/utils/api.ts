import { Agent, ApiError, ChatRequest, OrdifyApiClientConfig, Session, StreamingResponse } from '@/types'

export class OrdifyApiClient {
  private config: OrdifyApiClientConfig

  constructor(config: OrdifyApiClientConfig) {
    this.config = config
  }

  async sendMessage(content: string, sessionId?: string, context?: string): Promise<ReadableStream<Uint8Array>> {
    const url = `${this.config.apiBaseUrl}/chat/agents/${this.config.agentId}`
    
    const requestBody: ChatRequest = {
      message: content,
      sessionId: sessionId,
      context: context
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
        'accept': 'application/json'
      },
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
    const url = `${this.config.apiBaseUrl}/sessions`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
        'accept': 'application/json'
      },
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

  async getAgents(): Promise<Agent[]> {
    const url = `${this.config.apiBaseUrl}/chat/agents`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'api-key': this.config.apiKey,
        'accept': 'application/json'
      }
    })

    if (!response.ok) {
      const error: ApiError = await response.json()
      throw new Error(`API Error: ${error.detail}`)
    }

    const data = await response.json()
    return data.agents || []
  }

  async getSessions(): Promise<Session[]> {
    const url = `${this.config.apiBaseUrl}/sessions`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'api-key': this.config.apiKey,
        'accept': 'application/json'
      }
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
      const data = chunk.slice(6)
      if (data === '[DONE]') {
        return { text: '', sessionId: '', type: 'done' }
      }
      return JSON.parse(data)
    }
  } catch (error) {
    console.warn('Failed to parse streaming response:', error)
  }
  return null
}
