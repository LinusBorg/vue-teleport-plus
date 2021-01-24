import { mount } from '@vue/test-utils'
import TeleportSource from '../TeleportSource.vue'
import { createCoordinator, coordinatorKey } from '../coordinator'
import { DefineComponent, h, nextTick } from 'vue'

const mountSource = (
  options: Record<string, any> = {},
  globals: Record<string, any> = {}
) => {
  const coordinator = createCoordinator()
  const wrapper = mount((TeleportSource as unknown) as any, {
    ...options,
    global: {
      provide: {
        [(coordinatorKey as unknown) as string]: coordinator,
      },
      ...globals,
    },
  })

  return { wrapper, coordinator }
}
describe('TeleportSource', () => {
  test('mounts', () => {
    const { wrapper } = mountSource({
      props: { to: 'outlet' },
    })
    expect(wrapper.exists()).toBe(true)
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

    coordinator.activateTarget('outlet', 'source1')

    await nextTick()

    expect(wrapper.exists()).toBe(true)
  })
})
