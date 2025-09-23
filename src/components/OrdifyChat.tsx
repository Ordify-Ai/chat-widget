import { useOrdifyChat } from '@/hooks/useOrdifyChat'
import { useOrdifyConfig } from '@/hooks/useOrdifyConfig'
import { OrdifyConfig } from '@/types'
import { EmbeddedChat } from './EmbeddedChat'
import { FloatingChat } from './FloatingChat'
import { InlineChat } from './InlineChat'
import { ModalChat } from './ModalChat'

export function OrdifyChat(props: OrdifyConfig) {
  const config = useOrdifyConfig(props)
  const chat = useOrdifyChat(config)

  switch (config.mode) {
    case 'floating':
      return <FloatingChat config={config} chat={chat} />
    case 'embedded':
      return <EmbeddedChat config={config} chat={chat} />
    case 'inline':
      return <InlineChat config={config} chat={chat} />
    case 'modal':
      return <ModalChat config={config} chat={chat} />
    default:
      return <FloatingChat config={config} chat={chat} />
  }
}
