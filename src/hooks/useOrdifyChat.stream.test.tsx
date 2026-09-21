import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useOrdifyChat } from './useOrdifyChat'

function sseStream(chunks: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  let index = 0
  return new ReadableStream({
    pull(controller) {
      if (index >= chunks.length) {
        controller.close()
        return
      }
      controller.enqueue(encoder.encode(chunks[index]))
      index += 1
    }
  })
}

function mockChatFetch(chunks: string[]) {
  vi.mocked(fetch).mockImplementation(async (input) => {
    const url = String(input)
    if (url.includes('/with-messages')) {
      return new Response(JSON.stringify({ session: { id: 's1' }, messages: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return new Response(sseStream(chunks), {
      status: 200,
      headers: { 'Content-Type': 'text/event-stream' }
    })
  })
}

describe('useOrdifyChat streaming', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: (time: number) => void) => {
      cb(0)
      return 0
    })
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('reassembles a token split across two TCP reads', async () => {
    mockChatFetch([
      'data: {"text":"Hello","type":"stream","sessionId":"s1"}\n\ndata: {"text":" wor',
      'ld","type":"stream","sessionId":"s1"}\n\n'
    ])

    const { result } = renderHook(() =>
      useOrdifyChat({
        agentId: 'agent-1',
        publishableKey: 'pk_live_test',
        apiBaseUrl: 'http://localhost:5001',
        sessionId: 's1'
      })
    )

    await act(async () => {
      await result.current.sendMessage('hi')
    })

    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === 'assistant')
      expect(assistant?.content).toBe('Hello world')
    })
    expect(result.current.isLoading).toBe(false)
  })

  it('replaces the visible reply when the backend sends replace', async () => {
    mockChatFetch([
      'data: {"text":"Hel","type":"stream","sessionId":"s1"}\n\n',
      'data: {"text":"Hello world","type":"stream","sessionId":"s1","replace":true}\n\n'
    ])

    const { result } = renderHook(() =>
      useOrdifyChat({
        agentId: 'agent-1',
        publishableKey: 'pk_live_test',
        apiBaseUrl: 'http://localhost:5001',
        sessionId: 's1'
      })
    )

    await act(async () => {
      await result.current.sendMessage('hi')
    })

    await waitFor(() => {
      const assistant = result.current.messages.find((m) => m.role === 'assistant')
      expect(assistant?.content).toBe('Hello world')
    })
  })
})
