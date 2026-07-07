// Utility functions for the chat widget

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function formatTime(timestamp: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(timestamp)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function normalizeMarkdown(content: string): string {
  if (!content) return content

  const lines = content.split('\n')
  let inFence = false
  let fenceChar = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      const char = fenceMatch[1][0]
      if (!inFence) {
        inFence = true
        fenceChar = char
      } else if (char === fenceChar) {
        inFence = false
        fenceChar = ''
      }
      continue
    }

    if (inFence) continue

    line = line.replace(/^(\s{0,3})(#{1,6})([^#\s])/, '$1$2 $3')
    line = line.replace(/^(\s*)(\d{1,9})\.([^\s\d])/, '$1$2. $3')
    line = line.replace(/^(\s*)([-+])([A-Za-z])/, '$1$2 $3')

    lines[i] = line
  }

  return lines.join('\n')
}
