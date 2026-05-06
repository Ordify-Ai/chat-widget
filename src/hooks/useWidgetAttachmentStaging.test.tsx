import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { OrdifyConfig } from '@/types'
import { useWidgetAttachmentStaging } from './useWidgetAttachmentStaging'

function pngFile(size = 100) {
  return new File([new Uint8Array(size)], 'x.png', { type: 'image/png' })
}

describe('useWidgetAttachmentStaging', () => {
  it('is disabled without publishableKey even when enableAttachments is true', async () => {
    const upload = vi.fn()
    const config: OrdifyConfig = {
      agentId: 'a',
      apiKey: 'legacy',
      enableAttachments: true,
    }
    const { result } = renderHook(() =>
      useWidgetAttachmentStaging(config, upload),
    )
    expect(result.current.enabled).toBe(false)
    await act(async () => {
      await result.current.addFiles([pngFile()])
    })
    expect(upload).not.toHaveBeenCalled()
  })

  it('is disabled when publishableKey is set but enableAttachments is false', () => {
    const upload = vi.fn()
    const config: OrdifyConfig = {
      agentId: 'a',
      publishableKey: 'pk_live_x',
      enableAttachments: false,
    }
    const { result } = renderHook(() =>
      useWidgetAttachmentStaging(config, upload),
    )
    expect(result.current.enabled).toBe(false)
  })

  it('is enabled when publishableKey and enableAttachments are set', () => {
    const upload = vi.fn()
    const config: OrdifyConfig = {
      agentId: 'a',
      publishableKey: 'pk_live_x',
      enableAttachments: true,
    }
    const { result } = renderHook(() =>
      useWidgetAttachmentStaging(config, upload),
    )
    expect(result.current.enabled).toBe(true)
  })

  it('calls uploadAttachment per valid file when enabled', async () => {
    const item = {
      id: '1',
      name: 'x.png',
      type: 'image' as const,
      url: 'https://x',
      content_type: 'image/png',
    }
    const upload = vi.fn().mockResolvedValue(item)
    const config: OrdifyConfig = {
      agentId: 'a',
      publishableKey: 'pk_live_x',
      enableAttachments: true,
      maxAttachments: 3,
    }
    const { result } = renderHook(() =>
      useWidgetAttachmentStaging(config, upload),
    )
    await act(async () => {
      await result.current.addFiles([pngFile()])
    })
    expect(upload).toHaveBeenCalledTimes(1)
    expect(result.current.staged).toHaveLength(1)
    expect(result.current.staged[0].id).toBe('1')
  })

  it('sets attachmentError when max files exceeded', async () => {
    const item = {
      id: '1',
      name: 'x.png',
      type: 'image' as const,
      url: 'https://x',
      content_type: 'image/png',
    }
    const upload = vi.fn().mockResolvedValue(item)
    const config: OrdifyConfig = {
      agentId: 'a',
      publishableKey: 'pk_live_x',
      enableAttachments: true,
      maxAttachments: 1,
    }
    const { result } = renderHook(() =>
      useWidgetAttachmentStaging(config, upload),
    )
    await act(async () => {
      await result.current.addFiles([pngFile(10), pngFile(20)])
    })
    expect(upload).toHaveBeenCalledTimes(1)
    expect(result.current.staged).toHaveLength(1)
    expect(result.current.attachmentError).toMatch(/At most 1/)
  })
})
