import { mount } from '@vue/test-utils'
import MarkdownRenderer from '../MarkdownRenderer.vue'

describe('MarkdownRenderer', () => {
  it('renders plain text correctly', () => {
    const wrapper = mount(MarkdownRenderer, {
      propsData: {
        content: 'Hello world'
      }
    })

    expect(wrapper.text()).toContain('Hello world')
  })

  it('renders markdown correctly', () => {
    const wrapper = mount(MarkdownRenderer, {
      propsData: {
        content: '**Bold text** and *italic text*'
      }
    })

    // The markdown should be rendered as HTML
    expect(wrapper.html()).toContain('<strong>Bold text</strong>')
    expect(wrapper.html()).toContain('<em>italic text</em>')
  })

  it('handles empty content', () => {
    const wrapper = mount(MarkdownRenderer, {
      propsData: {
        content: ''
      }
    })

    expect(wrapper.text()).toBe('')
  })
})
