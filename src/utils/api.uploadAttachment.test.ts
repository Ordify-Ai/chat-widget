import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { OrdifyApiClient } from './api'

describe('OrdifyApiClient.uploadAttachment', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('throws when only apiKey is configured', async () => {
    const client = new OrdifyApiClient({
      agentId: 'agent-1',
      apiKey: 'secret',
      apiBaseUrl: 'http://localhost:5001',
    })
    const file = new File(['%PDF'], 'doc.pdf', { type: 'application/pdf' })
    await expect(client.uploadAttachment(file)).rejects.toThrow(
      /publishableKey/,
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it('POSTs FormData to /widget/attachments with publishable key header', async () => {
    const body = {
      id: 'att-1',
      name: 'doc.pdf',
      type: 'document',
      url: 'https://storage.example/o/doc.pdf',
      content_type: 'application/pdf',
      size: 4,
    }
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const client = new OrdifyApiClient({
      agentId: 'agent-1',
      publishableKey: 'pk_live_test',
      apiBaseUrl: 'http://localhost:5001',
    })
    const file = new File(['%PDF'], 'doc.pdf', { type: 'application/pdf' })
    const item = await client.uploadAttachment(file)

    expect(fetch).toHaveBeenCalledTimes(1)
    const call = vi.mocked(fetch).mock.calls[0]
    const url = String(call[0])
    const init = call[1] as {
      method?: string
      headers?: Record<string, string>
      body?: FormData
    }
    expect(url).toBe('http://localhost:5001/widget/attachments')
    expect(init.method).toBe('POST')
    expect(init.headers).toMatchObject({
      'x-ordify-publishable-key': 'pk_live_test',
      accept: 'application/json',
    })
    expect(init.body).toBeInstanceOf(FormData)
    expect(item.id).toBe('att-1')
    expect(item.url).toBe(body.url)
    expect(item.content_type).toBe('application/pdf')
    expect(item.type).toBe('document')
  })

  it('throws with API detail on non-OK response', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ detail: 'quota exceeded' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const client = new OrdifyApiClient({
      agentId: 'agent-1',
      publishableKey: 'pk_live_test',
      apiBaseUrl: 'http://localhost:5001',
    })
    const file = new File(['x'], 'a.png', { type: 'image/png' })
    await expect(client.uploadAttachment(file)).rejects.toThrow(
      /quota exceeded/,
    )
  })
})
