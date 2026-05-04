/** Client-side allow list aligned with backend widget_attachments (subset for UX). */
export const DEFAULT_WIDGET_ALLOWED_MIMES: readonly string[] = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/csv',
  'text/plain',
  'text/markdown',
  'application/json',
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif'
]

const EXT_TO_MIME: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls': 'application/vnd.ms-excel',
  '.csv': 'text/csv',
  '.txt': 'text/plain',
  '.md': 'text/markdown',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif'
}

export function mimeFromFilename(name: string): string | undefined {
  const i = name.lastIndexOf('.')
  if (i < 0) return undefined
  return EXT_TO_MIME[name.slice(i).toLowerCase()]
}

export async function filesFromDataTransfer(dt: DataTransfer | null): Promise<File[]> {
  if (!dt) return []
  const out: File[] = []
  if (dt.files?.length) {
    for (let i = 0; i < dt.files.length; i++) {
      out.push(dt.files[i])
    }
  }
  return out
}

export function validateWidgetAttachmentFile(
  file: File,
  maxBytes: number,
  allowed: readonly string[]
): string | null {
  if (file.size > maxBytes) {
    return `File too large (max ${Math.floor(maxBytes / (1024 * 1024))}MB)`
  }
  if (allowed.includes(file.type)) return null
  const inferred = mimeFromFilename(file.name)
  if (inferred && allowed.includes(inferred)) return null
  return 'File type not allowed for attachments'
}
