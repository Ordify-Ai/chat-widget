import { copyToClipboard } from '@/utils/copyToClipboard'
import { Copy, FileDown } from 'lucide-react'
import React from 'react'
import styled from 'styled-components'

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  padding-left: 2px;
`

const IconButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #6b7280;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    background: #f3f4f6;
    color: #111827;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [data-theme='dark'] & {
    color: #9ca3af;

    &:hover:not(:disabled) {
      background: #3f3f46;
      color: #f9fafb;
    }
  }
`

export interface AssistantMessageActionsProps {
  content: string
  disabled: boolean
  onExportPdf: (content: string) => Promise<void>
}

export function AssistantMessageActions({
  content,
  disabled,
  onExportPdf
}: AssistantMessageActionsProps) {
  const [pdfBusy, setPdfBusy] = React.useState(false)

  const handleCopy = () => {
    void copyToClipboard(content)
  }

  const handlePdf = async () => {
    setPdfBusy(true)
    try {
      await onExportPdf(content)
    } finally {
      setPdfBusy(false)
    }
  }

  return (
    <ActionRow>
      <IconButton
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        aria-label="Copy message"
        title="Copy"
      >
        <Copy size={16} strokeWidth={1.75} />
      </IconButton>
      <IconButton
        type="button"
        onClick={() => void handlePdf()}
        disabled={disabled || pdfBusy}
        aria-label="Download PDF"
        title="Download PDF"
      >
        <FileDown size={16} strokeWidth={1.75} />
      </IconButton>
    </ActionRow>
  )
}
