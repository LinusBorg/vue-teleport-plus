import { inject, InjectionKey, provide, reactive, readonly } from 'vue'
import mitt from 'mitt'

interface OutletTargets {
  [outlet: string]: {
    [targetElementId: string]: {
      active: boolean
      order: number
    }
  }
}

export function createCoordinator() {
  const outletTargets: OutletTargets = reactive({})
  const bus = mitt()
  /**
   * Called by a TeleportSource to communicate the target Element ID to which it intends to teleport.
   */
  function addTargetToOutlet(
    outlet: string,
    targetElementId: string,
    order: number = Infinity
  ) {
    const outletState = outletTargets[outlet] ?? (outletTargets[outlet] = {})
    outletState[targetElementId] = {
      active: false,
      order,
    }
  }
  function removeTargetFromOutlet(outlet: string, targetElementId: string) {
    const outletState = outletTargets[outlet]
    if (outletState) {
      delete outletState[targetElementId]
    }
  }
  function activateTarget(outlet: string, targetElementId: string) {
    const target = outletTargets[outlet]?.[targetElementId]
    if (target) {
      target.active = true
    }
  }
  function deactivateTarget(outlet: string, targetElementId: string) {
    const target = outletTargets[outlet]?.[targetElementId]
    if (target) {
      target.active = false
    }
  }

  return {
    outletTargets: readonly(outletTargets),
    // to be used by TeleportSource
    addTargetToOutlet,
    removeTargetFromOutlet,
    // to be used by TeleportOutlet
    activateTarget,
    deactivateTarget,
    bus,
  }
}

export type CoordinatorFactory = typeof createCoordinator
export type Coordinator = ReturnType<CoordinatorFactory>
export type CoordinatorKey = InjectionKey<Coordinator>

export const coordinatorKey = Symbol(
  'TeleportPlusCoordinator'
) as CoordinatorKey

export function provideCoordinator(coordinator: Coordinator) {
  provide(coordinatorKey, coordinator)
}

export function injectCoordinator() {
  const c = inject(coordinatorKey)
  if (!c) {
    throw new Error(
      'injection for TeleportPlus not found. did you install the plugin on the app instance?'
    )
  }
  return c
}
