import { AttachmentItem } from '@/types'
import {
  DEFAULT_WIDGET_ALLOWED_MIMES,
  validateWidgetAttachmentFile
} from '@/utils/attachments'
import { Paperclip } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #374151;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  [data-theme='dark'] & {
    background: #374151;
    border-color: #4b5563;
    color: #e5e7eb;
  }
`

const IntegratedAttachButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(15, 23, 42, 0.06);
    color: #334155;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    color: #94a3b8;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
    }
  }

  [data-theme='dark'] & {
    color: #94a3b8;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.08);
      color: #e2e8f0;
    }
  }
`

interface AttachmentPickerProps {
  disabled?: boolean
  integrated?: boolean
  maxFileBytes: number
  maxFiles: number
  allowedMime?: readonly string[]
  currentCount: number
  uploadAttachment: (file: File) => Promise<AttachmentItem>
  onUploaded: (item: AttachmentItem) => void
  onError?: (message: string) => void
}

export function AttachmentPicker({
  disabled,
  integrated = false,
  maxFileBytes,
  maxFiles,
  allowedMime = DEFAULT_WIDGET_ALLOWED_MIMES,
  currentCount,
  uploadAttachment,
  onUploaded,
  onError
}: AttachmentPickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [busy, setBusy] = React.useState(false)

  const accept = React.useMemo(
    () =>
      [
        '.pdf,.docx,.xlsx,.xls,.csv,.txt,.md,.json',
        'image/png,image/jpeg,image/webp,image/gif'
      ].join(','),
    []
  )

  const processFiles = React.useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files)
      if (!list.length) return

      let added = 0
      for (const file of list) {
        if (currentCount + added >= maxFiles) {
          onError?.(`You can attach at most ${maxFiles} files per message.`)
          break
        }
        const err = validateWidgetAttachmentFile(file, maxFileBytes, allowedMime)
        if (err) {
          onError?.(`${file.name}: ${err}`)
          continue
        }
        try {
          setBusy(true)
          const item = await uploadAttachment(file)
          onUploaded(item)
          added += 1
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Upload failed'
          onError?.(msg)
        } finally {
          setBusy(false)
        }
      }
    },
    [allowedMime, currentCount, maxFileBytes, maxFiles, onError, onUploaded, uploadAttachment]
  )

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files
    if (f?.length) void processFiles(f)
    e.target.value = ''
  }

  const atLimit = currentCount >= maxFiles
  const isDisabled = Boolean(disabled || busy || atLimit)
  const Btn = integrated ? IntegratedAttachButton : IconButton

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        style={{ display: 'none' }}
        onChange={onInputChange}
      />
      <Btn
        type="button"
        disabled={isDisabled}
        aria-label="Attach file"
        title="Attach file"
        onClick={() => inputRef.current?.click()}
      >
        <Paperclip size={16} strokeWidth={2} />
      </Btn>
    </>
  )
}
