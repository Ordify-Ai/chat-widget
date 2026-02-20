import React from 'react'
import { createRoot } from 'react-dom/client'
import { OrdifyChat } from './components/OrdifyChat'
import type { OrdifyConfig } from './types'

const DATA_PREFIX = 'data-ordify-'
const SCRIPT_SELECTOR = 'script[data-ordify-widget]'

function getDataConfig(script: HTMLScriptElement): Partial<OrdifyConfig> {
  const get = (key: string) => script.getAttribute(DATA_PREFIX + key)
  const config: Partial<OrdifyConfig> = {
    agentId: get('agent-id') ?? undefined,
    apiKey: get('api-key') ?? undefined,
    apiBaseUrl: get('api-base-url') ?? 'https://r.ordify.ai',
    mode: (get('mode') as OrdifyConfig['mode']) ?? 'floating',
    position: (get('position') as OrdifyConfig['position']) ?? 'bottom-right',
    buttonText: get('button-text') ?? undefined,
    chatName: get('chat-name') ?? undefined,
    primaryColor: get('primary-color') ?? undefined,
    agentImage: get('agent-image') ?? undefined,
    welcomeMessage: get('welcome-message') ?? undefined,
    welcomeImage: get('welcome-image') ?? undefined,
    placeholder: get('placeholder') ?? undefined,
    theme: (get('theme') as OrdifyConfig['theme']) ?? undefined,
  }
  const quickQuestionsRaw = get('quick-questions')
  if (quickQuestionsRaw) {
    try {
      config.quickQuestions = JSON.parse(quickQuestionsRaw) as string[]
    } catch {
      config.quickQuestions = quickQuestionsRaw.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }
  const height = get('height')
  if (height) config.height = height
  const showHeader = get('show-header')
  if (showHeader !== null) config.showHeader = showHeader !== 'false' && showHeader !== '0'
  const resizable = get('resizable')
  if (resizable !== null) config.resizable = resizable !== 'false' && resizable !== '0'
  return config
}

function mount(container: HTMLElement | null | undefined, config: OrdifyConfig): void {
  if (!config.agentId || !config.apiKey) {
    console.error('Ordify Chat Widget: agentId and apiKey are required.')
    return
  }
  const rootEl = container ?? (() => {
    const div = document.createElement('div')
    div.id = 'ordify-chat-widget-root'
    document.body.appendChild(div)
    return div
  })()
  const root = createRoot(rootEl)
  root.render(React.createElement(OrdifyChat, config))
}

function autoMount(): void {
  const scripts = document.querySelectorAll<HTMLScriptElement>(SCRIPT_SELECTOR)
  scripts.forEach((script) => {
    const config = getDataConfig(script)
    if (!config.agentId || !config.apiKey) {
      console.warn('Ordify Chat Widget: script tag missing data-ordify-agent-id or data-ordify-api-key. Skip auto-mount.')
      return
    }
    const containerId = script.getAttribute(DATA_PREFIX + 'container-id')
    const container = containerId ? document.getElementById(containerId) : null
    mount(container, config as OrdifyConfig)
  })
}

declare global {
  interface Window {
    OrdifyChatWidget: {
      mount: typeof mount
    }
  }
}

window.OrdifyChatWidget = { mount }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount)
} else {
  autoMount()
}
