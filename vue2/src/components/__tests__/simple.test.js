import { mount } from '@vue/test-utils'
import Vue from 'vue'

// Simple test component
const TestComponent = {
  template: '<div>{{ message }}</div>',
  props: ['message']
}

describe('Simple Vue 2 Test', () => {
  it('renders a simple component', () => {
    const wrapper = mount(TestComponent, {
      propsData: {
        message: 'Hello World'
      }
    })

    expect(wrapper.text()).toBe('Hello World')
  })

  it('can mount Vue component', () => {
    const TestVue = Vue.extend({
      template: '<div class="test">Test</div>'
    })

    const wrapper = mount(TestVue)
    expect(wrapper.find('.test').text()).toBe('Test')
  })
})
