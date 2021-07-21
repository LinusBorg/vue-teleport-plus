import { createCoordinator } from '../coordinator'

describe('Coordinator', () => {
  test('works', () => {
    const coordinator = createCoordinator()

    coordinator.addConnection('outlet', 'source1')
    coordinator.addConnection('outlet', 'source2', 1)

    expect(coordinator.outletTargets).toMatchObject({
      outlet: expect.any(Object),
    })
    expect(coordinator.outletTargets.outlet).toMatchObject({
      source1: {
        source: 'source1',
        enabled: true,
        outlet: 'outlet',
        mounted: false,
        order: Infinity,
      },
      source2: {
        source: 'source2',
        enabled: true,
        outlet: 'outlet',
        mounted: false,
        order: 1,
      },
    })

    coordinator.removeConnection('outlet', 'source2')
    expect(coordinator.outletTargets.outlet).toMatchObject({
      source1: {
        source: 'source1',
        enabled: true,
        outlet: 'outlet',
        mounted: false,
        order: Infinity,
      },
    })

    coordinator.switchEnabledState('outlet', 'source1', true)
    expect(coordinator.outletTargets.outlet.source1.enabled).toBe(true)
    coordinator.switchEnabledState('outlet', 'source1', false)
    expect(coordinator.outletTargets.outlet.source1.enabled).toBe(false)

    coordinator.switchMountedState('outlet', 'source1', true)
    expect(coordinator.outletTargets.outlet.source1.mounted).toBe(true)

    const spy = jest.fn()
    coordinator.bus.on('source1', spy)
    coordinator.switchMountedState('outlet', 'source1', false)
    expect(coordinator.outletTargets.outlet.source1.mounted).toBe(false)
    expect(spy).toHaveBeenCalled()
  })
})
