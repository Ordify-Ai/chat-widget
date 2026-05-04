import { AttachmentItem, OrdifyConfig } from '@/types'
import {
  DEFAULT_WIDGET_ALLOWED_MIMES,
  validateWidgetAttachmentFile
} from '@/utils/attachments'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useWidgetAttachmentStaging(
  config: OrdifyConfig,
  uploadAttachment: (file: File) => Promise<AttachmentItem>
) {
  const maxBytes = (config.maxAttachmentSizeMB ?? 10) * 1024 * 1024
  const maxFiles = config.maxAttachments ?? 3
  const allowed = (
    config.allowedAttachmentTypes?.length ? config.allowedAttachmentTypes : DEFAULT_WIDGET_ALLOWED_MIMES
  ) as readonly string[]

  const enabled = Boolean(config.enableAttachments && config.publishableKey)

  const [staged, setStaged] = useState<AttachmentItem[]>([])
  const [attachmentError, setAttachmentError] = useState<string | null>(null)
  const stagedRef = useRef<AttachmentItem[]>([])

  useEffect(() => {
    stagedRef.current = staged
  }, [staged])

  const addFiles = useCallback(
    async (files: File[]) => {
      if (!enabled) return
      setAttachmentError(null)
      for (const file of files) {
        if (stagedRef.current.length >= maxFiles) {
          setAttachmentError(`At most ${maxFiles} attachments per message.`)
          break
        }
        const err = validateWidgetAttachmentFile(file, maxBytes, allowed)
        if (err) {
          setAttachmentError(`${file.name}: ${err}`)
          continue
        }
        try {
          const item = await uploadAttachment(file)
          setStaged((prev) => {
            if (prev.length >= maxFiles) return prev
            const next = [...prev, item]
            stagedRef.current = next
            return next
          })
        } catch (e) {
          setAttachmentError(e instanceof Error ? e.message : 'Upload failed')
        }
      }
    },
    [allowed, enabled, maxBytes, maxFiles, uploadAttachment]
  )

  const removeStaged = useCallback((id: string) => {
    setStaged((prev) => {
      const next = prev.filter((a) => a.id !== id)
      stagedRef.current = next
      return next
    })
  }, [])

  const clearStaged = useCallback(() => {
    setStaged([])
    stagedRef.current = []
    setAttachmentError(null)
  }, [])

  const appendStaged = useCallback(
    (item: AttachmentItem) => {
      setAttachmentError(null)
      setStaged((prev) => {
        if (prev.length >= maxFiles) return prev
        const next = [...prev, item]
        stagedRef.current = next
        return next
      })
    },
    [maxFiles]
  )

  return {
    enabled,
    staged,
    attachmentError,
    setAttachmentError,
    addFiles,
    appendStaged,
    removeStaged,
    clearStaged,
    maxFiles,
    maxBytes,
    allowed
  }
}
