import { mount } from '@vue/test-utils'
import TeleportOutlet from '../TeleportOutlet.vue'
import { createCoordinator, coordinatorKey } from '../coordinator'
import { nextTick } from 'vue'

const mountOutlet = (
  options: Record<string, any> = {},
  globals: Record<string, any> = {}
) => {
  const coordinator = createCoordinator()
  const wrapper = mount(TeleportOutlet as unknown as any, {
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

describe('Teleport Outlet', () => {
  test('renders mount targets for sources', async () => {
    const { wrapper, coordinator } = mountOutlet({
      props: { name: 'outlet' },
    })

    coordinator.addConnection('outlet', 'source1')
    coordinator.addConnection('outlet', 'source2')

    await nextTick()

    expect(wrapper.findAll('[data-teleport-plus]')).toHaveLength(2)
  })

  test('hides mount targets for disabled sources', async () => {
    const { wrapper, coordinator } = mountOutlet({
      props: { name: 'outlet' },
    })

    coordinator.addConnection('outlet', 'source1')
    coordinator.addConnection('outlet', 'source2')

    coordinator.switchEnabledState('outlet', 'source1', false)

    await nextTick()
    const els = wrapper.findAll('[data-teleport-plus]')
    expect(els[0].isVisible()).toBe(false)
    expect(els[1].isVisible()).toBe(true)
  })

  test('renders custom element for mount targets', async () => {
    const { wrapper, coordinator } = mountOutlet({
      props: { name: 'outlet', tag: 'span' },
    })

    coordinator.addConnection('outlet', 'source1')
    await nextTick()
    expect(wrapper.find('[data-teleport-plus]').element.tagName).toBe('SPAN')
  })

  test('send event on unmount', async () => {
    const { wrapper, coordinator } = mountOutlet({
      props: { name: 'outlet' },
    })
    coordinator.addConnection('outlet', 'source1')
    await nextTick()
    const spy = jest.fn()
    coordinator.bus.on('source1', spy)
    wrapper.unmount()
    await nextTick()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
