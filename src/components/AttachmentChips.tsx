import { AttachmentItem } from '@/types'
import { FileText, Image as ImageIcon, X } from 'lucide-react'
import styled, { css } from 'styled-components'

export type AttachmentChipsTone = 'default' | 'onPrimary'

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
`

const defaultChipStyles = css<{ $isImage?: boolean }>`
  background: ${(p) =>
    p.$isImage ? 'rgba(59, 130, 246, 0.12)' : 'rgba(107, 114, 128, 0.12)'};
  color: #374151;
  border: 1px solid #e5e7eb;

  [data-theme='dark'] & {
    color: #e5e7eb;
    border-color: #4b5563;
    background: ${(p) =>
      p.$isImage ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.25)'};
  }
`

const onPrimaryChipStyles = css<{ $isImage?: boolean }>`
  background: ${(p) =>
    p.$isImage ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.16)'};
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.45);
`

const Chip = styled.div<{ $isImage?: boolean; $tone: AttachmentChipsTone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 220px;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  ${(p) => (p.$tone === 'onPrimary' ? onPrimaryChipStyles : defaultChipStyles)}
`

const Thumb = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`

const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`

const defaultRemoveStyles = css`
  color: #6b7280;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`

const onPrimaryRemoveStyles = css`
  color: rgba(255, 255, 255, 0.85);

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.2);
  }
`

const RemoveBtn = styled.button<{ $tone: AttachmentChipsTone }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  ${(p) =>
    p.$tone === 'onPrimary' ? onPrimaryRemoveStyles : defaultRemoveStyles}
`

interface AttachmentChipsProps {
  attachments: AttachmentItem[]
  onRemove?: (id: string) => void
  readOnly?: boolean
  /** Use onPrimary inside user message bubbles (colored background). */
  tone?: AttachmentChipsTone
}

export function AttachmentChips({
  attachments,
  onRemove,
  readOnly,
  tone = 'default',
}: AttachmentChipsProps) {
  if (!attachments.length) return null

  return (
    <Row>
      {attachments.map((a) => {
        const isImage = a.type === 'image'
        const showThumb = isImage && (a.preview || a.url)
        return (
          <Chip key={a.id} $isImage={isImage} $tone={tone} title={a.name}>
            {showThumb ? (
              <Thumb
                src={a.preview || a.url}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ) : isImage ? (
              <ImageIcon size={16} aria-hidden />
            ) : (
              <FileText size={16} aria-hidden />
            )}
            <Name>{a.name}</Name>
            {!readOnly && onRemove && (
              <RemoveBtn
                type="button"
                $tone={tone}
                onClick={() => onRemove(a.id)}
                aria-label={`Remove ${a.name}`}
              >
                <X size={14} />
              </RemoveBtn>
            )}
          </Chip>
        )
      })}
    </Row>
  )
}
