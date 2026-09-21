import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  drainSseBuffer,
  flushSseBuffer,
  OrdifyApiClient,
  parseStreamingResponse
} from './api'

function sseLine(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}`
}

describe('parseStreamingResponse', () => {
  it('parses incremental stream tokens', () => {
    const event = parseStreamingResponse(
      sseLine({ text: 'Hello', sessionId: 's1', type: 'stream' })
    )
    expect(event).toMatchObject({
      type: 'stream',
      text: 'Hello',
      sessionId: 's1',
      replace: false
    })
  })

  it('keeps replace so the hook can swap the full visible reply', () => {
    const event = parseStreamingResponse(
      sseLine({
        text: 'Hello world',
        sessionId: 's1',
        type: 'stream',
        replace: true
      })
    )
    expect(event?.replace).toBe(true)
    expect(event?.text).toBe('Hello world')
  })

  it('uses content when type is stream and text is missing', () => {
    const event = parseStreamingResponse(
      sseLine({ type: 'stream', content: 'token', sessionId: 's1' })
    )
    expect(event).toMatchObject({ type: 'stream', text: 'token' })
  })

  it('returns done for [DONE] and done payloads', () => {
    expect(parseStreamingResponse('data: [DONE]')).toMatchObject({ type: 'done' })
    expect(
      parseStreamingResponse(sseLine({ done: true, sessionId: 's1' }))
    ).toMatchObject({ type: 'done', sessionId: 's1' })
  })

  it('ignores turn_complete', () => {
    expect(
      parseStreamingResponse(sseLine({ type: 'turn_complete', sessionId: 's1' }))
    ).toBeNull()
  })

  it('returns null for a split JSON frame that is not yet complete', () => {
    expect(
      parseStreamingResponse('data: {"text":"Hel')
    ).toBeNull()
  })
})

describe('drainSseBuffer', () => {
  it('keeps an incomplete trailing frame for the next chunk', () => {
    const first = drainSseBuffer(
      'data: {"text":"Hello","type":"stream","sessionId":"s1"}\n\ndata: {"text":" wor'
    )
    expect(first.events).toEqual([
      {
        type: 'stream',
        text: 'Hello',
        sessionId: 's1',
        agentName: undefined,
        replace: false
      }
    ])
    expect(first.leftover).toBe('data: {"text":" wor')

    const second = drainSseBuffer(
      `${first.leftover}ld","type":"stream","sessionId":"s1"}\n\n`
    )
    expect(second.events.map((e) => e.text)).toEqual([' world'])
    expect(second.leftover).toBe('')
  })

  it('parses multiple complete events from one TCP chunk', () => {
    const drained = drainSseBuffer(
      [
        sseLine({ text: 'A', type: 'stream', sessionId: 's1' }),
        '',
        sseLine({ text: 'B', type: 'stream', sessionId: 's1' }),
        '',
        ''
      ].join('\n')
    )
    expect(drained.events.map((e) => e.text)).toEqual(['A', 'B'])
    expect(drained.leftover).toBe('')
  })
})

describe('flushSseBuffer', () => {
  it('parses a complete leftover frame at stream end', () => {
    const events = flushSseBuffer(
      sseLine({ text: 'end', type: 'stream', sessionId: 's1' })
    )
    expect(events.map((e) => e.text)).toEqual(['end'])
  })

  it('drops an incomplete leftover frame', () => {
    expect(flushSseBuffer('data: {"text":"hel')).toEqual([])
  })
})

describe('OrdifyApiClient.sendMessage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('asks for an event stream instead of JSON', async () => {
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.close()
      }
    })
    vi.mocked(fetch).mockResolvedValue(
      new Response(body, {
        status: 200,
        headers: { 'Content-Type': 'text/event-stream' }
      })
    )

    const client = new OrdifyApiClient({
      agentId: 'agent-1',
      publishableKey: 'pk_live_test',
      apiBaseUrl: 'http://localhost:5001'
    })
    await client.sendMessage('hi', 'session-1')

    const init = vi.mocked(fetch).mock.calls[0]?.[1] as {
      headers?: Record<string, string>
      cache?: string
    }
    expect(String(vi.mocked(fetch).mock.calls[0]?.[0])).toBe(
      'http://localhost:5001/widget/chat/agent-1'
    )
    expect(init.headers).toMatchObject({
      'x-ordify-publishable-key': 'pk_live_test',
      accept: 'text/event-stream'
    })
    expect(init.cache).toBe('no-store')
  })
})
