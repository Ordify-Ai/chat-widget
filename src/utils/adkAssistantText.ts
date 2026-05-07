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
