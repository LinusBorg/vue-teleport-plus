import { mount } from '@vue/test-utils'
import TeleportSource from '../TeleportSource.vue'
import { createCoordinator, coordinatorKey } from '../coordinator'
import { h, nextTick } from 'vue'

const mountSource = (
  options: Record<string, any> = {},
  globals: Record<string, any> = {}
) => {
  const coordinator = createCoordinator()
  const wrapper = mount(TeleportSource as unknown as any, {
    ...options,
    global: {
      provide: {
        [coordinatorKey as unknown as string]: coordinator,
      },
      ...globals,
    },
  })

  return { wrapper, coordinator }
}
describe('TeleportSource', () => {
  beforeAll(() => {
    const newEl = document.createElement('DIV')
    newEl.dataset['teleportPlusFallbackTarget'] = undefined
    document.body.appendChild(newEl)
  })
  test('adds Connection with generated name', async () => {
    const { wrapper, coordinator } = mountSource({
      props: { to: 'outlet' },
    })
    await nextTick()
    expect(wrapper.exists()).toBe(true)
    const name: string = wrapper.props().name
    expect(coordinator.outletTargets.outlet[name].enabled).toBe(true)
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  test('adds Connection with custom name', async () => {
    const { wrapper, coordinator } = mountSource({
      props: { to: 'outlet', name: 'source1' },
    })
    await nextTick()
    expect(wrapper.exists()).toBe(true)
    expect(coordinator.outletTargets.outlet.source1.enabled).toBe(true)
  })

  test('disabled shows content locally', async () => {
    const { wrapper, coordinator } = mountSource({
      props: {
        to: 'outlet',
        disabled: true,
        name: 'source1',
      },
      slots: {
        default: h('p', 'Test'),
      },
    })

    coordinator.switchMountedState('outlet', 'source1', true)

    await nextTick()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.get('p').text()).toBe('Test')
  })
})
