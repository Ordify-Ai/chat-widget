import { mount } from '@vue/test-utils'
import ChatHeader from '../ChatHeader.vue'

describe('ChatHeader', () => {
  it('renders chat name correctly', () => {
    const wrapper = mount(ChatHeader, {
      propsData: {
        chatName: 'Test Assistant',
        primaryColor: '#3b82f6'
      }
    })

    expect(wrapper.text()).toContain('Test Assistant')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(ChatHeader, {
      propsData: {
        chatName: 'Test Assistant',
        primaryColor: '#3b82f6'
      }
    })

    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.emitted().close).toHaveLength(1)
  })

  it('applies primary color correctly', () => {
    const wrapper = mount(ChatHeader, {
      propsData: {
        chatName: 'Test Assistant',
        primaryColor: '#ff0000'
      }
    })

    const header = wrapper.find('.chat-header')
    expect(header.element.style.backgroundColor).toBe('rgb(255, 0, 0)')
  })
})
