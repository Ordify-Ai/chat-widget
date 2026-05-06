import { describe, expect, it } from 'vitest'
import {
  DEFAULT_WIDGET_ALLOWED_MIMES,
  mimeFromFilename,
  validateWidgetAttachmentFile,
} from './attachments'

describe('validateWidgetAttachmentFile', () => {
  const maxBytes = 10 * 1024 * 1024
  const allowed = DEFAULT_WIDGET_ALLOWED_MIMES

  it('accepts allowed MIME by file.type', () => {
    const f = new File([new Uint8Array(100)], 'x.png', { type: 'image/png' })
    expect(validateWidgetAttachmentFile(f, maxBytes, allowed)).toBeNull()
  })

  it('accepts allowed MIME inferred from extension when type empty', () => {
    const f = new File([new Uint8Array(100)], 'doc.pdf', { type: '' })
    expect(validateWidgetAttachmentFile(f, maxBytes, allowed)).toBeNull()
  })

  it('rejects oversize files', () => {
    const f = new File([new Uint8Array(maxBytes + 1)], 'big.png', {
      type: 'image/png',
    })
    expect(validateWidgetAttachmentFile(f, maxBytes, allowed)).toMatch(
      /File too large/,
    )
  })

  it('rejects disallowed types', () => {
    const f = new File([new Uint8Array(10)], 'x.exe', {
      type: 'application/octet-stream',
    })
    expect(validateWidgetAttachmentFile(f, maxBytes, allowed)).toMatch(
      /not allowed/,
    )
  })

  it('respects custom allowedAttachmentTypes list', () => {
    const f = new File([new Uint8Array(10)], 'x.txt', { type: 'text/plain' })
    expect(
      validateWidgetAttachmentFile(f, maxBytes, ['application/pdf']),
    ).toMatch(/not allowed/)
  })
})

describe('mimeFromFilename', () => {
  it('maps known extensions', () => {
    expect(mimeFromFilename('a.PDF')).toBe('application/pdf')
    expect(mimeFromFilename('b.JPEG')).toBe('image/jpeg')
  })

  it('returns undefined without extension', () => {
    expect(mimeFromFilename('noext')).toBeUndefined()
  })
})
