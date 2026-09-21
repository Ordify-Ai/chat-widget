import type { StreamingResponse, ToolActivity } from '@/types'

export function stripAdkToolStatusParagraphsFromAssistantText(text: string): string {
  let s = text.replace(/\r\n/g, '\n')
  s = s.replace(/\n\nUsing [^\n]+\.{3}(?:\s*\n)+/g, '\n\n')
  s = s.replace(/\n\nAction completed(?:\s*\n)+/g, '\n\n')
  s = s.replace(/^Using [^\n]+\.{3}(?:\s*\n)+/m, '')
  s = s.replace(/^Action completed(?:\s*\n)+/m, '')
  s = s.replace(/\n{3,}/g, '\n\n')
  return s
}

export function isAdkToolHistoryPayload(msg: { type?: string | null }): boolean {
  const t = msg.type
  return t === 'adk_tool' || t === 'ADK_TOOL'
}

export function isToolStatusOnlyText(text: string): boolean {
  if (!text.trim()) return false
  return !stripAdkToolStatusParagraphsFromAssistantText(text).trim()
}

export function friendlyToolLabel(name: string): string {
  const n = name.toLowerCase().replace(/[_-]+/g, ' ').trim()
  if (
    n.includes('retrieve') ||
    n.includes('document') ||
    n.includes('rag') ||
    n.includes('knowledge')
  ) {
    return 'Searching knowledge'
  }
  if (n.includes('search') || n.includes('browse') || n.includes('google')) {
    return 'Searching the web'
  }
  if (n.includes('image')) return 'Generating image'
  return name.trim() ? `Using ${name.trim()}` : 'Working'
}

export function toolActivityFromStatusText(text: string): ToolActivity | null {
  const using = text.match(/Using\s+([^\n.]+)\.{3}/i)
  if (using) {
    return {
      label: friendlyToolLabel(using[1].trim()),
      status: 'running',
      toolName: using[1].trim()
    }
  }
  if (/Action completed/i.test(text)) {
    return { label: 'Done', status: 'completed' }
  }
  if (isToolStatusOnlyText(text)) {
    return {
      label: text.replace(/\s+/g, ' ').trim(),
      status: 'running'
    }
  }
  return null
}

export function toolActivityFromStreamEvent(
  response: StreamingResponse
): ToolActivity | null {
  if (response.type === 'tool') {
    const name = response.toolDisplayName || response.toolName || ''
    const raw = (response.text || '').trim()
    const looksLikeUsing = /^Using\s+/i.test(raw)
    const status =
      response.toolStatus === 'completed' || response.toolStatus === 'error'
        ? response.toolStatus
        : 'running'
    return {
      label: looksLikeUsing || !raw ? friendlyToolLabel(name || raw) : raw.replace(/\.{3}$/, ''),
      status,
      toolName: response.toolName || name || undefined
    }
  }
  if (response.type === 'stream' && response.text && isToolStatusOnlyText(response.text)) {
    return toolActivityFromStatusText(response.text)
  }
  return null
}
