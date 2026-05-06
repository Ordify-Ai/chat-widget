import { AttachmentItem } from '@/types'
import { FileText, Image as ImageIcon, X } from 'lucide-react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
`

const Chip = styled.div<{ $isImage?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 220px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  background: ${(p) => (p.$isImage ? 'rgba(59, 130, 246, 0.12)' : 'rgba(107, 114, 128, 0.12)')};
  color: #374151;
  border: 1px solid #e5e7eb;

  [data-theme='dark'] & {
    color: #e5e7eb;
    border-color: #4b5563;
    background: ${(p) => (p.$isImage ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.25)')};
  }
`

const Thumb = styled.img`
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 4px;
`

const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`

const RemoveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #6b7280;
  border-radius: 4px;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
`

interface AttachmentChipsProps {
  attachments: AttachmentItem[]
  onRemove?: (id: string) => void
  readOnly?: boolean
}

export function AttachmentChips({ attachments, onRemove, readOnly }: AttachmentChipsProps) {
  if (!attachments.length) return null

  return (
    <Row>
      {attachments.map((a) => {
        const isImage = a.type === 'image'
        const showThumb = isImage && (a.preview || a.url)
        return (
          <Chip key={a.id} $isImage={isImage} title={a.name}>
            {showThumb ? (
              <Thumb src={a.preview || a.url} alt="" loading="lazy" decoding="async" />
            ) : isImage ? (
              <ImageIcon size={16} aria-hidden />
            ) : (
              <FileText size={16} aria-hidden />
            )}
            <Name>{a.name}</Name>
            {!readOnly && onRemove && (
              <RemoveBtn type="button" onClick={() => onRemove(a.id)} aria-label={`Remove ${a.name}`}>
                <X size={14} />
              </RemoveBtn>
            )}
          </Chip>
        )
      })}
    </Row>
  )
}
