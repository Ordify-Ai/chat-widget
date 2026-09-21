import type { ToolActivity } from '@/types'
import { BookOpen, Globe, Image as ImageIcon, LoaderCircle, Wrench } from 'lucide-react'
import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  margin-bottom: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #374151;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  cursor: default;

  svg.spin {
    animation: ${spin} 0.8s linear infinite;
  }

  [data-ordify-chat][data-theme='dark'] & {
    border-color: #374151;
    background: #111827;
    color: #e5e7eb;
  }
`

function iconFor(activity: ToolActivity) {
  const key = `${activity.toolName || ''} ${activity.label}`.toLowerCase()
  if (key.includes('knowledge') || key.includes('retrieve') || key.includes('document')) {
    return BookOpen
  }
  if (key.includes('web') || key.includes('search') || key.includes('browse')) {
    return Globe
  }
  if (key.includes('image')) {
    return ImageIcon
  }
  return Wrench
}

export function ToolActivityChip({ activity }: { activity: ToolActivity }) {
  const Icon = iconFor(activity)
  const running = activity.status === 'running'
  return (
    <Chip role="status" aria-live="polite" aria-label={activity.label}>
      {running ? (
        <LoaderCircle size={14} className="spin" aria-hidden />
      ) : (
        <Icon size={14} aria-hidden />
      )}
      <span>{activity.label}</span>
    </Chip>
  )
}
