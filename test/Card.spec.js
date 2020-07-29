import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Buefy from 'buefy'
import Card from '@/components/Card.vue'

Vue.use(Buefy)

describe('Card', () => {
  const wrapper = mount(Card, {
    propsData: {
      title: 'Je suis un titre',
      icon: 'http://localhost:3000/assets/test.jpg'
    }
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('title convert to uppercase', () => {
    expect(wrapper.find('span').text()).toBe('JE SUIS UN TITRE')
  })
})
