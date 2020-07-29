import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Buefy from 'buefy'
import FilterPoke from '@/components/FilterPoke.vue'

Vue.use(Buefy)

describe('FilterPoke', () => {
  const wrapper = mount(FilterPoke, {
    propsData: {
      pokeNameSelected: 'Charizar',
      pokeTypeSelected: ['normal', 'fire'],
      pokeAbilitySelected: ['manger', 'dormir', 'boire']
    }
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('check input value is correct', () => {
    expect(wrapper.find('input').element.value).toBe('Charizar')
  })
})
