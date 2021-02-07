import { createCoordinator } from '../coordinator'

describe('Coordinator', () => {
  test('works', () => {
    const coordinator = createCoordinator()

    coordinator.addTargetToOutlet('outlet', 'source1')
    coordinator.addTargetToOutlet('outlet', 'source2')

    expect(coordinator.outletTargets).toMatchObject({
      outlet: expect.any(Object),
    })
    expect(coordinator.outletTargets.outlet).toMatchObject({
      source1: {
        active: false,
        order: Infinity,
      },
      source2: {
        active: false,
        order: Infinity,
      },
    })

    coordinator.removeTargetFromOutlet('outlet', 'source2')
    expect(coordinator.outletTargets.outlet).toMatchObject({
      source1: {
        active: false,
        order: Infinity,
      },
    })

    coordinator.activateTarget('outlet', 'source1')
    expect(coordinator.outletTargets.outlet.source1.active).toBe(true)
    coordinator.deactivateTarget('outlet', 'source1')
    expect(coordinator.outletTargets.outlet.source1.active).toBe(false)
  })
})
