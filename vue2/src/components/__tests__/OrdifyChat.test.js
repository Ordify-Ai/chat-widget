import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import OrdifyChat from '../OrdifyChat.vue'

describe('OrdifyChat', () => {
  const defaultProps = {
    agentId: 'f357fdfc-cc93-479b-b350-38fd7c86ac37',
    apiKey: 'CiQAw4W/1y3kNQ8mzDJInvrZLuGn1zeOvOE9Oav3i88isApusjQSVABz4cb0l6lTTuek/usYbS1TDR2eayLzsI53Q5bGSuAf91O6b3H9uOYAdyeQsmFmOEwo6/Bh5yCJDfyBIBoOjUTBKqiKUAKvCTMIJoZCKSzsu3PKuA==',
    apiBaseUrl: 'https://api.ordify.ai'
  }

  it('renders floating mode by default', () => {
    const wrapper = mount(OrdifyChat, {
      propsData: defaultProps
    })

    expect(wrapper.exists()).toBe(true)
    // Should render FloatingChat component
    expect(wrapper.findComponent({ name: 'FloatingChat' }).exists()).toBe(true)
  })

  it('renders embedded mode when specified', () => {
    const wrapper = mount(OrdifyChat, {
      propsData: {
        ...defaultProps,
        mode: 'embedded'
      }
    })

    expect(wrapper.exists()).toBe(true)
    // Should render EmbeddedChat component
    expect(wrapper.findComponent({ name: 'EmbeddedChat' }).exists()).toBe(true)
  })

  it('passes props correctly to child components', () => {
    const wrapper = mount(OrdifyChat, {
      propsData: {
        ...defaultProps,
        mode: 'embedded',
        chatName: 'Test Chat',
        primaryColor: '#ff0000'
      }
    })

    const embeddedChat = wrapper.findComponent({ name: 'EmbeddedChat' })
    expect(embeddedChat.props('config')).toBeDefined()
    expect(embeddedChat.props('config').chatName).toBe('Test Chat')
    expect(embeddedChat.props('config').primaryColor).toBe('#ff0000')
  })

  it('handles session created event', async () => {
    const onSessionCreated = vi.fn()
    const wrapper = mount(OrdifyChat, {
      propsData: {
        ...defaultProps,
        onSessionCreated
      }
    })

    // Simulate session creation
    wrapper.vm.$emit('session-created', 'test-session-id')
    
    expect(onSessionCreated).toHaveBeenCalledWith('test-session-id')
  })
})
