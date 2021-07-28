import { mount } from '@vue/test-utils'
import { defineComponent, resolveComponent, h, nextTick } from 'vue'
import { install } from '../install'
import TeleportSource from '../TeleportSource.vue'
import TeleportOutlet from '../TeleportOutlet.vue'
import { mockWarn } from 'jest-mock-warn'

const component = defineComponent({
  render() {
    const tS = resolveComponent('TeleportSource')
    const tO = resolveComponent('TeleportOutlet')
    return [
      h('div', {}, h(tS, { disabled: true, to: 'outlet' })),
      h('div', {}, h(tO, { name: 'outlet' })),
    ]
  },
})

describe('plugin installer', () => {
  mockWarn()
  test('globally registers components with default names', async () => {
    const wrapper = mount(component, {
      global: {
        plugins: [install],
      },
    })

    await nextTick()
    const tS = wrapper.findComponent(TeleportSource)
    const tO = wrapper.findComponent(TeleportOutlet)
    expect(tS.exists()).toBe(true)
    expect(tO.exists()).toBe(true)
  })
  test('globally registers plugins with custom names', async () => {
    const component = defineComponent({
      render() {
        const tS = resolveComponent('mySource')
        const tO = resolveComponent('myOutlet')
        return [
          h('div', {}, h(tS, { disabled: true, to: 'outlet' })),
          h('div', {}, h(tO, { name: 'outlet' })),
        ]
      },
    })
    const wrapper = mount(component, {
      global: {
        plugins: [
          [
            install,
            {
              teleportSource: 'mySource',
              teleportOutlet: 'myOutlet',
            },
          ],
        ],
      },
    })

    await nextTick()
    const tS = wrapper.findComponent(TeleportSource)
    const tO = wrapper.findComponent(TeleportOutlet)
    expect(tS.exists()).toBe(true)
    expect(tO.exists()).toBe(true)
  })

  test('skips global tegistration for components optionally', async () => {
    const wrapper = mount(component, {
      global: {
        plugins: [install],
      },
    })

    await nextTick()
    const tS = wrapper.findComponent(TeleportSource)
    const tO = wrapper.findComponent(TeleportOutlet)
    expect(tS.exists()).toBe(true)
    expect(tO.exists()).toBe(true)
  })

  test('globally registers plugins with custom names', async () => {
    const component = defineComponent({
      render() {
        const to = resolveComponent('teleport-outlet')
        const ts = resolveComponent('teleport-source')
        return [h('div', {}, h(ts)), h('div', {}, h(to))]
      },
    })
    const wrapper = mount(component, {
      global: {
        plugins: [
          [
            install,
            {
              teleportSource: false,
              teleportOutlet: false,
            },
          ],
        ],
      },
    })

    await nextTick()
    const tS = wrapper.findComponent(TeleportSource)
    const tO = wrapper.findComponent(TeleportOutlet)
    const tSE = wrapper.find('teleport-source')
    const tOE = wrapper.find('teleport-outlet')
    expect(tS.exists()).toBe(false)
    expect(tO.exists()).toBe(false)
    expect(tSE.exists()).toBe(true)
    expect(tOE.exists()).toBe(true)
    expect(
      `[Vue warn]: Failed to resolve component: teleport-source`
    ).toHaveBeenWarned()
    expect(
      `[Vue warn]: Failed to resolve component: teleport-outlet`
    ).toHaveBeenWarned()
  })
})
